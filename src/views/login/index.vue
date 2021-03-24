<template>
  <div class="login-container">
    <!-- 登录 -->
    <transition name="el-zoom-in-top">
      <div v-show="show" class="transition-box">
        <el-form
          ref="loginForm"
          :model="loginForm"
          :rules="loginRules"
          class="login-form"
          auto-complete="on"
          label-position="left"
        >
          <div class="title-container">
            <h3 class="title">青年志愿者后台登录</h3>
          </div>

          <el-form-item prop="userid">
            <span class="svg-container">
              <svg-icon icon-class="user" />
            </span>
            <el-input
              ref="userid"
              v-model="loginForm.userid"
              placeholder="请输入手机号"
              name="userid"
              type="text"
              tabindex="1"
              auto-complete="on"
            />
          </el-form-item>

          <el-form-item prop="password">
            <span class="svg-container">
              <svg-icon icon-class="password" />
            </span>
            <el-input
              :key="passwordType"
              ref="password"
              v-model="loginForm.password"
              :type="passwordType"
              placeholder="请输入6-18位密码"
              name="password"
              tabindex="2"
              auto-complete="on"
              @keyup.enter.native="handleLogin"
            />
            <span class="show-pwd" @click="showPwd">
              <svg-icon
                :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
              />
            </span>
          </el-form-item>

          <el-button
            :loading="loading"
            type="primary"
            style="width: 100%; margin-bottom: 20px"
            @click.native.prevent="handleLogin"
            >登录</el-button
          >

          <div class="tips">
            <span style="margin-right: 20px">
              <a @click="changeForPwd">忘记密码</a></span
            >
          </div>
        </el-form>
      </div>
    </transition>
    <!-- 密码找回 -->
    <transition name="el-zoom-in-top">
      <div v-show="showForFind" class="transition-box">
        <el-form
          ref="FindForm"
          :model="FindForm"
          :rules="findRules"
          class="login-form"
          auto-complete="on"
          label-position="left"
        >
          <div class="title-container">
            <h3 class="title">青年志愿者密码找回</h3>
          </div>
          <el-form-item prop="id">
            <span class="svg-container">
              <svg-icon icon-class="user" />
            </span>
            <el-input
              ref="id"
              v-model="FindForm.id"
              placeholder="请输入账号"
              name="id"
              type="text"
              tabindex="1"
              auto-complete="on"
              @blur="onBsp($event)"
            />
          </el-form-item>

          <el-form-item prop="email">
            <span class="svg-container">
              <svg-icon icon-class="邮箱" />
            </span>
            <el-input
              v-if="theSuggestion"
              ref="email"
              placeholder="此账号绑定的邮箱"
              name="email"
              type="text"
              tabindex="1"
              auto-complete="on"
            />
            <el-input
              v-else
              ref="email"
              v-model="FindForm.email"
              :placeholder="`此ID：` + FindForm.id + `\u3000绑定的邮箱`"
              name="email"
              type="text"
              tabindex="1"
              auto-complete="on"
            />
          </el-form-item>

          <el-button
            :loading="loading"
            type="primary"
            style="width: 100%; margin-bottom: 20px"
            @click="handleFind"
            >找回</el-button
          >

          <div class="tips">
            <span style="margin-right: 34px">
              <a @click="toLogin">返回</a></span
            >
          </div>
        </el-form>
      </div>
    </transition>
    <div id="adminForLogin"></div>
  </div>
</template>

<script>
import { validId, validEmail } from "@/utils/validate";
import { findPwd } from "@/api/user";

export default {
  name: "Login",
  data() {
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
    return {
      loginForm: {
        userid: "",
        password: "",
      },
      loginRules: {
        userid: [
          { required: true, trigger: "blur", validator: validateUserId },
        ],
        password: [
          {
            required: true,
            type: "string",
            trigger: "blur",
            max: 18,
            min: 6,
            message: "密码位数不够",
          },
        ],
      },
      findRules: {
        id: [{ required: true, trigger: "blur", validator: validateUserId }],
        email: [{ required: true, trigger: "blur", validator: validateEmail }],
      },
      FindForm: {
        id: "",
        email: "",
      },
      loading: false,
      passwordType: "password",
      redirect: undefined,
      show: true,
      showForFind: false,
      theSuggestion: true,
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true,
    },
  },
  methods: {
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("user/login", this.loginForm)
            .then(() => {
              this.$router.push({ path: this.redirect || "/" });
              this.loading = false;
            })
            .catch((error) => {
              this.loading = false;
              this.$message.error(error);
            });
        } else {
          return false;
        }
      });
    },
    changeForPwd() {
      this.show = false;
      this.loginForm = {};
      this.$refs["loginForm"].resetFields();
      setTimeout(() => {
        this.showForFind = true;
      }, 500);
    },
    toLogin() {
      this.showForFind = false;
      this.FindForm = {};
      this.theSuggestion = true;
      this.$refs['FindForm'].resetFields()
      setTimeout(() => {
        this.show = true;
      }, 500);
    },
    handleFind() {
      this.$refs.FindForm.validate((valid) => {
        if (valid) {
          findPwd(this.FindForm)
            .then((response) => {
              const h = this.$createElement;
              this.$notify({
                title: "密码找回消息提示",
                position: "top-right",
                message: h(
                  "i",
                  { style: "color: #4169e1;font-weight:bold" },
                  "您原来的密码已发送到您账号绑定的邮箱，邮箱号：" +
                    this.FindForm.email
                ),
              });
              this.$router.go({ push: "/" });
            })
            .catch((error) => {});
        } else {
          return false;
        }
      });
    },
    onBsp(event) {
      this.theSuggestion = false;
    },
  },
};
</script>

<style>
</style>
<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

//$bg: #283443;
$bg: rgba(0, 0, 0, 0.6);
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        //box-shadow: 0 0 0px 100px $bg inset !important;
        //-webkit-text-fill-color: $cursor !important;
        -webkit-transition-delay: 99999s;
        -webkit-transition: color 99999s ease-out,
          background-color 99999s ease-out;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  //background-color: $bg;
  overflow: hidden;

  #adminForLogin {
    position: fixed;
    top: 0;
    z-index: -2;
    background: url("../../assets/userhome/3.jpg") no-repeat;
    background-size: cover;
    width: 100%;
    height: 100%;
  }

  .login-form {
    position: relative;
    width: 520px;
    top: 150px;
    max-width: 100%;
    padding: 80px 35px 0;
    margin: 0 auto;
    overflow: hidden;
    border-radius: 20px;
    background: rgba(0, 0, 0, 0.7); //#4169e1
    box-shadow: 0px 0px 28px 24px rgba(0, 0, 0, 0.5);
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 20px;
    float: right;
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
