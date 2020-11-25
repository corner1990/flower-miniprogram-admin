const SiteSeting = () => import(/* webpackChunkName: "site-seting" */ '../pages/site-seting/index')

const SiteSetingRouter = [
  {
    path: '/site-seting',
    name: 'SiteSeting',
    component: SiteSeting,
    meta: {
      title: '站点配置',
      keepAlive: true
    }
  }
]

export default SiteSetingRouter
