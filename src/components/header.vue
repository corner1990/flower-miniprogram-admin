<template>
  <div class="main-header flex">
    <div class="flex left-box">
      <!-- 折叠按钮 -->
        <div class="collapse-btn" @click="collapseChage">
            <i v-if="!collapse" class="el-icon-s-fold collapse-icon"></i>
            <i v-else class="el-icon-s-unfold collapse-icon"></i>
        </div>
        <div class="header-logo">AS Flower Boutique - 管理系统</div>
    </div>
    <div class="header-right">
      <div class="header-user-con">
          
        <!-- 用户头像 -->
        <div class="user-avator">
          <img :src="(userInfo.avatar ? userInfo.avatar : 'https://ipxcdn.jfshare.com/system/admin/acf6f273c1cd77066b4541308f782a88.png')" />
        </div>
        <!-- 用户名下拉菜单 -->
        <el-dropdown class="user-name" trigger="click" @command="handleCommand">
          <span class="el-dropdown-link">
            {{userInfo.nick_name}}
            <i class="el-icon-caret-bottom"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
              <!-- <el-dropdown-item>修改信息</el-dropdown-item> -->
              <el-dropdown-item divided command="loginout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
// import { logout } from '../pages/login/login-api'
import Bus from '@/components/bus'
export default {
  name: 'main-header',
  props: {
    msg: String
  },
  data() {
    return {
      collapse: false,
      userInfo: {
        "nick_name":"小花仙",
        "avatar":"https://ipxcdn.jfshare.com/system/admin/acf6f273c1cd77066b4541308f782a88.png"
      }
    }
  },
  methods: {
    collapseChage() {
      this.collapse = !this.collapse
      Bus.$emit('collapse', this.collapse)
    },
    // 用户名下拉菜单选择事件
    async handleCommand(command) {
        if (command == 'loginout') {
            // await logout()
            window.localStorage.removeItem('$user_id')
            window.localStorage.removeItem('$_token')
            window.localStorage.removeItem('$_user_info')
            this.$router.push('/login');
        }
    },
  },
  created() {
    Bus.$emit('collapse', this.collapse)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import url('../less/main.less');
.main-header{
  justify-content: space-between;
  align-items: center;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 70px;
  font-size: 22px;
  color: #fff;
  background-color: @color-brand;
  
  .collapse-btn{
   transform: translateY(4px);
   height: 60px;
   width: 70px;
   line-height: 60px;
   cursor: pointer;
   text-align: center;
   &:hover{
     background-color: @color-brand-dark;
   }
  }
  .header-right {
    float: right;
    padding-right: 50px;
  }
  .header-logo{
    line-height: 60px;
  }
  .header-user-con {
    display: flex;
    height: 70px;
    align-items: center;
  }
  .user-name {
    margin-left: 10px;
  }
  .user-avator {
      margin-left: 20px;
  }
  .user-avator img {
      display: block;
      width: 40px;
      height: 40px;
      border-radius: 50%;
  }
  .el-dropdown-link {
      color: #fff;
      cursor: pointer;
  }
  .el-dropdown-menu__item {
      text-align: center;
  }
}
.flex{
  display: flex;
}
</style>
