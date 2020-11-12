const Home = () => import('../pages/home/')
const Found = () => import('../pages/found')
const HomeRoutes = [
  {
    path: '/',
    meta: {
      title: 'home',
      keepAlive: true
    },
    redirect: { path: '/home' }
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {
      title: '首页',
      keepAlive: true
    }
  },
  {
    path: '/found',
    name: 'Found',
    component: Found,
    meta: {
      title: '发现页内容',
      keepAlive: true
    }
  }
]

export default HomeRoutes
