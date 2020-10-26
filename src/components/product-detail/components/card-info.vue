<template>
  <div class="card-info">
   <div class="box-card flex">
      <h3 class="card-title">配送区域</h3>
      <div class="text item">
        亲选择配送区域
        <i class="el-icon-arrow-down"></i>
      </div>
    </div>
    <div class="box-card flex">
      <h3 class="card-title">送达时间</h3>
      <div class="text item">
        {{ time }}
        <i class="el-icon-arrow-down"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { dateFormat } from '@/utils/utils'
export default {
  name: 'card-info',
  props: {
    msg: String
  },
  computed: {
    time() {
      let t = new Date
      return dateFormat(t, 'YYYY.mm.dd')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import url('../../../less/main.less');
.card-info{
  padding: 12px;
  .box-card{
    padding: 10px;
    box-shadow: 0 0 8px #e4e4e4;
    border-radius: 4px;
    margin-bottom: 12px;
    &:last-child{
      margin-bottom: 0;
    }
    justify-content: space-between;
     font-size: @font-size-xs;
    .card-title{
      font-size: @font-size-sm;
    }
  }
}
</style>
