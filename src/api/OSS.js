import request from '../utils/request'

export const getOssSign =  () => request.get('/api/system/aliyun/getOssSign')