const Login = () => import('../pages/login/')
const LoginRoutes = [
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      title: '登录',
      keepAlive: true
    }
  }
]

export default LoginRoutes
