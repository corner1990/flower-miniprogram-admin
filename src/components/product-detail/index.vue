<template>
  <div class="product-detail">
    <img class="top-img" src="./images/top.jpg" width="375" />
    <img class="product-img" :src="mainImg" />
    <ProductInfo :info="{}" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ProductInfo from'./components/product-info'
export default {
  name: 'product-detail',

  components: {
    ProductInfo
  },
  computed: {
    ...mapState('product', ['info']),
    mainImg() {
      let {
        base_info = {}
      } = this.info
      return base_info.main_image || 'https://ipxcdn.jfshare.com/system/admin/4e41d37a6d2c1ca439edea985d90aa36.jpg'
    }
  },
  mounted() {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import url('../../less/main.less');
.product-detail{
  position: relative;
  z-index: 3;
  width: 375px;
  height: 667px;
  overflow-y: auto;
  overflow-x: hidden;
  background-color: @white;
  border-radius: 12px;
  box-shadow: 0 0 8px 8px #eee;
  &::-webkit-scrollbar {
      width: 6px;
      height: 6px;
  }
  /*滚动区域背景*/     
  &::-webkit-scrollbar-track-piece {
      background-color: @white;
      -webkit-border-radius: 6px;
  }  
  /*竖向滚动条*/      
  &::-webkit-scrollbar-thumb:vertical {
      height: 5px;
      background-color: #eee;
      -webkit-border-radius: 6px;
  }
  /*横向滚动条*/          
  &::-webkit-scrollbar-thumb:horizontal {
    width: 5px;
    background-color: red;
    -webkit-border-radius: 6px;
  }
  .top-img{
    margin: 4px 0;
    width: 369px;
  }
  .product-img{
    width: 369px;
  }
  
}
</style>
