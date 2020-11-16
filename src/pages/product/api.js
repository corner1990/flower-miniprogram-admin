import request from '@/utils/request'
// 商品列表
export const getProductList = params => request.post('/api/admin/ProductAdmin/getProductItemList', params)
// 获取商品详情
// export const getProductDetail = params => request.post('/api/admin/ProductAdmin/getProductItemDetail', params)
export const getProductDetail = params => request.post('/api/admin/ProductAdmin/getProductItemDetail', params)
// 创建商品
export const createProduct = params => request.post('/api/admin/productAdmin/createProductItem', params)
// 批量上/下架商品
export const operateProduct = params => request.post('/api/admin/productAdmin/updateProductPublishStatus', params)
// 删除商品item
export const deleteProduct = params => request.post('/api/admin/ProductAdmin/deleteProduct', params) //弃用 改用operateProduct
// 创建商品item
export const createProductItem = params => request.post('/api/admin/ProductAdmin/CreateProductItem', params)
// 获取品牌列表
export const getProductBrandList = params => request.post('/api/admin/ProductAdmin/getProductBrandList', params)
// 编辑商品item
export const updateProductSkuInfo = params => request.post('/api/admin/productAdmin/updateProductItem', params)
// 获取品牌列表
export const getProductCategoryList = params => request.post('/api/admin/ProductAdmin/getProductCategoryList', params)
export const getOssSign =  () => request.get('/api/system/aliyun/getOssSign')
// 获取star列表
export const getStarIpList = params => request.post('/api/admin/productAdmin/searchStarIpList', params)


