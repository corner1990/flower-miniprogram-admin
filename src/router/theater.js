export default [
  {
    path: '/theater',
    component: () => import(/* webpackChunkName: "orders" */ '../pages/theater/theater.vue'),
    meta: { title: '日签管理' }
  },
]