const UserManager = () => import(/* webpackChunkName: "banner" */ '../pages/user-manager/index')

const ProductRoutes = [
  {
    path: '/user-manager',
    name: 'UserManager',
    component: UserManager,
    meta: {
      title: '用户管理',
      keepAlive: true
    }
  }
]

export default ProductRoutes
