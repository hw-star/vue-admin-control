<template>
  <div class="app-container">
    <el-form
      label-width="80px"
      :rules="addOrUpdateActivityRules"
      ref="activity"
      :model="activity"
    >
      <el-form-item label="活动名称" prop="actName">
        <el-input style="width: 38%" v-model="activity.actName" />
      </el-form-item>
      <el-form-item v-show="theUpdateActivityId" label="活动号">
        <el-input style="width: 38%" v-model="activity.id" disabled />
      </el-form-item>
      <el-form-item label="需求人数" prop="actNumber">
        <el-input style="width: 38%" v-model="activity.actNumber" />
      </el-form-item>
      <el-form-item label="活动地点" prop="actAddress">
        <el-input style="width: 38%" v-model="activity.actAddress" />
      </el-form-item>
      <el-form-item label="开始日期" prop="actTime">
        <div class="block">
          <el-date-picker
            value-format="yyyy-MM-dd"
            v-model="activity.actTime"
            align="left"
            type="date"
            placeholder="选择日期"
            :picker-options="pickerOptions"
          >
          </el-date-picker>
        </div>
      </el-form-item>
      <el-form-item label="活动描述">
        <el-input
          v-model="activity.actDescription"
          placeholder="若不够，通过此框右下角可拉长。"
          style="width: 56%"
          :rows="10"
          type="textarea"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          :disabled="saveBtnDisabled"
          type="primary"
          @click="saveOrUpdate"
          >保存</el-button
        >
        <div style="font-size: 1.2em; font-weight: bold">
          注：新增加的活动默认是未开启！
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import manageactivity from "@/api/manageactivity";
import { validName, validNumber } from "@/utils/validate";
export default {
  data() {
    const validateName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("名字不能为空"));
      } else {
        if (validName(value)) {
          callback();
        } else {
          return callback(new Error("名字必须是汉字"));
        }
      }
    };
    const validateNumber = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("人数不能为空"));
      } else {
        if (validNumber(value)) {
          callback();
        } else {
          return callback(new Error("需求人数为非0正整数"));
        }
      }
    };
    const validateAddress = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("地点不能为空"));
      }else {
        callback();
      }
    };
    const validateTime = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("开始日期不能为空"));
      } else {
        callback();
      }
    };
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
      theUpdateActivityId: false,
      saveBtnDisabled: false,
      addOrUpdateActivityRules: {
        actName: [{ required: true, trigger: "blur", validator: validateName }],
        actNumber: [
          { required: true, trigger: "blur", validator: validateNumber },
        ],
        actAddress: [
          { required: true, trigger: "blur", validator: validateAddress },
        ],
        actTime: [{ required: true, trigger: "blur", validator: validateTime }],
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            },
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            },
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            },
          },
        ],
      },
    };
  },
  created() {
    if (this.$route.params && this.$route.params.id) {
      const id = this.$route.params.id;
      this.getActivityInfo(id);
      this.theUpdateActivityId = true;
    } else {
      this.activity = {};
    }
  },
  methods: {
    saveOrUpdate() {
      if (!this.activity.id) {
        this.saveActivity();
      } else {
        this.updateActivity();
      }
    },
    saveActivity() {
      this.$refs.activity.validate((valid) => {
        if (valid) {
          manageactivity.addActivity(this.activity).then((response) => {
            this.$message({
              type: "success",
              message: "添加成功!",
            });
            // 路由跳转用户列表
            this.$router.push({ path: "/manageactivity/table" });
          });
        } else {
          return false;
        }
      });
    },
    getActivityInfo(id) {
      manageactivity.getActivity(id).then((response) => {
        this.activity = response.data;
      });
    },
    updateActivity() {
      this.$refs.activity.validate((valid) => {
        if (valid) {
          manageactivity.updateActivity(this.activity).then((response) => {
            this.$message({
              type: "success",
              message: "修改成功!",
            });
            // 路由跳转用户列表
            this.$router.push({ path: "/manageactivity/table" });
          });
        } else {
          return false;
        }
      });
    },
  },
};
</script>
