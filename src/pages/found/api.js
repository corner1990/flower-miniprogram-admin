import request from '@/utils/request'
// banner列表
export const getIndexBannerList = params => request.post('/api/admin/feedAdmin/getFeedList', params)

// 创建banner
export const createBanner = params => request.post('/api/admin/feedAdmin/createFeed', params)

// 删除banner
export const deleteBanner = params => request.post('/api/admin/feedAdmin/deleteFeed', params)

// 编辑Banner
export const updateBanner = params => request.post('/api/admin/BannerAdmin/updateBanner', params)

