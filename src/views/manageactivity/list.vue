<template>
  <div class="app-container">
    <!--查询-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input
          v-model="activityBody.fuzzyquery"
          placeholder="输入关键字搜索"
        />
      </el-form-item>
      <el-form-item label="添加更新时间">
        <el-date-picker
          v-model="activityBody.begin"
          type="datetime"
          placeholder="选择开始时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="activityBody.end"
          type="datetime"
          placeholder="选择截止时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
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
            <el-checkbox :label="`${scope.row.id}`"></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column label="序号" width="80" align="center">
          <template slot-scope="scope">
            {{ (page - 1) * limit + scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column align="center" width="90" label="活动号" prop="id">
        </el-table-column>
        <el-table-column align="center" label="名称" prop="actName">
        </el-table-column>
        <el-table-column align="center" label="地点" prop="actAddress">
        </el-table-column>
        <el-table-column align="center" label="活动开始日期">
          <template slot-scope="scope">{{
            scope.row.actTime.split(" ")[0]
          }}</template>
        </el-table-column>
        <el-table-column label="是否启用以及操作" align="center">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.actActive"
              :active-value="1"
              :inactive-value="0"
              active-color="#13ce66"
              @change="activityStop(scope.row.id, scope.row.actActive)"
            >
            </el-switch>
            <router-link :to="'/manageactivity/details/' + scope.row.id">
              <el-button style="margin: 0px 4px" size="mini">详情</el-button>
            </router-link>
            <router-link :to="'/manageactivity/edit/' + scope.row.id">
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
import manageactivity from "@/api/manageactivity";
export default {
  data() {
    return {
      page: 1, //当前页
      limit: 8, //每页记录数
      list: null,
      total: 0,
      activityBody: {},
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
      manageactivity
        .getActivityListPage(this.page, this.limit, this.activityBody)
        .then((response) => {
          this.list = response.data.activitydata;
          this.total = response.data.total;
          this.loading = false;
        });
    },
    handleDelete(id) {
      this.$confirm("此操作将删除该活动, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          manageactivity.deleteActivityId(id).then((response) => {
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
      this.activityBody = {};
      this.checkList = [];
      this.getlist();
    },
    activityStop(id, stateCode) {
      manageactivity.StopActivity(id, stateCode).then((response) => {
        this.$message({
          type: "success",
          message: "操作成功!",
        });
      });
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
            manageactivity
              .moreDeleteActivity(this.checkList)
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