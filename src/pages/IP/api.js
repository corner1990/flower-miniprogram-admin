import request from '@/utils/request'

// 获取ip列表
export const getIpList = params => request.post('/api/admin/starAdmin/getStarList', params)

// 获取ip信息
export const getStarInfo = params => request.post('/api/admin/starAdmin/getStarInfo', params)

// 更新ip
export const updateStarInfo = params => request.post('/api/admin/starAdmin/updateStarInfo', params)

// 创建ip
export const saveStar = params => request.post('/api/admin/starAdmin/saveStar', params)

// 中间列表
export const getAwardList = params => request.post('/api/admin/ActivityAdmin/getAwardList', params)

// 快递公司列表
export const getExpessList = params => request.post('/api/admin/orderAdmin/getExpressList', params)

// 发货
export const deliverAward = params => request.post('/api/admin/ActivityAdmin/deliveryAward', params)
