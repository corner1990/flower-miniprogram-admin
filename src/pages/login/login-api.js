import request from '@/utils/request'
/**
 * @desc 登录接口
 * @param {*} params 
 */
export const verifiyLogin = (params) => request.post('/api/admin/IndexAdmin/sendCode', params)
/**
 * @desc 退出登录
 * @param {*} params 
 */
export const logout = (params) => request.post('/api/admin/IndexAdmin/logout', params)
/**
 * @desc 验证验证码
 * @param {*} params 
 */
export const verifyLoginCode = (params) => request.post('/api/admin/IndexAdmin/verifyLoginCode', params)
/**
 * @desc 获取用户信息
 * @param {*} params 
 */
export const getUserInfo =  (params) => request.get('/api/user/user/getUserInfo', params)
// 管理后台登录
export const adminAccountLogin =  (params) => request.post('/api/admin/adminAccount/adminAccountLogin', params)