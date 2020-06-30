const Product = () => import(/* webpackChunkName: "product" */ '../pages/product/')
const ReleaseProduct = () => import(/* webpackChunkName: "release-product" */ '../pages/product/release-product.vue')
const EditProduct = () => import(/* webpackChunkName: "edit-product" */ '../pages/product/release-product.vue')

const ProductRoutes = [
  {
    path: '/product',
    name: 'product',
    component: Product,
    meta: {
      title: '商品管理',
      keepAlive: true
    }
  },
  {
    path: '/release-product',
    name: 'ReleaseProduct',
    component: ReleaseProduct,
    meta: {
      title: '发布商品',
      keepAlive: true
    }
  },
  {
    path: '/edit-product',
    name: 'EditProduct',
    component: EditProduct,
    meta: {
      title: '编辑商品',
      keepAlive: true
    }
  }
]

export default ProductRoutes
