<template>
  <div class="app-container">
    <el-form
      label-width="80px"
      :rules="addOrUpdateElegantRules"
      ref="elegant"
      :model="elegant"
    >
      <el-form-item label="名字" prop="elName">
        <el-input style="width: 38%" v-model="elegant.elName" />
      </el-form-item>
      <el-form-item label="时间" prop="elTime">
        <div class="block" style="display: inline-block">
          <el-date-picker
            value-format="yyyy-MM-dd"
            v-model="elegant.elTime"
            align="left"
            type="date"
            placeholder="选择时间"
            :picker-options="pickerOptions"
          >
          </el-date-picker>
        </div>
      </el-form-item>
      <el-form-item label="照片">
        <pan-thumb :image="elegant.elAvatar + ''" />
        <el-button
          type="primary"
          icon="el-icon-upload"
          @click="imagecropperShow = true"
          >更换照片
        </el-button>
        <image-cropper
          v-show="imagecropperShow"
          :width="300"
          :height="300"
          :key="imagecropperKey"
          :url="BASE_API + '/oss/fileoss'"
          field="file"
          @close="close"
          @crop-upload-success="cropSuccess"
        />
      </el-form-item>

      <el-form-item>
        <el-button type="warning" @click="addOrUpdate">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import elegantApi from "@/api/elegant";
import ImageCropper from "@/components/ImageCropper";
import PanThumb from "@/components/PanThumb";
import { validName } from "@/utils/validate";
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
    const validateTime = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("时间不能为空"));
      } else {
        callback();
      }
    };
    return {
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
      elegant: {},
      imagecropperShow: false,
      imagecropperKey: 0,
      BASE_API: process.env.VUE_APP_BASE_API,
      addOrUpdateElegantRules: {
        elName: [{ required: true, trigger: "blur", validator: validateName }],
        elTime: [{ required: true, trigger: "blur", validator: validateTime }],
      },
    };
  },
  components: { ImageCropper, PanThumb },
  created() {
    if (this.$route.params && this.$route.params.id) {
      this.getData(this.$route.params.id);
    } else {
      this.elegant = {};
    }
  },
  methods: {
    cropSuccess(data) {
      this.imagecropperShow = false;
      //上传之后接口返回图片地址
      this.elegant.elAvatar = data;
      this.imagecropperKey = this.imagecropperKey + 1;
    },
    close() {
      this.imagecropperShow = false;
      //上传组件初始化
      this.imagecropperKey = this.imagecropperKey + 1;
    },
    addOrUpdate() {
      if (!this.$route.params.id) {
        this.submitContent();
      } else {
        this.updateContent();
      }
    },
    submitContent() {
      this.$refs.elegant.validate((valid) => {
        if (valid) {
          elegantApi
            .addElegant(this.elegant)
            .then((response) => {
              this.$message({
                type: "success",
                message: "添加成功!",
              });
              // 路由跳转志愿风采列表
              this.$router.push({ path: "/elegant/table" });
            })
            .catch((error) => {});
        } else {
          return false;
        }
      });
    },
    getData(id) {
      elegantApi
        .getOneElegant(id)
        .then((response) => {
          this.elegant = response.data;
          this.loading = false;
        })
        .catch((error) => {});
    },
    updateContent() {
      this.$refs.elegant.validate((valid) => {
        if (valid) {
          elegantApi
            .updateElegant(this.elegant)
            .then((response) => {
              this.$message({
                type: "success",
                message: "修改成功!",
              });
              // 路由跳转w文件列表
              this.$router.push({ path: "/elegant/table" });
            })
            .catch((error) => {});
        } else {
          return false;
        }
      });
    },
  },
};
</script>
