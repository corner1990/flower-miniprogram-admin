/**
 * @desc 商品相关
 */
export default {
  namespaced: true,
  state: {
    info: {},
    showDetail: false
  },
  getters: {

  },
  mutations: {
    /**
     * @des 设置
     * @param {*} state 
     * @param {*} payload 
     */
    update(state, payload) {
      let { val, key } = payload
      state[key] = val
    },
    
  },
  actions: {
    
  }
}
