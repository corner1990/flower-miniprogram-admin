const Orders = () => import('../pages/orders')
const Calenar = () => import('../pages/calendar')
const OrdersRoutes = [
  {
    path: '/orders/index',
    name: 'orders',
    component: Orders,
    meta: {
      title: '商品管理',
      keepAlive: true
    },
    
  },
  {
    path: '/calendar/index',
    name: 'Calenar',
    component: Calenar,
    meta: {
      title: '送花日历',
      keepAlive: true
    },
    
  }
]

export default OrdersRoutes
