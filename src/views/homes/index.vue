<template>
  <div class="dashboard-container">
    <div style="margin-left:420px">
      <div ref="chart" style="width: 800px; height: 500px"></div>
    </div>
    <div class="activity">
      <ul>
        <li>用户：{{data.user}} </li>
        <li>管理员：{{data.admin + data.adminActivity + data.adminNull + data.adminTwo + data.adminUser}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import api from "@/api/charts";

export default {
  name: "Home",
  data() {
    return {
      data: {},
    };
  },
  computed: {
    ...mapGetters(["name", "roles"]),
  },
  mounted() {
    this.showChart();
  },
  created() {
    this.getData();
  },
  methods: {
    showChart() {
      var myChart = this.$echarts.init(this.$refs.chart);
      var option = {
        tooltip: {
          trigger: "item",
        },
        legend: {
          top: "5%",
          left: "center",
        },
        series: [
          {
            name: "类型",
            type: "pie",
            radius: ["40%", "70%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "40",
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: this.data.user, name: "普通用户" },
              { value: this.data.admin, name: "超级管理员" },
              { value: this.data.adminUser, name: "用户管理员" },
              { value: this.data.adminActivity, name: "活动管理员" },
              { value: this.data.adminTwo, name: "高级管理员" },
              { value: this.data.adminNull, name: "无权限管理员" },
            ],
          },
        ],
      };
      myChart.setOption(option);
    },
    getData() {
      api
        .getChartData()
        .then((response) => {
          this.data = response.data;
          this.showChart();
        })
        .catch((error) => {});
    },
  },
};
</script>

<style>
.activity{
  position: absolute;
  left: 60px;
  top: 100px;
}
.activity ul li{
  margin: 6px 6px;
  padding: 4px 4px;
  font-weight: bold;
  font-size: 20px;
}
</style>
<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>