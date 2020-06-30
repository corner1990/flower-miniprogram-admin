<template>
  <div class="search" style="display: none;">
    <el-form :inline="true" :model="info" class="demo-form-inline">
      <el-form-item label="物料类型">
        <el-select v-model="info.order_status" placeholder="物料类型">
          <el-option label="画报" value="1"></el-option>
          <el-option label="超级商品" value="2"></el-option>
          <el-option label="预告" value="3"></el-option>
          <el-option label="新品上架" value="4"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="物料状态">
        <el-select v-model="info.order_status" placeholder="物料状态">
          <el-option label="全部" value=""></el-option>
          <el-option label="待付款" value="10"></el-option>
          <el-option label="已付款" value="20"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="创建者">
        <el-select v-model="info.order_status" placeholder="创建者">
          <el-option label="全部" value=""></el-option>
          <el-option label="待付款" value="10"></el-option>
          <el-option label="已付款" value="20"></el-option>
        </el-select>
      </el-form-item>
     
      <el-form-item label="创建时间">
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
       <el-form-item label="物料名称">
         <el-input placeholder="物料名称" v-model="info.product_name">
          </el-input>    
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">筛选</el-button>
        <el-button type="text" @click="resetSearch">重置筛选条件</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'search',
  props: {
    msg: String
  },
  data() {
    return {
      info: {
        order_sn: '',
        order_status: '',
        group: '',
        status: '',
        price_min:'',
        price_max: '',
        time: '',
        product_name: ''
      },
      resetInfo: {
        order_sn: '',
        order_status: '',
        group: '',
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
.search{
  &{
    padding: 15px;
    background: #fff;
    border-radius: 4px;
  }
}
</style>
