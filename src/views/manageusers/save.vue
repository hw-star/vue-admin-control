<template>
  <div class="app-container">
    <el-form label-width="80px">
      <el-form-item label="用户名字">
        <el-input style="width: 38%" v-model="user.userName" />
      </el-form-item>
      <el-form-item label="用户账号">
        <el-input style="width: 38%" v-model="user.userId" :disabled="theUpdateSysUserId" />
      </el-form-item>
      <el-form-item label="用户密码">
        <el-input style="width: 38%" v-model="user.userPwd" />
      </el-form-item>
      <el-form-item label="用户邮箱">
        <el-input style="width: 38%" v-model="user.userEmail" />
      </el-form-item>
      <el-form-item label="用户性别">
        <el-select
          style="width: 16%"
          v-model="user.userSex"
          clearable
          placeholder="请选择性别"
        >
          <el-option :value="1" label="男" />
          <el-option :value="0" label="女" />
        </el-select>
      </el-form-item>

      <!-- 讲师头像 -->
      <el-form-item label="用户头像">
        <!-- 头衔缩略图 -->
        <pan-thumb :image="user.userAvatar +''" />
        <!-- 文件上传按钮 -->
        <el-button
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
        <el-button
          :disabled="saveBtnDisabled"
          type="primary"
          @click="saveOrUpdate"
          >保存</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import manageusers from "@/api/manageusers";
import ImageCropper from "@/components/ImageCropper";
import PanThumb from "@/components/PanThumb";
export default {
  data() {
    return {
      user: {
        id: "",
        userName: "",
        userId: "",
        userSex: 1,
        userEmail: "",
        userPwd: "",
        userAvatar: "",
      },
      theUpdateSysUserId: false,
      imagecropperShow: false,
      imagecropperKey: 0,
      BASE_API: process.env.VUE_APP_BASE_API,
      saveBtnDisabled: false,
    };
  },
  components: { ImageCropper, PanThumb },
  created() {
    if (this.$route.params && this.$route.params.id) {
      const id = this.$route.params.id;
      this.getUserInfo(id);
      this.theUpdateSysUserId = true;
    } else {
      this.user = {};
    }
  },
  methods: {
    cropSuccess(data) {
      this.imagecropperShow = false;
      //上传之后接口返回图片地址
      this.user.userAvatar = data;
      this.imagecropperKey = this.imagecropperKey + 1;
    },
    close() {
      this.imagecropperShow = false;
      //上传组件初始化
      this.imagecropperKey = this.imagecropperKey + 1;
    },
    getUserInfo(id) {
      manageusers.getUser(id).then((response) => {
        this.user = response.data;
      });
    },
    updateUser() {
      manageusers.updateUser(this.user).then((response) => {
        this.$message({
          type: "success",
          message: "修改成功!",
        });
        // 路由跳转用户列表
        this.$router.push({ path: "/manageusers/table" });
      });
    },
    saveOrUpdate() {
      if (!this.user.id) {
        this.saveUser();
      } else {
        this.updateUser();
      }
    },
    saveUser() {
      manageusers.addUser(this.user).then((response) => {
        this.$message({
          type: "success",
          message: "添加成功!",
        });
        // 路由跳转用户列表
        this.$router.push({ path: "/manageusers/table" });
      });
    },
  },
};
</script>
