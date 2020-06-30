<template>
  <Box class="PreviewTitle" row alignY="stretch" v-if="info&&info.name">
    <div class="image">
      <img :src="info.product_sku_info[0].main_pic" alt="">
    </div>

    <Box class="info">
      <h4 class="info__title">{{info.name}}</h4>
      <p class="info__desc">{{info.sale}}人已付款，仅剩{{info.stock}}台</p>
      <div class="info__price">￥{{this.price}}</div>
    </Box>
  </Box>
</template>

<script>
import { Box } from 'vue-raw-ui'
import { mapState } from 'vuex'

export default {
  name: 'PreviewTitle',
  components: {
    Box
  },
  computed: {
    ...mapState('material/ads',{
      info: state=>state.product.selectedInfo
    }),
    price(){
      const high = this.info.high_price*1
      const low = this.info.low_price*1
      if(low>=high){
        return high
      }else {
        return low+'起'
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../../../less/main.less';

.PreviewTitle {
  .card();
  box-shadow: 0 2px 4px @shadow-color;
  overflow: hidden;
  padding: 10px;
  box-sizing: border-box;
  width: 460px;
}

.image {
  .size(100px);
  min-width: 100px;
  .fit();
  background: whitesmoke;
  padding: 8px;
  box-sizing: border-box;
  border-radius: 6px;
  overflow: hidden;
  margin-right: 14px;
}

.info {
  flex: 1;

  &__title {
    margin-top: 4px;
  }

  &__desc {
    margin-top: 10px;
    .caption();
    font-size: 14px;
  }

  &__price {
    margin-top: auto;
    margin-left: auto;
    .title();
    color: orangered;
  }
}
</style>
