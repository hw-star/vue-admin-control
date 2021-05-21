<template>
  <div class="app-container">
    <!--查询-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="search" placeholder="输入关键字搜索，如禁用" />
      </el-form-item>
      <el-button type="primary" icon="el-icon-search" @click="getlist()"
        >查询</el-button
      >
      <el-button type="default" @click="resetData()">清空</el-button>
      <el-button type="danger" @click="moreDeleteData()">批量删除</el-button>
    </el-form>
    <!--数据展示-->
    <el-checkbox-group v-model="checkList">
      <el-table
        :data="list"
        v-loading="loading"
        style="width: 100%; height: 469.6px"
      >
        <el-table-column width="30" align="center">
          <template slot-scope="scope">
            <el-checkbox v-if="scope.row.sysId == existid ? false : true" :label="`${scope.row.id}`"></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column label="序号" width="70" align="center">
          <template slot-scope="scope">
            {{ (page - 1) * limit + scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="账号" prop="sysId">
        </el-table-column>
        <el-table-column align="center" label="角色">
          <template slot-scope="scope">
            {{ lists[scope.row.sysRoleId - 1] }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="密码" prop="sysPwd">
        </el-table-column>
        <el-table-column label="禁用以及操作" align="center">
          <template slot-scope="scope">
            <div v-if="scope.row.sysId == existid ? false : true">
              <el-switch
                v-model="scope.row.sysStop"
                :active-value="1"
                :inactive-value="0"
                active-color="#13ce66"
                @change="sysUserStop(scope.row.id, scope.row.sysStop)"
              >
              </el-switch>
              <el-button
                style="margin: 0px 4px"
                size="mini"
                type="warning"
                @click="handleDis(scope.row.sysId, scope.row.sysRoleId)"
                >分配角色</el-button
              >
              <router-link :to="'/nested/edit/' + scope.row.id">
                <el-button style="margin: 0px 4px" size="mini">修改</el-button>
              </router-link>
              <el-button
                style="margin: 0px 4px"
                size="mini"
                type="danger"
                @click="handleDelete(scope.row.id)"
                >删除</el-button
              >
            </div>
            <div v-else>
              <el-tag type="success">已登录的本人账号</el-tag>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-checkbox-group>
    <el-footer class="footerPage">
      <!--分页-->
      <el-pagination
        background
        align="center"
        style="padding: 30px 0; text-align: center"
        layout="total, prev, pager, next, jumper"
        @current-change="getlist"
        :total="total"
        :current-page="page"
        :page-size="limit"
      >
      </el-pagination>
    </el-footer>
    <el-dialog title="分配角色" :visible.sync="dialogVisible" width="40%">
      <div style="margin-top: 20px" align="center">
        <el-radio-group v-model="radio" size="small">
          <el-radio-button label="1">超级管理员</el-radio-button>
          <el-radio-button label="2">用户管理员</el-radio-button>
          <el-radio-button label="3">活动管理员</el-radio-button>
          <el-radio-button label="4">高级管理员</el-radio-button>
          <el-radio-button label="5">无权限管理员</el-radio-button>
        </el-radio-group>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="toAddRole">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import api from "@/api/users";
import apiforrole from "@/api/roles";
export default {
  data() {
    return {
      page: 1, //当前页
      limit: 8, //每页记录数
      list: null,
      total: 0,
      search: "",
      loading: true,
      dialogVisible: false,
      radio: "",
      setid: "",
      lists: [
        "超级管理员",
        "用户管理员",
        "活动管理员",
        "高级管理员",
        "无权限管理员",
      ],
      existid: this.$store.state.user.sysid,
      checkList: [],
    };
  },
  created() {
    this.getlist();
  },
  methods: {
    getlist(page = 1) {
      this.page = page;
      api
        .getsysUsersListPage(this.page, this.limit, this.search)
        .then((response) => {
          this.list = response.data.sysuserdata;
          this.total = response.data.total;
          this.loading = false;
        });
    },
    handleDelete(id) {
      this.$confirm("此操作将删除该管理员, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          api.deletesysUserId(id).then((response) => {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.getlist();
          });
        })
        .catch((error) => {});
    },
    resetData() {
      this.search = "";
      this.checkList = [];
      this.getlist();
    },
    sysUserStop(id, stateCode) {
      api.StopsysUser(id, stateCode).then((response) => {
        this.$message({
          type: "success",
          message: "更改成功!",
        });
      });
    },
    handleDis(sysId, radio) {
      this.dialogVisible = true;
      this.radio = radio;
      this.setid = sysId;
    },
    toAddRole() {
      apiforrole
        .updatesysUserRole(this.setid, this.radio)
        .then((response) => {
          this.$message({
            type: "success",
            message: "更改成功!",
          });
          this.dialogVisible = false;
          this.getlist();
        })
        .catch((error) => {});
    },
    moreDeleteData() {
      if (this.checkList.length == 0) {
        this.$message({
          message: "未选中任何数据",
          type: "warning",
        });
      } else {
        this.$confirm("此操作将删除活动, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            api
              .moreDeletesysUsers(this.checkList)
              .then((response) => {
                this.$message({
                  message: "操作成功",
                  type: "success",
                });
              });
            this.getlist();
          })
          .catch((error) => {});
      }
    },
  },
};
</script>
<style>
.el-dialog {
  border-radius: 10px;
}
</style>
