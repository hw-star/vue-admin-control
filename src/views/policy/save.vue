<template>
  <div class="app-container">
    <el-backtop></el-backtop>
    <div class="operation">
      <ul>
        <li>
          <el-input
            style="width: 420px"
            placeholder="请输入内容"
            v-model="policy.poTitle"
          >
            <template slot="prepend">政策文件题目</template>
          </el-input>
        </li>
        <li>
          <el-input
            style="width: 220px"
            placeholder="请输入内容"
            v-model="policy.poSource"
          >
            <template slot="prepend">来源</template>
          </el-input>
        </li>
        <li>
          <div class="block" style="display: inline-block">
            <el-date-picker
              value-format="yyyy-MM-dd"
              v-model="policy.poTime"
              align="left"
              type="date"
              placeholder="选择时间"
              :picker-options="pickerOptions"
            >
            </el-date-picker>
          </div>
        </li>
      </ul>
      <el-button type="danger" @click="clearData" plain>清空</el-button>
      <el-button type="primary" @click="addOrUpdate" plain>提交</el-button>
      <span style="margin-left: 10px; font-weight: bold"
        >注：新提交的默认是未开放！</span
      >
    </div>
    <tinymce
      id="editor"
      ref="editor"
      v-model="policy.poContent"
      :height="realHeight"
      @handleImgUpload="imgUpload"
    ></tinymce>
  </div>
</template>

<script>
import Tinymce from "@/components/Tinymce";
import { uploadFile } from "@/api/policyimg";
import policyApi from "@/api/policy";
export default {
  data() {
    return {
      policy: {},
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
      loading: false,
    };
  },
  computed: {
    realHeight() {
      return (
        (window.innerHeight ||
          document.documentElement.clientHeight ||
          document.body.clientHeight) - 200
      );
    },
  },
  components: {
    Tinymce,
  },
  created() {
    if (this.$route.params && this.$route.params.id) {
      this.getData(this.$route.params.id);
      // this.theUpdateActivityId = true;
    } else {
      this.policy = {};
    }
  },
  methods: {
    async imgUpload(blobInfo, success, failure) {
      const formData = new FormData();
      formData.append("file", blobInfo.blob());
      try {
        const res = await uploadFile(formData);
        success(res.data);
      } catch (e) {
        failure("上传失败:" + e);
      }
    },
    submitContent() {
      console.log(this.policy.poTitle+"  "+this.policy.poContent+"   "+ this.policy.poSource);
      if (this.policy.poContent == null) {
        this.$message({
          message: "内容不能为空",
          type: "warning",
        });
        return;
      }
      if (this.policy.poTitle == null) {
        this.$message({
          message: "标题不能为空",
          type: "warning",
        });
        return;
      }
      if (this.policy.poTime == null) {
        this.$message({
          message: "时间不能为空",
          type: "warning",
        });
        return;
      }
      if (this.policy.poSource == null) {
        this.$message({
          message: "来源不能为空",
          type: "warning",
        });
        return;
      }
      policyApi
        .addPolicy(this.policy)
        .then((response) => {
          this.$message({
            type: "success",
            message: "添加成功!",
          });
          // 路由跳转w文件列表
          this.$router.push({ path: "/policy/table" });
        })
        .catch((error) => {});
    },
    getData(id) {
      policyApi
        .getOnePolicy(id)
        .then((response) => {
          this.policy = response.data;
          this.loading = false;
        })
        .catch((error) => {});
    },
    addOrUpdate() {
      if (!this.$route.params.id) {
        this.submitContent();
      } else {
        this.updateContent();
      }
    },
    clearData() {
      this.policy.poTitle = "";
      this.policy.poTime = "";
      this.policy.poSource = "";
    },
    updateContent() {
      if (this.policy.poContent == "") {
        this.$message({
          message: "内容不能为空",
          type: "warning",
        });
        return;
      }
      if (this.policy.poTitle == "") {
        this.$message({
          message: "标题不能为空",
          type: "warning",
        });
        return;
      }
      if (this.policy.poTime == "") {
        this.$message({
          message: "时间不能为空",
          type: "warning",
        });
        return;
      }
      if (this.policy.poSource == "") {
        this.$message({
          message: "来源不能为空",
          type: "warning",
        });
        return;
      }
      policyApi
        .updatePolicy(this.policy)
        .then((response) => {
          this.$message({
            type: "success",
            message: "修改成功!",
          });
          // 路由跳转w文件列表
          this.$router.push({ path: "/policy/table" });
        })
        .catch((error) => {});
    },
  },
};
</script>
<style scoped>
.app-container .operation {
  margin-bottom: 10px;
}
.app-container .operation ul li {
  float: left;
  list-style: none;
  margin-right: 16px;
}
</style>
