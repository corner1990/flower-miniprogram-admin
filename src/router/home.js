const Home = () => import('../pages/home/')
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
  }
]

export default HomeRoutes
