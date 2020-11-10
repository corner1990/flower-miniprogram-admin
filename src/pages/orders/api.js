import request from '@/utils/request'
// 订单列表
export const getOrderList = params => request.post('/api/admin/orderAdmin/queryOrderList', params)
// 发货
export const deliverOrder = params => request.post('/api/admin/orderAdmin/deliverOrder', params)
// 关闭订单
export const cancelOrder = params => request.post('/api/admin/orderAdmin/cancelOrder', params)
// 获取快递公司列表
export const getExpressList = params => request.post('/api/admin/orderAdmin/getExpressList', params)