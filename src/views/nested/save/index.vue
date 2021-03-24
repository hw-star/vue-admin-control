<template>
  <div class="app-container">
    <el-form
      label-width="80px"
      :rules="addOrUpdatesysUserRules"
      ref="sysUser"
      :model="sysUser"
    >
      <el-form-item label="名字" prop="sysName">
        <el-input style="width: 38%" v-model="sysUser.sysName" />
      </el-form-item>
      <el-form-item label="账号" prop="sysId">
        <el-input
          style="width: 38%"
          v-model="sysUser.sysId"
          :disabled="theUpdateSysUserId"
        />
      </el-form-item>
      <el-form-item label="密码" prop="sysPwd">
        <el-input style="width: 38%" v-model="sysUser.sysPwd" />
      </el-form-item>
      <el-form-item label="邮箱" prop="sysEmail">
        <el-input style="width: 38%" v-model="sysUser.sysEmail" />
      </el-form-item>
      <el-form-item label="性别">
        <el-select
          style="width: 16%"
          v-model="sysUser.sysSex"
          clearable
          placeholder="请选择性别"
        >
          <el-option :value="1" label="男" />
          <el-option :value="0" label="女" />
        </el-select>
      </el-form-item>

      <!-- 讲师头像 -->
      <el-form-item label="头像">
        <!-- 头衔缩略图 -->
        <pan-thumb :image="sysUser.sysAvatar + ''" />
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
        <div
          v-if="theUpdateSysUserId == false"
          style="font-size: 1.2em; font-weight: bold"
        >
          注：新增加的管理员无任何权限！
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import api from "@/api/users";
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
      sysUser: {
        id: "",
        sysName: "",
        sysId: "",
        sysSex: "",
        sysEmail: "",
        sysPwd: "",
        sysAvatar: "",
      },
      theUpdateSysUserId: false,
      imagecropperShow: false,
      imagecropperKey: 0,
      BASE_API: process.env.VUE_APP_BASE_API,
      saveBtnDisabled: false,
      addOrUpdatesysUserRules: {
        sysId: [{ required: true, trigger: "blur", validator: validateUserId }],
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
    if (this.$route.params && this.$route.params.id) {
      const id = this.$route.params.id;
      this.getsysUserInfo(id);
      this.theUpdateSysUserId = true;
    } else {
      this.sysUser = {};
    }
  },
  methods: {
    cropSuccess(data) {
      this.imagecropperShow = false;
      //上传之后接口返回图片地址
      this.sysUser.sysAvatar = data;
      this.imagecropperKey = this.imagecropperKey + 1;
    },
    close() {
      this.imagecropperShow = false;
      //上传组件初始化
      this.imagecropperKey = this.imagecropperKey + 1;
    },
    getsysUserInfo(id) {
      api.getsysUser(id).then((response) => {
        this.sysUser = response.data;
      });
    },
    updatesysUser() {
      this.$refs.sysUser.validate((valid) => {
        if (valid) {
          api.updatesysUser(this.sysUser).then((response) => {
            this.$message({
              type: "success",
              message: "修改成功!",
            });
            // 路由跳转用户列表
            this.$router.push({ path: "/nested/table" });
          });
        } else {
          return false;
        }
      });
    },
    saveOrUpdate() {
      if (!this.sysUser.id) {
        this.savesysUser();
      } else {
        this.updatesysUser();
      }
    },
    savesysUser() {
      this.$refs.sysUser.validate((valid) => {
        if (valid) {
          api.addsysUser(this.sysUser).then((response) => {
            this.$message({
              type: "success",
              message: "添加成功!",
            });
            // 路由跳转管理员列表
            this.$router.push({ path: "/nested/table" });
          });
        } else {
          return false;
        }
      });
    },
  },
};
</script>
