<template>
  <div class="login-wrap">
    <div class="ms-login">
        <div class="ms-title">后台管理系统</div>
        <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
          <el-form-item prop="account">
            <el-input v-model="param.account" placeholder="账号">
              <el-button slot="prepend" icon="el-icon-news"></el-button>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
                type="password"
                placeholder="密码"
                v-model="param.password"
                @keyup.enter.native="login()"
            >
              <el-button slot="prepend" icon="el-icon-setting"></el-button>
            </el-input>
          </el-form-item>
          <!-- <el-form-item prop="vertify">
            <el-input
              type="vertify"
              placeholder="vertify"
              v-model="param.vertify"
              @keyup.enter.native="login()"
            >
              <el-button slot="append" @click="getVerifyCode">{{ syncText }}</el-button>
            </el-input>
          </el-form-item> -->
          <div class="login-btn">
            <el-button type="primary" @click="login">登录</el-button>
          </div>
          <p class="login-tips">Tips : 账号和密码</p>
        </el-form>
    </div>
  </div>
</template>

<script>
import { adminAccountLogin, getUserInfo } from './login-api'

export default {
  data: function() {
    return {
      param: {
        account: '',
        password: ''
      },
      rules: {
        account: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        // vertify: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
      }
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
     * @desc 
     */
    async vertify() {
      let { errorCode, data } = await adminAccountLogin(this.param)
      if (errorCode === 0) {
        window.localStorage.setItem('$user_id', data.user_id)
        window.localStorage.setItem('$_token', JSON.stringify(data))
        
        console.log('JSON.stringify(data)', JSON.stringify(data))
        // 读取重定向地址
        let rejectInfo =  window.localStorage.getItem('$_reject')
        // this.loadInfo()
        
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
  computed: {}
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