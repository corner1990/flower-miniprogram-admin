<template>
  <div class="SelectProduct">
    <el-select
      v-model="value"
      filterable
      placeholder="请选择或搜索对应商品"
      class="select"
      no-data-text="请输入商品关键词"
      remote
      :remote-method="handleSearchInput"
      clearable
      size="medium"
    >
      <el-option v-for="(item,index) in product.list" :key="index" :label="item.name" :value="index"></el-option>
    </el-select>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'SelectProduct',
  data() {
    return {
      // value: ''
    }
  },
  methods: {
    handleSearchInput(keywords){
      this.$store.dispatch('material/ads/searchAdsProduct', keywords)
    }
  },
  computed: {
    ...mapState('material/ads',{
      product: state=>state.product
    }),
    value: {
      get(){
        return this.$store.state.material.ads.product.index
      },
      set(payload){
        this.$store.commit('material/ads/updateProductIndex', payload)
      }
    }
  },
  mounted(){
    this.$store.dispatch('material/ads/searchAdsProduct')
  }
}
</script>

<style lang="less" scoped>
.SelectProduct {
  margin-bottom: 10px;
}
</style>
