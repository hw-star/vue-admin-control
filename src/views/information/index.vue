<template>
  <div class="app-container">
    <el-form
      label-width="80px"
      :rules="addOrUpdatesysUserRules"
      ref="sysUser"
      :model="sysUser"
    >
      <el-form-item label="名字" prop="sysName">
        <el-input
          style="width: 38%"
          v-model="sysUser.sysName"
          :disabled="isUpdateInformation"
        />
      </el-form-item>
      <el-form-item label="账号">
        <el-input style="width: 38%" v-model="sysUser.sysId" :disabled="true" />
      </el-form-item>
      <el-form-item label="密码" prop="sysPwd">
        <el-input
          style="width: 38%"
          v-model="sysUser.sysPwd"
          :disabled="isUpdateInformation"
        />
      </el-form-item>
      <el-form-item label="邮箱" prop="sysEmail">
        <el-input
          style="width: 38%"
          v-model="sysUser.sysEmail"
          :disabled="isUpdateInformation"
        />
      </el-form-item>
      <el-form-item label="性别">
        <el-select
          :disabled="isUpdateInformation"
          style="width: 16%"
          v-model="sysUser.sysSex"
          clearable
          placeholder="请选择性别"
        >
          <el-option :value="1" label="男" />
          <el-option :value="0" label="女" />
        </el-select>
      </el-form-item>

      <!-- 头像 -->
      <el-form-item label="头像">
        <!-- 头衔缩略图 -->
        <pan-thumb :image="sysUser.sysAvatar + ''" />
        <!-- 文件上传按钮 -->
        <el-button
          v-if="isUpdateInformation == false"
          type="primary"
          icon="el-icon-upload"
          @click="imagecropperShow = true"
          >更换头像
        </el-button>

        <!--
      v-show：是否显示上传组件
      :key：类似于id，如果一个页面多个图片上传控件，可以做区分
      :url：后台上传的url地址
      @close：关闭上传组件
      @crop-upload-success：上传成功后的回调 
        <input type="file" name="file"/>
      -->
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
        <el-button :disabled="saveBtnDisabled" v-if="isUpdateInformation == true" type="primary" @click="toUpdate"
          >修改个人信息</el-button
        >
        <el-button
          :disabled="saveBtnDisabled"
          v-if="isUpdateInformation == false"
          type="warning"
          @click="channelUpdate"
          >取消</el-button
        >
        <el-button
          :disabled="saveBtnDisabled"
          v-if="isUpdateInformation == false"
          type="warning"
          @click="startUpdate"
          >保存</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import store from "@/store";
import { update } from "@/api/user";
import ImageCropper from "@/components/ImageCropper";
import PanThumb from "@/components/PanThumb";
import { validEmail, validName } from "@/utils/validate";
export default {
  data() {
    const validateEmail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("邮箱不能为空"));
      } else {
        if (validEmail(value)) {
          callback();
        } else {
          return callback(new Error("邮箱格式不正确"));
        }
      }
    };
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
    return {
      sysUser: {},
      saveBtnDisabled: false,
      isUpdateInformation: true,
      imagecropperShow: false,
      imagecropperKey: 0,
      BASE_API: process.env.VUE_APP_BASE_API,
      addOrUpdatesysUserRules: {
        sysPwd: [
          {
            required: true,
            type: "string",
            trigger: "blur",
            max: 18,
            min: 6,
            message: "密码位数不够",
          },
        ],
        sysEmail: [
          { required: true, trigger: "blur", validator: validateEmail },
        ],
        sysName: [{ required: true, trigger: "blur", validator: validateName }],
      },
    };
  },
  components: { ImageCropper, PanThumb },
  created() {
    this.getInfoMsg();
  },
  methods: {
    getInfoMsg() {
      store
        .dispatch("user/getInfo")
        .then((response) => {
          this.sysUser = response.sysUser;
        })
        .catch((error) => {});
    },
    toUpdate() {
      this.isUpdateInformation = false;
    },
    // 更新个人信息
    startUpdate() {
      this.$refs.sysUser.validate((valid) => {
        if (valid) {
          update(this.sysUser)
            .then((response) => {
              this.$message({
                type: "success",
                message: "修改成功!",
              });
              this.$router.go({ path: "/information" });
            })
            .catch((error) => {});
        } else {
          return false;
        }
      });
    },
    cropSuccess(data) {
      this.imagecropperShow = false;
      //上传之后接口返回图片地址
      this.sysUser.sysUserAvatar = data;
      this.imagecropperKey = this.imagecropperKey + 1;
    },
    close() {
      this.imagecropperShow = false;
      //上传组件初始化
      this.imagecropperKey = this.imagecropperKey + 1;
    },
    channelUpdate() {
      this.$refs["sysUser"].resetFields();
      this.isUpdateInformation = true;
      this.getInfoMsg();
    },
  },
};
</script>
