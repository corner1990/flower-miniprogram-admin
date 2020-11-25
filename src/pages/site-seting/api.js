import request from '@/utils/request'
// 更新配置表
export const getSystemConfigList = params => request.post('/api/admin/SystemConfigAdmin/getSystemConfigList', params)

// 更新
export const updateConfigValue = params => request.post('/api/admin/SystemConfigAdmin/updateConfigValue', params)



