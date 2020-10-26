<template>
  <div class="product-info">
    <div class="info-card">
      <h3 class="info-name">{{info.base_info.product_name}}</h3>
      <p class="info-price">
        <span class="curreny">&yen;</span>
        {{info.base_info.format_sale_price}}
      </p>
    </div>
    <CardList />
    <Detail />
    <About />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import CardList from './card-info'
import Detail from './detail'
import About from './about'
export default {
  name: 'product-info',
  components: {
    CardList,
    Detail,
    About
  },
  computed: {
    ...mapState('product', ['info']),
  },
  mounted() {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import url('../../../less/main.less');
.product-info{
  width: 369px;
  background-color: @white;
  border-radius: 32px 0 0 0;
  min-height: 400px;
  position: relative;
  top: -32px;

  .info-card{
    padding: 16px 16px 12px;
    font-size: @font-size-xs;
    color: @black85;
    border-bottom: 1px solid #eee;
    .info-price{
      margin-top: 6px;
      font-weight: 700;
      font-size: @font-size-md;
    }
    .curreny{
      font-size: @font-size-xs;
    }
  }
}
</style>
