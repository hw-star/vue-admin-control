<template>
  <div class="app-container">
    <el-button type="danger" v-print="printObj">打印名单</el-button>
    <!--数据展示-->
    <div id="printBox">
      <el-table
      :data="list"
      v-loading="loading"
    >
      <el-table-column label="序号" width="90" align="center">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column align="center" width="250" label="账号" prop="orId">
      </el-table-column>
      <el-table-column align="center" width="130" label="名字" prop="orName">
      </el-table-column>
      <el-table-column align="center" width="250" label="邮箱" prop="orEmail">
      </el-table-column>
    </el-table>
    </div>
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
        actDescription: "",
        actActive: "",
      },
      page: 1, //当前页
      list: null,
      limit: 0,
      total: 0,
      loading: true,
      printObj: {
        id: "printBox", // 打印元素的ID
        popTitle: this.$route.query.name, // 打印的标题
        extraCss: "", // 打印可引入外部的一个 css 文件
        extraHead: '<meta http-equiv="Content-Language"content="zh-cn"/>',
      },
    };
  },
  created() {
    this.getTotal();
  },
  methods: {
    getTotal(){
      manageactivity
        .getOredersListPage(this.$route.query.id, 1, 1, "")
        .then((response) => {
          this.total = this.limit = response.data.total;
          this.getOrdersInfo();
        });
    },
    getOrdersInfo(page = 1) {
      this.page = page;
      manageactivity
        .getOredersListPage(this.$route.query.id, this.page, this.total, "")
        .then((response) => {
          this.list = response.data.ordersdata;
          this.total = response.data.total;
          this.loading = false;
        });
    },
  },
};
</script>
<style scoped>
@media print {
  html,
  body {
    width: 1175px;
    height: inherit;
  }
}
@page {
  margin: 20mm 10mm;
}
.el-table::before{
  width: 0%;
}
</style>