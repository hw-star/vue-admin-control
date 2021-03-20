<template>
  <div class="app-container">
    <div style="font-size: 1.2em; font-weight: bold">
      <span>活动名称：{{ activity.actName }}</span>
      <el-divider direction="vertical"></el-divider>
      <span>需求人数：{{ activity.actNumber }}</span>
      <el-divider direction="vertical"></el-divider>
      <span>已报人数：{{ applyed }}</span>
      <el-collapse style="border-top: 0">
        <el-collapse-item title="点击查看   活动描述">
          <div style="font-size: 1.2em; font-weight: bold">
            {{ activity.actDescription }}
          </div>
        </el-collapse-item>
      </el-collapse>

      <el-divider content-position="center"
        >本活动 已报名 志愿者名单</el-divider
      >
    </div>
    <!--查询-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="search" placeholder="输入关键字搜索" />
      </el-form-item>
      <el-button type="primary" icon="el-icon-search" @click="getOrdersInfo()"
        >查询</el-button
      >
      <el-button type="default" @click="resetData()">清空</el-button>
      <el-button type="danger" @click="getExcel()">下载志愿者名单</el-button>
    </el-form>
    <!--数据展示-->
    <el-table
      :data="list"
      v-loading="loading"
      height="250"
      border
      style="width: 100%; height: 40%"
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
            @click="handleApply(scope.row.id)"
            >取消报名</el-button
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
      @current-change="getOrdersInfo"
      :total="total"
      :current-page="page"
      :page-size="limit"
    >
    </el-pagination>
  </div>
</template>

<script>
import manageactivity from "@/api/manageactivity";
import axios from "axios";
export default {
  data() {
    return {
      activity: {
        id: "",
        actName: "",
        actCreate: "",
        actUpdate: "",
        actNumber: "",
        actDescription: "",
        actActive: "",
      },
      page: 1, //当前页
      limit: 8, //每页记录数
      list: null,
      total: 0,
      search: "",
      loading: true,
      id: "",
      applyed: "",
    };
  },
  created() {
    if (this.$route.params && this.$route.params.id) {
      const id = this.$route.params.id;
      this.id = id;
      this.getActivityInfo(id);
      this.getOrdersInfo();
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
        .getOredersListPage(this.id, this.page, this.limit, this.search)
        .then((response) => {
          this.list = response.data.ordersdata;
          this.total = response.data.total;
          this.applyed = response.data.applyed;
          this.loading = false;
        });
    },
    handleApply(id) {
      this.$confirm("此操作将取消该用户的报名, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          manageactivity.disApplyId(id).then((response) => {
            this.$message({
              type: "success",
              message: "取消成功!",
            });
            this.getOrdersInfo();
          });
        })
        .catch((error) => {});
    },
    resetData() {
      this.search = "";
      this.getOrdersInfo();
    },
    getExcel() {
      window.location.href = "http://127.0.0.1:10010/excel/getexcel/" + this.activity.id
    },
  },
};
</script>