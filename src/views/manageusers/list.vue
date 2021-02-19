<template>
  <div class="app-container">
    <!--查询-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="search" placeholder="输入关键字搜索" />
      </el-form-item>
      <el-button type="primary" icon="el-icon-search" @click="getlist()"
        >查询</el-button
      >
      <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>
    <!--数据展示-->
    <el-table
      :data="list"
      element-loading-text="数据加载中......"
      style="width: 100%"
    >
      <el-table-column label="序号" width="70" align="center">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="账号" prop="userId">
      </el-table-column>
      <el-table-column align="center" label="名字" prop="userName">
      </el-table-column>
      <el-table-column align="center" label="密码" prop="userPwd">
      </el-table-column>
      <el-table-column align="center" label="邮箱" prop="userEmail">
      </el-table-column>
      <el-table-column align="center" label="性别">
        <template slot-scope="scope">
          {{ scope.row.userSex === 1 ? "男" : "女" }}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <router-link :to="'/manageusers/edit/' + scope.row.id">
            <el-button style="margin: 0px 4px" size="mini">修改</el-button>
          </router-link>
          <el-button
            style="margin: 0px 4px"
            size="mini"
            type="danger"
            @click="handleDelete(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

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
  </div>
</template>
<script>
import manageusers from "@/api/manageusers";
export default {
  data() {
    return {
      page: 1, //当前页
      limit: 8, //每页记录数
      list: null,
      total: 0,
      search: "",
    };
  },
  created() {
    this.getlist();
  },
  methods: {
    getlist(page = 1) {
      this.page = page;
      manageusers
        .getUsersListPage(this.page, this.limit, this.search)
        .then((response) => {
          this.list = response.data.userdata;
          this.total = response.data.total;
        });
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(id) {
      this.$confirm("此操作将删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        manageusers.deleteUserId(id).then((response) => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          this.getlist();
        });
      });
    },
    resetData() {
      this.search = "";
      this.getlist();
    },
  },
};
</script>