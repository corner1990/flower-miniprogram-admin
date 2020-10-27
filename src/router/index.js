import Vue from 'vue'
import VueRouter from 'vue-router'//使用路由时，要引入vue-router
// import demo from './demo'
import Login from './login' // 登录
import Home from './home'
import Product from './product'
import Orders from './orders'
import UploadImg from './upload-img'
import Banner from './banner'
import UserManager from './user-manager'

/**
 * @des 导出路由
 */
const routes = [
  ...Login,
  ...Home,
  ...Product,
  ...Orders,
  ...Banner,
  ...UserManager,
  ...UploadImg
]
Vue.use(VueRouter)

// 创建 router 实例
const router = new VueRouter({
  mode: 'history',
  routes // (缩写) 相当于 routes: routes
})

// 以下代码在做路由鉴权的时候使用
router.beforeEach((to, from, next) => {
  // 记录每个路由name和离开时候的位置
  /* 必须调用 `next` */
  window.document.title = to.meta.title
  // let reg = /^http[s]:/
  // eslint-disable-next-line no-debugger
  // let { query, params, path } = to
  // let userId = window.localStorage.getItem('$user_id')
  // if (!userId) {
  //   // Notify({ type: 'warning', message: '请先登录' })
  //   window.localStorage.removeItem('$_user_info')
  //   window.localStorage.setItem('$_reject', JSON.stringify({ path, query, params }))
  //   next({path: '/login'})
  //   return
  // } else {
  //   next()
  // }
  next()
})

router.beforeResolve((to, from, next) => {
  // 路由后隐藏ActionSheet

  /* 必须调用 `next` */
  next()
  
})

// 路由返回到记录的位置
// router.afterEach((to) => {

// })

export default router