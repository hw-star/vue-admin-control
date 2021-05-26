<template>
  <div class="app-container">
    <el-backtop></el-backtop>
    <div class="operation">
      <ul>
        <li>
          <el-input
            style="width: 640px"
            placeholder="请输入内容"
            v-model="notice.noTitle"
          >
            <template slot="prepend">通知公告标题</template>
          </el-input>
        </li>
        <li>
          <div class="block" style="display: inline-block">
            <el-date-picker
              value-format="yyyy-MM-dd"
              v-model="notice.noTime"
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
      v-model="notice.noContent"
      :height="realHeight"
      @handleImgUpload="imgUpload"
    ></tinymce>
  </div>
</template>

<script>
import Tinymce from "@/components/Tinymce";
import { uploadFile } from "@/api/policyimg";
import noticeApi from "@/api/notice";
export default {
  data() {
    return {
      notice: {},
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
    }else {
      this.notice = {};
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
      if (this.notice.noContent == null) {
        this.$message({
          message: "内容不能为空",
          type: "warning",
        });
        return;
      }
      if (this.notice.noTitle == null) {
        this.$message({
          message: "标题不能为空",
          type: "warning",
        });
        return;
      }
      if (this.notice.noTime == null) {
        this.$message({
          message: "时间不能为空",
          type: "warning",
        });
        return;
      }
      noticeApi
        .addNotice(this.notice)
        .then((response) => {
          this.$message({
            type: "success",
            message: "添加成功!",
          });
          // 路由跳转通知公告列表
          this.$router.push({ path: "/notice/table" });
        })
        .catch((error) => {});
    },
    getData(id) {
      noticeApi
        .getOneNotice(id)
        .then((response) => {
          this.notice = response.data;
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
      this.notice.noTitle = "";
      this.notice.noTime = "";
    },
    updateContent() {
      if (this.notice.noContent == "") {
        this.$message({
          message: "内容不能为空",
          type: "warning",
        });
        return;
      }
      if (this.notice.noTitle == "") {
        this.$message({
          message: "标题不能为空",
          type: "warning",
        });
        return;
      }
      if (this.notice.noTime == "") {
        this.$message({
          message: "时间不能为空",
          type: "warning",
        });
        return;
      }
      noticeApi
        .updateNotice(this.notice)
        .then((response) => {
          this.$message({
            type: "success",
            message: "修改成功!",
          });
          // 路由跳转w文件列表
          this.$router.push({ path: "/notice/table" });
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
