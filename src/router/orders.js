const Orders = () => import('../pages/orders')
const OrdersRoutes = [
  {
    path: '/orders/index',
    name: 'orders',
    component: Orders,
    meta: {
      title: '商品管理',
      keepAlive: true
    },
    
  }
]

export default OrdersRoutes
