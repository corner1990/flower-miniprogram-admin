import request from '@/utils/request'

// 获取star列表
export const getStarIpList = params => request.post('/api/admin/productAdmin/searchStarIpList', params)

// 发布资讯
export const sendNewsInfo = params => request.post('/api/admin/feedAdmin/sendNewsInfo', params)

// 获取用户
export const getUserList = params => request.post('/api/admin/UserAdmin/getUserList', params)

//获取商品列表
export const getProductList = params => request.post('/api/admin/ProductAdmin/searchProductSkuList', params)

//获取超级商品列表
export const getSuperProductList = params => request.post('/api/admin/ProductAdmin/searchSuperProductSkuList', params)

//发布物料c
export const createStarMaterielFeed = params => request.post('/api/admin/FeedGeneratorAdmin/createStarMaterielFeed', params)

//传文件到OSS
export const uploadOssFileURL = '/api/admin/OssFileUploadAdmin/uploadOssFile'
export const uploadOssFile = params => request.post(uploadOssFileURL, params)

// 获取feed列表
export const getAllFeedList = params => request.post('/api/admin/FeedAdmin/getAllFeedList', params)

// 审核feed
export const auditFeed = params => request.post('/api/admin/feedAdmin/auditFeed', params)

// 视频凭证
export const auditMedia = params => request.post('/api/system/media/createUploadVideo', params)
