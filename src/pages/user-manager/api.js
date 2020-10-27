import request from '@/utils/request'
// 用户列表
export const getUserList = params => request.post('/api/admin/UserAdmin/getUserList', params)



