<template>
  <div class="app-container">
    <!--查询-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="fuzzyquery" placeholder="输入关键字搜索" />
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
        style="width: 100%; height: 510px; border-radius: 8px; padding-top: 4px"
      >
        <el-table-column width="30" align="center">
          <template slot-scope="scope">
            <el-checkbox :label="`${scope.row.id}`"></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column label="序号" width="70" align="center">
          <template slot-scope="scope">
            {{ (page - 1) * limit + scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          width="420px"
          label="标题"
          prop="poTitle"
        >
        </el-table-column>
        <el-table-column align="center" label="来源" prop="poSource">
        </el-table-column>
        <el-table-column align="center" label="发布日期" prop="poTime">
        </el-table-column>
        <el-table-column label="是否显示以及操作" align="center">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.poActive"
              :active-value="1"
              :inactive-value="0"
              active-color="#13ce66"
              @change="policyShow(scope.row.id, scope.row.poActive)"
            >
            </el-switch>
            <router-link :to="'/policy/details/' + scope.row.id">
              <el-button style="margin: 0px 4px" size="mini">详情</el-button>
            </router-link>
            <router-link :to="'/policy/edit/' + scope.row.id">
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
    </el-checkbox-group>
    <!--分页-->
    <el-footer class="footerPage">
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
import policyApi from "@/api/policy";
export default {
  data() {
    return {
      page: 1, //当前页
      limit: 8, //每页记录数
      list: null,
      total: 0,
      fuzzyquery: "",
      loading: true,
      checkList: [],
    };
  },
  created() {
    this.getlist();
  },
  methods: {
    getlist(page = 1) {
      this.page = page;
      policyApi
        .getPolicyListPage(this.page, this.limit, this.fuzzyquery)
        .then((response) => {
          this.list = response.data.policydata;
          this.total = response.data.total;
          this.loading = false;
        });
    },
    handleDelete(id) {
      this.$confirm("此操作将删除该政策文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          policyApi.deletePolicyId(id).then((response) => {
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
      this.fuzzyquery = "";
      this.checkList = [];
      this.getlist();
    },
    policyShow(id, stateCode) {
      policyApi.ShowPolicy(id, stateCode).then((response) => {
        this.$message({
          type: "success",
          message: "操作成功!",
        }).catch((error) => {});
      });
    },
    moreDeleteData() {
      this.$nextTick(() => {
        if (this.checkList.length == 0) {
          this.$message({
            message: "未选中任何数据",
            type: "warning",
          });
        } else {
          this.$confirm("此操作将删除文件, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
            .then(() => {
              policyApi.moreDeletePolicy(this.checkList).then((response) => {
                this.$message({
                  message: "操作成功",
                  type: "success",
                });
              });
              this.getlist();
            })
            .catch((error) => {});
        }
      });
    },
  },
};
</script>