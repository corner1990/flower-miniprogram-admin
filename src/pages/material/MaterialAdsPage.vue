<template>
  <div class="MaterialAdsPage" ref="ads">
    <Block title="发布资讯">
      <el-button slot="action" type="text">清空</el-button>

      <!-- 选择商品 -->
      <Headline required>选择商品</Headline>
      <SelectProduct />
      <PreviewTitle />

      <!-- 选择头图 -->
      <Headline required="">Banner填充</Headline>
      <Box class="userId" row center left>
        <el-input v-model="userId" placeholder="请输入用户ID" suffix-icon="el-icon-user" @blur="handleInputBlur" size="medium" />
      </Box>
      <PreviewBanner />

      <!-- 文章编辑 -->
      <Headline required="">文章编辑</Headline>
      <Editor />

      <!-- 虚拟机 -->
      <Device :title="title">
        <PreviewTitle />
        <PreviewBanner />
        <PreviewContent />
      </Device>

      <!-- 是否原创 -->
      <div class="original">
        <el-radio v-model="original" :label="1">原创</el-radio>
        <el-radio v-model="original" :label="2">转载</el-radio>
      </div>

      <!-- 提交 -->
      <div class="submit">
        <el-button size="medium" type="primary" icon="el-icon-s-promotion" :loading="loading" :disabled="!valid" @click="handleClickPublish">发布资讯</el-button>
        <el-button size="medium" type="" icon="el-icon-brush" @click="handleClickReset">清空</el-button>
      </div>

    </Block>
  </div>
</template>

<script>
import { Box } from 'vue-raw-ui'
import Block from './components/MaterialAds/Block.vue'
import Headline from './components/MaterialAds/Headline.vue'
import PreviewTitle from './components/MaterialAds/PreviewTitle.vue'
import PreviewBanner from './components/MaterialAds/PreviewBanner.vue'
import Editor from './components/MaterialAds/Editor.vue'
import Device from './components/MaterialAds/Device.vue'
import PreviewContent from './components/MaterialAds/PreviewContent.vue'
import SelectProduct from './components/MaterialAds/SelectProduct.vue'
import { mapState, mapMutations } from 'vuex'
import { getUserList } from './api'
// import uploadDataURL from '../../utils/uploadDataURL'
// import { Loading } from 'element-ui'

export default {
  name: 'MaterialAdsPage',
  components: {
    Box,
    Block,
    Headline,
    PreviewTitle,
    PreviewBanner,
    Editor,
    Device,
    PreviewContent,
    SelectProduct
  },
  data(){
    return {
      userId: ''
    }
  },
  methods: {
    ...mapMutations('material/ads', ['updateUserInfo', 'reset']),
    async handleInputBlur(){
      const {errorCode, data} = await getUserList({
        search_user_id: this.userId*1
      })
      if(errorCode === 0){
        const userInfo = data.user_list[0]
        this.updateUserInfo(userInfo)
      }
    },
    async handleClickPublish(){
      // const loading = Loading.service({ target: this.$refs.ads.$el })
      this.$store.dispatch('material/ads/publish')
    },
    handleClickReset(){
      this.reset()
      this.userId = ''
    }
  },
  computed: {
    ...mapState('material/ads', {
      title: state=>state.product.selectedInfo.name
    }),
    ...mapState('material/ads', [ 'loading', 'banner', 'product', 'contentHtml', 'userInfo']),
    original: {
      get(){
        return this.$store.state.material.ads.original
      },
      set(val){
        this.$store.commit('material/ads/updateOriginal', val)
      }
    },
    valid(){
      if(this.product.selectedInfo && this.banner.title && this.banner.background && this.contentHtml && this.userInfo.userBaseInfo){
        return true
      }else {
        return false
      }
    },
  }
}
</script>

<style lang="less" scoped>
.submit {
  margin: 20px 0;
}
.userId {
  width: 180px;
  margin-bottom: 10px;
}
</style>
