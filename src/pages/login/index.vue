<template>
  <div class="login-wrap">
    <div class="ms-login">
        <div class="ms-title">后台管理系统</div>
        <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
          <el-form-item prop="username">
            <el-input v-model="param.username" placeholder="username">
              <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
            </el-input>
          </el-form-item>
          <!-- <el-form-item prop="password">
            <el-input
                type="password"
                placeholder="password"
                v-model="param.password"
                @keyup.enter.native="submitForm()"
            >
              <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
            </el-input>
          </el-form-item> -->
          <el-form-item prop="vertify">
            <el-input
              type="vertify"
              placeholder="vertify"
              v-model="param.vertify"
              @keyup.enter.native="login()"
            >
              <el-button slot="append" @click="getVerifyCode">{{ syncText }}</el-button>
            </el-input>
          </el-form-item>
          <div class="login-btn">
            <el-button type="primary" @click="login">登录</el-button>
          </div>
          <p class="login-tips">Tips : 用户名为手机号</p>
        </el-form>
    </div>
  </div>
</template>

<script>
import { verifiyLogin, verifyLoginCode, getUserInfo } from './login-api'
import crypto from '@/utils/crypto.js'
export default {
  data: function() {
    return {
      param: {
        username: '',
        password: '',
        vertify: ''
      },
      rules: {
        username: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
        // password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        vertify: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
      },
      text: '获取验证码',
      wait: 60,
      timer: null
    };
  },
  methods: {
    submitForm() {
      this.$refs.login.validate(valid => {
        if (valid) {
          this.$message.success('登录成功');
          localStorage.setItem('ms_username', this.param.username);
          this.$router.push('/');
        } else {
          this.$message.error('请输入账号和密码');
          console.log('error submit!!');
          return false;
        }
      });
    },
    /**
     * @desc 倒计时
     */
    autoStep() {
      if (this.wait > 1) {
        this.wait = this.wait - 1;
        this.timer = window.setTimeout(this.autoStep, 1000);
        return false;
      }
      this.wait = 60;
      clearTimeout(this.timer);
    },/**
     * @desc 验证手机号
     */
    checkPhone() {
      let { username } = this.param
      let phoneReg=/^[1][3,4,5,7,8][0-9]{9}$/
      if (phoneReg.test(username)) {
        return true
      }
      this.$message.error({
        'message': '手机号不正确，请输入正确的手机号',
        duration: 3000
      })
      return false
    },
    async loadInfo() {
      let id = window.localStorage.getItem('$user_id')
      let { errorCode, data } = await getUserInfo({
        params: { 'user_id': id }
      })
      if (errorCode === 0) {
        window.localStorage.setItem('$_user_info', JSON.stringify(data))
      }
    },
    /**
     * @desc 获取验证码
     */
    async getVerifyCode() {
      if (!this.checkPhone()) {
        return false
      }
      if (this.wait !== 60) {
        this.$message({
          message: '获取验证码太频繁，请稍后再试',
          type: 'warning',
          duration: 2000
        });
        return false;
      }
      let { username } = this.param
      username =  crypto.encrypt(username)
      await verifiyLogin({ phone: username, action: 'login' });
      this.autoStep();
    },
    async vertify() {
      let {
        username,
        vertify
      } = this.param
      username =  crypto.encrypt(username)
      let { errorCode, data } = await verifyLoginCode({
        phone: username,
        code: vertify,
        action: 'login'
      })
      if (errorCode === 0) {
        window.localStorage.setItem('$user_id', data.user_id)
        // 读取重定向地址
        let rejectInfo =  window.localStorage.getItem('$_reject')
        this.loadInfo()
        
        if (rejectInfo) {
          this.$router.replace(JSON.parse(rejectInfo))
          return false
        }
        this.$message.success('登录成功')
        this.$router.push('/');
      }

    },
     /**
     * @desc 登录
     */
    login() {

      this.$refs.login.validate(valid => {
        if (valid) {
          this.vertify()
        } else {
          return false;
        }
      })
      
    }
  },
  computed: {
    disabled() {
      let { phone } = this
      let phoneReg=/^[1][3,4,5,7,8][0-9]{9}$/
      if (phoneReg.test(phone)) {
        return true
      }
      return false
    },
    syncText() {
      let { wait, text } = this
      if (wait === 60) return text
      return `${wait}秒后重新获取` 
    }
  }
};
</script>

<style scoped>
.login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url("../../assets/img/login-bg.jpg");
    background-size: 100%;
}
.ms-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: #fff;
    border-bottom: 1px solid #ddd;
}
.ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 350px;
    margin: -190px 0 0 -175px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.3);
    overflow: hidden;
}
.ms-content {
    padding: 30px 30px;
}
.login-btn {
    text-align: center;
}
.login-btn button {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
}
.login-tips {
    font-size: 12px;
    line-height: 30px;
    color: #fff;
}
</style>