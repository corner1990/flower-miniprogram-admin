<template>
  <div class="orders-info-card">
    <div class="orders-info-header flex">
      <div class="flex box-left">
        <p>
          订单号： {{ info.order_base_info.order_sn }}
          <el-popover
            placement="top"
            title="外部订单号"
            width="200"
            trigger="click"
            v-show="info.order_base_info.payment_trade_no"
            :content="info.order_base_info.payment_trade_no"
          >
            <el-button type="text" slot="reference">更多</el-button>
          </el-popover>
          
        </p>
        <P class="order-time">下单时间： {{info.order_base_info.created_timestamp | formTime}}</P>
        <!-- <el-table-column prop="receiver" label="买家/收货人">
            <span slot-scope="scope">{{ scope.row.order_base_info.receiver }}</span>
        </el-table-column>
        <el-table-column label="实付金额(元)" align="center">
            <span slot-scope="scope">{{ scope.row.order_base_info.total_price }}</span>
        </el-table-column>

        <el-table-column prop="pay_timestamp" label="下单时间">
            <span slot-scope="scope">{{ scope.row.order_base_info.created_timestamp | formTime }}</span>
        </el-table-column> -->
         <p>支付金额：&yen; {{ info.order_product_info.total_price - 0 }} 
           （含运费&yen; {{info.order_product_info.shipping_price}}）
           </p>
        <p>{{ info.pay_type }}</p>
      </div>
      <!-- <el-button type="text">备注</el-button> -->
    </div>
    <div class="orders-info-content flex">
      <div class="flex" style="min-width: 300px;">
        <img class="img" :src="info.order_product_info.product_main_pic" alt="" srcset="">
        <div class="box" style="margin-left: 10px;">
          <p>{{info.order_product_info.product_name}}</p>
          <p>规格：{{ spec }}</p>
        </div>
      </div>
      <div class="box receiver">
        <!-- <p>{{info.order_user_info.nick_name}}</p> -->
        <p>{{info.order_base_info.receiver}} {{info.order_base_info.phone}}</p>
        <p>
          {{info.order_base_info.province}}
          {{info.order_base_info.city}}
          {{info.order_base_info.area}}
          {{info.order_base_info.address}}
        </p>
      </div>
      <div class="box" v-if="info.order_base_info.express_company">
        <p>快递公司：{{info.order_base_info.express_company}}</p>
        <p>快递单号： {{info.order_base_info.express_no}}</p>
      </div>
      <div class="box">
        <p>商品数量： {{info.order_product_info.count}}</p>
      </div>
      <div class="box">
        <p>
          <el-tag :type="tags[info.order_base_info.order_status] || ''">{{ info.order_base_info.order_status | initStatus }}</el-tag>
        </p>
      </div>
      <div>
        <el-button type="text" @click="dirverVisible = true" v-if="status === 20">发货</el-button>
        <el-button type="text" @click="cancelCurrOrder" v-show="canCanel">关闭订单</el-button>
      </div>
    </div>
    <el-dialog title="发货" :visible.sync="dirverVisible" width="30%">
      <el-form :model="form" :rules="rules" ref="driverForm" class="driverForm" id="driverForm">
        <el-form-item label="快递公司" :label-width="formLabelWidth" prop="express_company">
          <el-select v-model="form.express_company" placeholder="请选择快递公司"
          style="width: 100%"
          >
            <el-option
              v-for="key in Object.keys(express)"
              :key="key"
              :label="express[key]"
              :value="key"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="快递单号" :label-width="formLabelWidth" prop="express_no">
          <el-input v-model="form.express_no" autocomplete="off" placeholder="请输入快递单号"></el-input>
        </el-form-item>
        
      </el-form>
      <div class="btn-wrap">
        <el-button type="primary" @click="deliverInput">发货</el-button>
        <el-button @click="closeDriver">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { deliverOrder, cancelOrder } from '../api'
import { dateFormat } from '@/utils/utils'
export default {
  name: 'orders-info-card',
  props: {
    info: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      status: 0,
      dirverVisible: false,
      form: {
        express_company: '',
        express_no: ''
      },
      formLabelWidth: '80px',
      rules: {
        express_company: [
          { required: true, message: '请选择快递公司', trigger: 'blur' }
        ],
        express_no: [
          { required: true, message: '请选输入快递单号', trigger: 'blur' }
        ]
      },
      tags: {
        '10': '',
        '20': 'warning',
        '30': 'warning',
        '40': 'warning',
        '50': 'success',
        '60': 'info',
        '70': 'success',
        '80': 'success'
      }
    }
  },
  computed: {
    spec() {
      let arr = this.info.order_product_info.product_specifications || []
      return arr.map(item => item.attr).join(';')
    },
    canCanel() {
      return this.status === 10
    },
    // 快递公司
    express() {
      let data = window.sessionStorage.getItem('$expressList')
      if (!data) return {}
      return JSON.parse(data)
    }
  },
  filters: {
    initStatus(value) {
      let obj = {
        '10': '待付款',
        '20': '已付款',
        '30': '待发货',
        '40': '待收货',
        '50': '交易完成',
        '60': '交易关闭',
        '70': '待评价',
        '80': '已评价'
      }
      if(/[0-9]/.test(value)) return obj[value]
      return ''
    },
    formTime(t) {
      t = new Date(t * 1000)
      return dateFormat(t)
    }
  },
  methods: {
    async deliverProduct() {
      let { info, form } = this

      let { errorCode } = await deliverOrder({ order_id: info.order_base_info.id, ...form })
      if (errorCode === 0) {
        this.$message({
          message: '发货成功！',
          type: 'success'
        })
        this.status = 40
        this.closeDriver()
      }
    },
    async cancelCurrOrder() {
      let { info } = this
      let { errorCode } = await cancelOrder({order_id: info.order_base_info.id})
      if (errorCode === 0) {
        this.$message({
          message: '取消订单成功！',
          type: 'success'
        })
        this.status = 60
      }
    },
    /**
     * @des 输入快递信息
     */
    deliverInput() {
      this.$refs.driverForm.validate(valid => {
        if (valid) {
            this.deliverProduct()
          } else {
            console.log('error submit!!');
            return false;
          }
      })
    },
    /**
     * @desc 关闭发货弹窗
     */
    closeDriver() {
      this.form = {
        express_company: '',
        express_no: ''
      }
      this.dirverVisible = false
    }
  },
  mounted() {
    this.status = this.info.order_base_info.order_status
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import url('../../../less/main.less');
.orders-info-header{
  justify-content: space-between;
  background: @color-brand ;
  border-bottom: 1px solid @color-brand;
  height: 36px;
  padding: 0 20px;
  color: #fff;
  .box-left{
    font-size: 14px;
    justify-content: space-between;
    align-items: center;
    p {
      margin-right: 80px;
    }
  }
}
.orders-info-card{
  // border: 1px solid @color-brand;
  margin-bottom: 10px;
  .flex{
    display: flex;
  }
  
  .orders-info-content{
    padding: 6px;
    font-size: 14px;
    justify-content: space-between;
    
    .img{
      width: 100px;
      height: 100px;
    }
    .box{
      max-width: 220px;
      padding: 0 10px;
      margin-right: auto;
    }
    .receiver{
      min-width: 300px;
    }
  }
}
.el-dialog {
  .btn-wrap{
    display: flex;
    justify-content: center;
  }
}
</style>
