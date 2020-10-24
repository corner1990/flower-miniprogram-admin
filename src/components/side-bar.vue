<template>
  <div class="sidebar">
    <el-menu
      class="sidebar-el-menu"
      :default-active="onRoutes"
      :collapse="collapse"
      background-color="#f8f8f8"
      text-color="#666"
      active-text-color="#40c9b3"
      unique-opened
      router
    >
      <template v-for="item in items">
        <template v-if="item.subs">
          <el-submenu :index="item.index" :key="item.index">
            <template slot="title">
              <i :class="item.icon"></i>
              <span slot="title">{{ item.title }}</span>
            </template>
            <template v-for="subItem in item.subs">
              <el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
                <template slot="title">{{ subItem.title }}</template>
                <el-menu-item
                  v-for="(threeItem,i) in subItem.subs"
                  :key="i"
                  :index="threeItem.index"
                >{{ threeItem.title }}</el-menu-item>
              </el-submenu>
              <el-menu-item v-else :index="subItem.index" :key="subItem.index">{{ subItem.title }}</el-menu-item>
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.index" :key="item.index">
            <i :class="item.icon"></i>
            <span slot="title">{{ item.title }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
import bus from './bus'
export default {
  data() {
    return {
      collapse: false,
      items: [
        {
          icon: 'el-icon-s-home',
          index: '/',
          title: '系统首页'
        },
        {
          icon: 'el-icon-s-goods',
          index: 'content',
          title: '内容管理',
          subs: [
            {
              icon: 'el-icon-s-goods',
              index: '/product',
              title: '商品管理'
            },
            {
              icon: 'el-icon-s-order',
              index: '/orders/index',
              title: '订单管理'
            },
            {
              icon: 'el-icon-s-claim',
              index: 'theater',
              title: '剧场'
            },
            {
              icon: 'el-icon-postcard',
              title: '发布文字内容',
              index: 'text'
            },
            {
              icon: 'el-icon-picture',
              title: '发布图片内容',
              index: 'image'
            },
            {
              icon: 'el-icon-video-camera-solid',
              title: '发布短视频内容',
              index: 'video'
            },
            {
              icon: 'el-icon-s-opportunity',
              title: '发布资讯',
              index: 'ads'
            }
          ]
        }
      ]
    }
  },
  computed: {
    onRoutes() {
      return this.$route.path.replace('/', '')
    }
  },
  created() {
    // 通过 Event Bus 进行组件间通信，来折叠侧边栏
    bus.$on('collapse', msg => {
      this.collapse = msg
      bus.$emit('collapse-content', msg)
    })
  }
}
</script>

<style scoped>
.sidebar {
  display: block;
  position: absolute;
  left: 0;
  top: 70px;
  bottom: 0;
  overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
  width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
  width: 250px;
}
.sidebar > ul {
  height: 100%;
}
</style>
