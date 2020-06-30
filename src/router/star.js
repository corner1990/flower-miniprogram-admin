export default [
  {
    path: '/stars',
    component: () => import(/* webpackChunkName: "orders" */ '../pages/star/index.vue'),
    meta: { title: '明星管理' }
  },
]