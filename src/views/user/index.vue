<template>
  <div class="applogin-container">
    <nav class="nav_set">
      <div class="nav_set_left">
        <ul>
          <li>
            <router-link to="/" :title="titlemesg"
              ><i class="iconfont iconhongqi" style="color: red !important"></i>
              青年志愿者</router-link
            >
          </li>
          <li>
            <router-link to="/about">活动</router-link>
          </li>
          <li>
            <router-link to="/about">导航</router-link>
          </li>
        </ul>
      </div>
      <div class="nav_set_right">
        <ul>
          <li>
            <el-button type="text" @click="centerforregister = true">
              <i class="iconfont iconzhuce"></i>注册
            </el-button>
          </li>
          <li>
            <el-button type="text" @click="centerforlogin = true">
              <i class="iconfont icondenglu"></i>登录
            </el-button>
          </li>
        </ul>
      </div>
    </nav>
    <canvas id="line">浏览器版本太低，请升级浏览器！</canvas>
    <h1>
      青年志愿者 <i class="iconfont iconshuxian"></i>Chinese Youth Volunteers
    </h1>
    <div class="set_background"></div>
    <div class="set_login">
      <el-dialog
        title="账号登录"
        :visible.sync="centerforlogin"
        width="30%"
        center
      >
        <el-form
          :model="ruleFormlogin"
          ref="ruleFormlogin"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="账号" prop="loginid">
            <el-input
              v-model="ruleFormlogin.loginid"
              placeholder="请输入手机号"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="loginpwd">
            <el-input
              v-model="ruleFormlogin.loginpwd"
              placeholder="请输入6-18位密码"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              style="width: 39%"
              type="primary"
              @click="submitFormlogin('ruleFormlogin')"
              >登录</el-button
            >
            <el-button
              style="width: 39%"
              @click="resetFormlogin('ruleFormlogin')"
              >重置</el-button
            >
          </el-form-item>
          <el-form-item>
            <div class="divgetPwd">
              <router-link to="/about">忘记密码</router-link>
            </div>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
    <div class="set_register">
       <el-dialog title="账号注册" :visible.sync="centerforregister" width="30%" center>
            <el-form :model="ruleFormregister" ref="ruleFormregister" label-width="100px" class="demo-ruleForm">
              <el-form-item label="账号" prop="registerid">
                <el-input v-model="ruleFormregister.registerid" placeholder="请输入手机号"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="registerpwdf">
                <el-input v-model="ruleFormregister.registerpwdf" placeholder="请输入6-18位密码" show-password></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="registerpwds">
                <el-input v-model="ruleFormregister.registerpwds" placeholder="请 再 次输入密码" show-password></el-input>
              </el-form-item>
               <el-form-item label="名字" prop="registername">
                <el-input v-model="ruleFormregister.registername" placeholder="请输入名字"></el-input>
              </el-form-item>
              <el-form-item label="邮箱" prop="registeremail">
                <el-input v-model="ruleFormregister.registeremail" placeholder="请输入邮箱账号"></el-input>
              </el-form-item>
              <el-form-item label="性别" prop="registersex">
                <el-radio v-model="sex" label="1">男</el-radio>
                <el-radio v-model="sex" label="2">女</el-radio>
                <spon>注：登陆后可更换头像</spon>
              </el-form-item>
              <el-form-item>
                <el-button style="width:39%" type="primary" @click="submitFormregister('ruleFormregister')">注册</el-button>
                <el-button style="width:39%" @click="resetFormregister('ruleFormregister')">重置</el-button>
              </el-form-item>
            </el-form>
        </el-dialog>
    </div>
  </div>
</template>

<script>
import { createcanvasline } from "@/utils/createcanvasline";
export default {
  name: "userHome",
  mounted() {
    createcanvasline();
  },
  data() {
    return {
      titlemesg: '青年志愿者是"奉献、友爱、互助、进步"的精神。',
      sex: "1",
      ruleFormlogin: {
        loginid: "",
        loginpwd: "",
      },
      ruleFormregister: {
        registerid: "",
        registerpwdf: "",
        registerpwds: "",
        registername: "",
        registeremail: "",
      },
      centerforlogin: false,
      centerforregister: false,
    };
  },
  methods: {
    submitFormlogin(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetFormlogin(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style>
@import "../../assets/css/home.css";
</style>
