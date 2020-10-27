const Banner = () => import(/* webpackChunkName: "banner" */ '../pages/banner/index')
const ProductRoutes = [
  {
    path: '/banner',
    name: 'Banner',
    component: Banner,
    meta: {
      title: 'Banner管理',
      keepAlive: true
    }
  }
]

export default ProductRoutes
