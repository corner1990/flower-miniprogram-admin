import request from '@/utils/request'
// 剧场列表
export const getShowList = params => request.post('/api/admin/theatreAdmin/getShowList', params)
// 删除
export const deleteTheatre = params => request.post('/api/admin/theatreAdmin/deleteTheatre', params)
// 商品列表
export const saveTheatre = params => request.post('/api/admin/theatreAdmin/saveTheatre', params)