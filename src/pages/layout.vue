<template>
  <div class="layout-wrap">
    <template v-if="isLogin">
      <router-view />
    </template>
    <template v-else>
      <Layout />
    </template>
  </div>
</template>

<script>
import Layout from '../components/layout'
export default {
  name: 'layout-wrap',
  props: {
    msg: String
  },
  components: {
    Layout
  },
  computed: {
    isLogin() {
      let { path } = this.$route
      return /login/ig.test(path)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.layout-wrap{
  width: 100%;
  height: 100%;
}
</style>
