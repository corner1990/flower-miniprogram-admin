import { getProductList } from '../../pages/product/api'
import { sendNewsInfo } from '../../pages/material/api'
import { Message } from 'element-ui'
// import uploadDataURL from '../../utils/uploadDataURL'

export default {
  namespaced: true,
  state: {
    product: {
      index: null, // 当前选中的索引值
      list: [], // 搜索结果选项
      selectedInfo: {}
    },
    banner: {
      title: '',
      background: ''
    },
    contentHtml: '',
    loading: false,
    original: 1,
    authorId: '',
    userInfo: {
      userBaseInfo: null
    }
  },
  getters: {
    newsInfo: state => ({
      title: state.banner.title,
      content: state.contentHtml,
      // outside_link: '', // 虚位以待
      main_image: state.banner.background,
      sku_id: state.product.selectedInfo.id,
      author_id: state.userInfo.userBaseInfo ? state.userInfo.id : '',
      // star_id: 1, //虚位以待
      is_original: state.original // 原创1 否0
    })
  },
  mutations: {
    updateProductIndex(state, payload) {
      state.product.index = payload
      state.product.selectedInfo = state.product.list[payload] || {}
    },
    updateProductList(state, payload) {
      state.product.list = payload
    },
    updateProductSelected(state, payload) {
      state.product.selectedInfo = payload
    },
    updateBannerTitle(state, payload) {
      state.banner.title = payload
    },
    updateBannerBackground(state, payload) {
      state.banner.background = payload
    },
    updateContentHtml(state, payload) {
      state.contentHtml = payload
    },
    updateOriginal(state, payload) {
      state.original = payload
    },
    updateUserInfo(state, payload) {
      state.userInfo = payload
    },
    reset(state) {
      state.product = {
        index: null, // 当前选中的索引值
        list: [], // 搜索结果选项
        selectedInfo: {}
      }
      state.banner = {
        title: '输入一些炫酷的标题，吸引用户不自觉地无法克制地点击',
        background: ''
      }
      state.contentHtml = ''
      state.loading = false
      state.original = 1
      state.userInfo = {
        userBaseInfo: null
      }
    },
    // async filterContentHtml(state){
    //   let html = state.contentHtml
    //   const match = html.match(/"data:image.*?"/g)

    //   if(match){
    //     for(let i=0;i<match.length;i++){
    //       const item = match[i].toString()
    //       const url = await uploadDataURL(item, 'ipxmall/ads/')
    //       html = html.replace(item, url)
    //     }
    //     state.contentHtml = html
    //   }
    //   return true
    // }
  },
  actions: {
    async searchAdsProduct({ commit }, keywords) {
      const { errorCode, data } = await getProductList({
        publish_type: 1,
        index: 0,
        name: keywords
      })

      if (errorCode === 0) {
        commit('updateProductList', data.product_item_list)
      }
    },
    async publish({getters, state}){
      // dataURL转文件并上传到OSS
      // let html = state.contentHtml
      // const match = html.match(/"data:image.*?"/g)

      // if(match){
      //   for(let i=0;i<match.length;i++){
      //     const item = match[i].toString()
      //     const url = await uploadDataURL(item, 'ipxmall/ads/')
      //     html = html.replace(item, url)
      //   }
      //   state.contentHtml = html
      // }

      state.loading = true
      const { errorCode } = await sendNewsInfo(getters.newsInfo)
      state.loading = false
      if(errorCode===0){
        Message.success('发布成功')
      }
    }
  }
}
