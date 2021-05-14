<template>
  <div class="app-container">
    <el-form
      label-width="80px"
      :rules="addOrUpdateUserRules"
      ref="user"
      :model="user"
    >
      <el-form-item label="用户名字" prop="userName">
        <el-input style="width: 38%" v-model="user.userName" />
      </el-form-item>
      <el-form-item label="用户账号" prop="userId">
        <el-input
          style="width: 38%"
          v-model="user.userId"
          :disabled="theUpdateSysUserId"
        />
      </el-form-item>
      <el-form-item label="用户密码" prop="userPwd">
        <el-input style="width: 38%" v-model="user.userPwd" />
      </el-form-item>
      <el-form-item label="用户邮箱" prop="userEmail">
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
        <pan-thumb :image="user.userAvatar + ''" />
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
    <div class="excel">
      <el-upload
        ref="upload"
        class="upload-demo"
        action="http://39.97.253.156:10010/excel/postexcel"
        :limit="1"
        :on-exceed="exceedNumber"
        :auto-upload="false"
        :drag="true"
        accept=".xlsx"
        :on-error="errorpush"
        :on-success="successpush"
        :headers="myheaders"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      </el-upload>
      <el-button class="btnpush" size="small" type="success" @click="pushExcel"
        >开始批量上传</el-button
      >
      <div class="format">
        Excel表格 格式 如下图：
      </div>
      <div class="formatimg">
        <img src="../../assets/userhome/formatimg.png" alt="图片示例格式">
      </div>
    </div>
  </div>
</template>

<script>
import manageusers from "@/api/manageusers";
import ImageCropper from "@/components/ImageCropper";
import PanThumb from "@/components/PanThumb";
import { validId, validEmail, validName } from "@/utils/validate";
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
    const validateUserId = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("账号不能为空"));
      } else {
        if (!validId(value)) {
          callback(new Error("手机号格式不正确"));
        } else {
          callback();
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
      addOrUpdateUserRules: {
        userId: [
          { required: true, trigger: "blur", validator: validateUserId },
        ],
        userPwd: [
          {
            required: true,
            type: "string",
            trigger: "blur",
            max: 18,
            min: 6,
            message: "密码位数不够",
          },
        ],
        userEmail: [
          { required: true, trigger: "blur", validator: validateEmail },
        ],
        userName: [
          { required: true, trigger: "blur", validator: validateName },
        ],
      },
      myheaders: {
        "X-token": this.$store.getters.token,
      },
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
      this.$refs.user.validate((valid) => {
        if (valid) {
          manageusers.updateUser(this.user).then((response) => {
            this.$message({
              type: "success",
              message: "修改成功!",
            });
            // 路由跳转用户列表
            this.$router.push({ path: "/manageusers/table" });
          });
        } else {
          return false;
        }
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
      this.$refs.user.validate((valid) => {
        if (valid) {
          manageusers.addUser(this.user).then((response) => {
            this.$message({
              type: "success",
              message: "添加成功!",
            });
            // 路由跳转用户列表
            this.$router.push({ path: "/manageusers/table" });
          });
        } else {
          return false;
        }
      });
    },
    exceedNumber() {
      const h = this.$createElement;
      this.$notify({
        title: "批量上传通知",
        message: h("i", { style: "color: red" }, "只能添加一个excel文件。"),
        position: "bottom-right",
      });
    },
    pushExcel() {
      this.$refs.upload.submit();
    },
    errorpush() {
      const h = this.$createElement;
      this.$notify({
        title: "批量上传通知",
        message: h("i", { style: "color: red" }, "上传失败。"),
        position: "bottom-right",
      });
    },
    successpush() {
      this.$refs.upload.clearFiles();
      this.$message({
        message: "批量导入成功！",
        type: "success",
      });
    },
  },
};
</script>
<style scoped>
.app-container .excel {
  position: absolute;
  top: 70px;
  right: 200px;
}
.app-container .excel .btnpush {
  position: absolute;
  left: 128px;
  top: 230px;
}
.app-container .excel .format{
  position: absolute;
  top: 280px;
  left: 92px;
}
.app-container .excel .formatimg{
  margin-top: 17px;
  position: absolute;
  top: 300px;
  left: 30px;
}
.app-container .excel .formatimg img{
  width: 300px;
  height: 120px;
}
</style>>
