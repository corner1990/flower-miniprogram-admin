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
       
         <p>支付金额：&yen; {{ info.order_base_info.pay_price - 0 }} 
           （含运费&yen; {{info.order_base_info.shipping_price}}）
           </p>
        <p>微信支付</p>
      </div>
      <!-- <el-button type="text">备注</el-button> -->
    </div>
    <div class="orders-info-content flex">
      <div class="flex">
        <div
          v-for="(item, key) in info.order_product_list"
          :key="key"
          class="product-wrap"
          @click="showDetailFn(item)"
        >
          <img class="img" :src="item.main_image" alt="" srcset="">
          <div class="box" style="margin-left: 10px;">
            <p>{{item.product_name}}</p>
          </div>
        </div>
      </div>
      <div class="box receiver">
        <p>{{info.order_base_info.receiver}} {{info.order_base_info.phone}}</p>
        <p>
          {{info.order_base_info.province}}
          {{info.order_base_info.city}}
          {{info.order_base_info.area}}
          {{info.order_base_info.address}}
        </p>
      </div>
     
      <div class="box">
        <p>商品数量：{{info.order_product_list[0].count }} </p>
      </div>
      <div class="box">
        <p>
          <el-tag :type="tags[info.order_base_info.order_status] || ''">{{ info.order_base_info.order_status | initStatus }}</el-tag>
        </p>
      </div>
      <div>
        <el-button type="text" @click="dirverVisible = true" v-if="status === 20">发货</el-button>
        <!-- <el-button type="text" @click="cancelCurrOrder" v-show="canCanel">关闭订单</el-button> -->
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
    <el-dialog
      title="商品详情"
      :visible.sync="showDetail"
      width="600px">
      <div class="detail-info">
         <img class="product-img" :src="detail.main_image" alt="product-img" srcset="">
          <div class="box" style="margin-left: 10px;">
            <h3>{{detail.product_name}}</h3>
          </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="showDetail = false">确 定</el-button>
      </span>
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
      /**
       * OrderStateDeleted = 0,  //已删除   （左：无，右：无）
        OrderStateWaitPay = 10,  //待付款（左：取消，右：去支付）
        
        OrderStatePayed = 20,   //已付款       （左：无，右：催发货）
        OrderStateWaitShip = 30,    //待发货  （左：无，右：催发货）
        OrderStateWaitRecv = 40,    //待收货 （左：查看物流，右：确认收货）
        
        OrderStateDone = 50,  //交易完成       （左：无，右：删除订单）
        OrderStateClose = 60,   //交易关闭     （左：无，右：删除订单）
        OrderStateWaitReview = 70,   //待评价（左：删除订单，右：去评价）
        OrderStateReviewed = 80,    //已评价  （左：删除订单，查看评价）
        */
      tags: {
        '10': 'info',
        '20': 'warning',
        '30': 'warning',
        '40': 'warning',
        '50': 'success',
        '60': 'info',
        '70': 'success',
        '80': 'success'
      },
      showDetail: false,
      detail: {}
    }
  },
  computed: {
    spec() {
      let arr = this.info.order_product_list[0].product_specifications || []
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
    },
    showDetailFn(info) {
      this.showDetail = true
      this.detail = info
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
  .product-wrap{
    margin-right: 8px;
    width: 100px;
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
.detail-info{
  .product-img{
    max-height: 500px;
    max-width: 550px;
    object-fit: cover;
  }
}
</style>
