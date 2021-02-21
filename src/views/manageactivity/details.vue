<template>
  <div class="app-container">
     <!--查询-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="search" placeholder="输入关键字搜索" />
      </el-form-item>
      <el-button type="primary" icon="el-icon-search" @click="getOrdersInfo()"
        >查询</el-button
      >
      <el-button type="default" @click="resetData()">清空</el-button>
      <div style="display:inline;margin:0 40px;font-size:1.4em;font-weight:bold">
        此活动：<spon style="color:#f40">{{ activity.actName }}</spon><spon style="margin:0 2%">报名志愿者名单</spon>
        <el-divider direction="vertical"></el-divider>
        <span>需求人数：{{ activity.actNumber }}</span>
      <el-divider direction="vertical"></el-divider>
      <span>已申人数：{{ applyed }}</span></div>
    </el-form>
    
    <!--数据展示-->
    <el-table
      :data="list"
      v-loading="loading"
      style="width: 100%; height: 469.6px"
    >
      <el-table-column label="序号" width="70" align="center">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="账号" prop="orId">
      </el-table-column>
      <el-table-column align="center" label="名字" prop="orName">
      </el-table-column>
      <el-table-column align="center" label="邮箱" prop="orEmail">
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
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
  </div>
</template>

<script>
import manageactivity from "@/api/manageactivity";
export default {
  data() {
    return {
      activity: {
        id: "",
        actName: "",
        actCreate: "",
        actUpdate: "",
        actNumber: "",
        actNumbered: "",
        actdescription: "",
      },
      page: 1, //当前页
      limit: 6, //每页记录数
      list: null,
      total: 0,
      search: "",
      loading: true,
      id: "",
      applyed:"",
    };
  },
  created() {
    if (this.$route.params && this.$route.params.id) {
      const id = this.$route.params.id;
      this.id = id
      this.getActivityInfo(id);
      this.getOrdersInfo()
    } else {
      this.activity = {};
    }
  },
  methods: {
    getActivityInfo(id) {
      manageactivity.getActivity(id).then((response) => {
        this.activity = response.data;
      });
    },
    getOrdersInfo(page = 1) {
      this.page = page;
      manageactivity
        .getOredersListPage(this.id,this.page, this.limit, this.search)
        .then((response) => {
          this.list = response.data.ordersdata;
          this.total = response.data.total;
          this.applyed = response.data.applyed;
          this.loading = false;
        });
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
      this.getOrdersInfo();
    },
  },
};
</script>