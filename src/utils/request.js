import axios from 'axios';
import router from '../router'
import { Message } from 'element-ui'
let token = {}
let tempToken = window.localStorage.getItem('$_token')
let paths = [
  '/api/admin/IndexAdmin/sendCode',
  '/api/admin/IndexAdmin/verifyLoginCode'
]

if (tempToken) {
  token = JSON.parse(tempToken)
}
const service = axios.create({
  // process.env.NODE_ENV === 'development' 来判断是否开发环境
  // easy-mock服务挂了，暂时不使用了
  // baseURL: 'https://www.easy-mock.com/mock/592501a391470c0ac1fab128',
  timeout: 5000
});

service.interceptors.request.use(
  config => {
    // todo: 需要优化
    if(!token.access_token && /follow\/follow/ig.test(config.url)) {
      let { path, query, params } = router.currentRoute
      window.localStorage.setItem('$_reject', JSON.stringify({ path, query, params }))
      router.replace('/login')
      // removePending(config) //在一个ajax发送前执行一下取消操作
      
      return config
    }
    // 配置token
    if (!paths.includes(config.url)) {
      config.headers.Authorization = 'Bearer ' + token.access_token
    }
    let $userId = window.localStorage.getItem('$user_id')
    
    if (config.data) {
      // eslint-disable-next-line camelcase
      config.data.platform = 'admin'
      config.data['user_id'] = $userId || 0
    }
    if (config.params) {
      // eslint-disable-next-line camelcase
      config.params.platform = 'admin'
      config.params['user_id'] = $userId || 0
    }
    return config;
  },
  error => {
    console.log(error);
    return Promise.reject();
  }
);

service.interceptors.response.use(
  response => {
    
    if (response.status === 200) {
      // 保存常见正常的http状态码   
        let {
          config,
          data: {
            errorCode,
            errorMessage
          }
        } = response
        
        // 登录信息失效  重新登录
        let reLogin = [401, 402]
        if (reLogin.includes(errorCode)) {
          // eslint-disable-next-line no-debugger
          window.localStorage.removeItem('$user_id')
          window.localStorage.removeItem('$_token')
          window.localStorage.removeItem('$_user_info')
          // 保存路由，登陆后重定向到当前界面
          let { path, query, params } = router.currentRoute
          window.localStorage.setItem('$_reject', JSON.stringify({ path, query, params }))
          router.replace('/login')
        }
        if(![0, 401, 402].includes(errorCode)) {
          Message.error({
            message: errorMessage,
            position: 'middle',
            duration: 2000
          })
        } else{
          let reg = /verifyLoginCode/ig

          if(reg.test(config.url)) {
            console.log('response', response)
            token = response.data.data
            window.localStorage.setItem('$_token', JSON.stringify(token))
          }
        }
      return response.data;
    } else {
      Promise.reject();
    }
  },
  error => {
    console.log(error);
    return Promise.reject();
  }
);

export default service;
