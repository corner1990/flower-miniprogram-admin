<template>
  <div class="orders-search">
    <el-form :inline="true" :model="info" class="demo-form-inline">
      <el-form-item label="订单号">
        <el-input v-model="info.order_sn" placeholder="订单号"></el-input>
      </el-form-item>
      
      <el-form-item label="付款方式" class="search_condition">
        <el-select v-model="info.pay_type" placeholder="付款方式">
          <el-option label="全部" value=""></el-option>
          <el-option label="支付宝" value="1"></el-option>
          <el-option label="微信" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="下单时间">
         <el-date-picker
          v-model="info.time"
          value-format="timestamp"
          type="datetimerange"
          :picker-options="pickerOptions"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          align="right">
        </el-date-picker> 
      </el-form-item>
      <br />


      <el-form-item>
        <el-button type="primary" @click="onSubmit">筛选</el-button>
        <el-button type="text" @click="resetSearch">重置筛选条件</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'product-search',
  props: {
    msg: String
  },
  data() {
    return {
      info: {
        order_sn: '',
        order_status: '',
        pay_type: '',
        status: '',
        price_min:'',
        price_max: '',
        time: '',
        product_name: ''
      },
      resetInfo: {
        order_sn: '',
        order_status: '',
        pay_type: '',
        status: '',
        price_min:'',
        price_max: '',
        time: ''
      },
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      }
    }
  },
  methods: {
    onSubmit() {
      this.$emit('search', this.info, 'search')
    },
    resetSearch() {
      this.info = this.resetInfo
      this.$emit('search', this.info, 'reset')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.orders-search{
  &{
    background: #fff;
    padding: 10px 15px;
  }
  .price-wrap{
    display: flex;
  }
  .el-form-item{
    margin-bottom: 10px;
  }
}

.search_condition{
  margin-left: 72px;
}
</style>
