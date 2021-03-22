<template>
  <div class="dashboard-container">
    <div>
      <!-- 图表 -->
      <div style="margin-left: 420px">
        <div ref="chart" style="width: 860px; height: 540px"></div>
      </div>
      <!-- 卡片 -->
      <div class="activity">
        <el-card class="box-card" shadow="hover">
          <div slot="header" class="clearfix">
            <span>账号数量统计</span>
          </div>
          <div class="text item">
            <ul>
              <li>
                <i class="iconfont iconyonghu"></i>
                <div
                  style="display: inline-block"
                  v-html="'用&emsp;户：'"
                ></div>
                {{ data.user }}
              </li>
              <li>
                <i class="iconfont iconguanliyuan"></i>管理员：{{
                  data.admin +
                  data.adminActivity +
                  data.adminNull +
                  data.adminTwo +
                  data.adminUser
                }}
              </li>
              <li>
                <i class="iconfont iconhuodong1"></i>
                <div
                  style="display: inline-block"
                  v-html="'活&emsp;动：'"
                ></div>
                {{ data.activityNumber }}
              </li>
            </ul>
          </div>
        </el-card>
        <div class="window">
          <el-card class="box-card" shadow="hover">
            <div slot="header" class="clearfix" align="center">
              <span>操作显示-窗口</span>
            </div>
            <div class="set_operation_text">
              <ul class="setleft" :class="{ anim: animate == true }">
                <li v-for="(item, index) in operationData" :key="index">
                  <div>
                    IP：{{ item.ip }}
                    <div
                      style="display: inline-block"
                      v-html="'&emsp;&emsp;'"
                    ></div>
                    时间：{{ item.time }}
                    <div
                      style="display: inline-block"
                      v-html="'&emsp;&emsp;'"
                    ></div>
                    <div style="display: inline-block" v-if="item.name">
                      名字：{{ item.name }}
                    </div>
                  </div>
                  <div>
                    URL：
                    <div>{{ item.url }}</div>
                  </div>
                </li>
              </ul>
            </div>
          </el-card>
        </div>
      </div>
      <!-- 全屏 -->
      <a class="allscreen" v-if="fullscreen" @click="fullScreen"
        ><i class="iconfont iconquanping"></i
      ></a>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import api from "@/api/charts";
import get from "@/api/logdata";
import screenfull from "screenfull";
export default {
  name: "Home",
  data() {
    return {
      data: {},
      animate: false,
      operationData: [],
      fullscreen: true,
      count: 1,
    };
  },
  computed: {
    ...mapGetters(["name", "roles"]),
  },
  mounted() {
    //this.showChart();
    this.getData();
    this.getOperationData();
    setInterval(this.showPersontionData, 2000);
    // setInterval(this.getOperationData, 2000 * 20);
  },
  watch: {
    count(newCount, oldCount) {
      if (newCount === 40) {
        this.count = 1;
        this.getOperationData();
      }
    },
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
            itemStyle: {
              borderRadius: 10,
              borderColor: "#fff",
              borderWidth: 2,
            },
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
              { value: this.data.adminActivity, name: "活动管理员" },
              { value: this.data.adminTwo, name: "高级管理员" },
              { value: this.data.adminUser, name: "用户管理员" },
              { value: this.data.admin, name: "超级管理员" },
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
    showPersontionData() {
      this.animate = true;
      setTimeout(() => {
        this.operationData.push(this.operationData[0]);
        this.operationData.shift();
        this.animate = false;
      }, 600);
      this.count += 1;
    },
    getOperationData() {
      get
        .getLogData()
        .then((response) => {
          this.operationData = response.data;
        })
        .catch((error) => {});
    },
    fullScreen() {
      if (!screenfull.enabled) {
        this.$message("您的浏览器不能全屏");
        return false;
      }
      screenfull.toggle();
      this.fullscreen = false;
    },
  },
};
</script>
<style>
.activity {
  position: absolute;
  left: 60px;
  top: 112px;
}
.activity ul li {
  margin: 12px 6px;
  padding: 4px 4px;
  font-weight: bold;
  list-style: none;
}
.activity ul li i {
  color: #4169e1;
  margin: 4px 6px;
  font-size: 1em;
}
.text {
  font-size: 20px;
}

.item {
  margin-bottom: 18px;
}
.activity .set_operation_text {
  font-size: 14px;
  margin-top: -10px;
  color: rgba(102, 204, 102, .8);
}
.activity .set_operation_text ul li {
  margin-bottom: 26px;
}
.activity .setleft ul li {
  list-style: none;
  line-height: 30px;
  height: 30px;
}
.anim {
  transition: all 0.5s ease-out;
  margin-top: -90px;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
.el-card__body{
  overflow: hidden;
}
.box-card {
  width: 510px;
  height: 250px;
  overflow: hidden;
}
.activity .window {
  margin-top: 30px;
}
.activity .window .setleft {
  margin-left: -50px;
}
.allscreen i {
  margin-left: 1210px;
  font-size: 1.6em;
  font-weight: bold;
  color: #4169e1;
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