<template>
  <div class="orders-search">
    <el-form :inline="true" :model="info" class="demo-form-inline">
      <el-form-item label="订单号">
        <el-input v-model="info.order_sn" placeholder="订单号"></el-input>
      </el-form-item>
      <el-form-item label="送货日期">
         <el-date-picker
          v-model="info.date"
          align="right"
          type="date"
          placeholder="选择日期"
          value-format="yyyyMMdd"
          :picker-options="pickerOptions">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">筛选</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
let today = new Date()
export default {
  name: 'product-search',
  props: {
    msg: String
  },
  data() {
    return {
      info: {
        order_sn: '',
        date: today
      },
      resetInfo: {
       order_sn: '',
        date: today
      },
      pickerOptions: {
        // disabledDate(time) {
        //   let mounth = 86400000 * 30
        //   return time.getTime() - mounth > Date.now();
        // },
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date());
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24);
            picker.$emit('pick', date);
          }
        }, {
          text: '一周前',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', date);
          }
        }]
      },
      defaultVal: ''
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
  },
  mounted() {
    let date = today.toLocaleDateString().replace(/\//g, '')
    this.$emit('search', { date }, 'search')
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
