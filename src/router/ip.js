const IPListPage = () => import(/* webpackChunkName: "IPListPage" */'../pages/IP/IPListPage.vue')
export default [
  {
    path: '/ip',
    name: 'ip',
    component: IPListPage,
    meta: { title: 'IP列表' }
  },
  {
    path: '/ipedit',
    name: 'IPEditPage',
    component: () => import(/* webpackChunkName: "IPEditPage" */'../pages/IP/IPEditPage.vue'),
    meta: { title: 'IP信息编辑' }
  },
  {
    path: '/iptag',
    name: 'IPTagPage',
    component: () => import(/* webpackChunkName: "IPTagPage" */'../pages/IP/IPTagPage.vue'),
    meta: { title: 'IP标签' }
  },
  {
    path: '/reward',
    name: 'reward',
    component: () => import(/* webpackChunkName: "reward" */'../pages/IP/reward.vue'),
    meta: { title: '中奖列表' }
  }
]