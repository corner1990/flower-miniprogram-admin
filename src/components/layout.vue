<template>
  <div class="sub-layout">
    <MainHeader />
    <div class="layout-conent">
      <SideBar/>
      <div class="main-content" :class="{'content-collapse': collapse}">
        <TagsCom />
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import MainHeader from './header'
import SideBar from './side-bar'
import TagsCom from './Tags'
import Bus from '@/components/bus'

export default {
  name: 'layout',
  components: {
    MainHeader,
    SideBar,
    TagsCom
  },
  data() {
    return {
      collapse: false
    }
  },
  created() {
    Bus.$on('collapse-content', msg => {
      this.collapse = msg
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.sub-layout{
  .layout-conent{
    display: flex
  }
  .main-content{
    position: absolute;
    left: 250px;
    right: 0;
    top: 70px;
    bottom: 0;
    padding-bottom: 30px;
    -webkit-transition: left .3s ease-in-out;
    transition: left .3s ease-in-out;
    background: #f0f0f0;
  }
  .content-collapse{
    left: 65px;
  }
}
</style>
