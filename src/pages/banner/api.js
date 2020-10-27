import request from '@/utils/request'
// banner列表
export const getIndexBannerList = params => request.post('/api/admin/BannerAdmin/getIndexBannerList', params)

// 创建banner
export const createBanner = params => request.post('/api/admin/BannerAdmin/createBanner', params)

// 删除banner
export const deleteBanner = params => request.post('/api/admin/BannerAdmin/deleteBanner', params)

// 编辑Banner
export const updateBanner = params => request.post('/api/admin/BannerAdmin/updateBanner', params)

