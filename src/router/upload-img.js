export default [
  {
    path: '/upload-img',
    component: () => import(/* webpackChunkName: "orders" */ '../pages/upload-img'),
    meta: { title: '上传图片' }
  },
]