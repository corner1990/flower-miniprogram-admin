import request from '@/utils/request'
/**
 * @desc 获取
 */
export const getOssSign =  () => request.get('/api/system/aliyun/getOssSign')