<template>
  <div class="data-table">
    
    <el-table
      :data="list"
      class="table"
      :stripe="true"
      style="width: 100%">
      <el-table-column
        label="订单商品"
        width="170">
        <template slot-scope="scope">
          <div class="product-wrap">
            <div
              v-for="(info, key) in scope.row.order_product_list"
              :key="key"
              class="product"
            >
              <img class="img" :src="info.main_image" alt="" srcset="">
              <p>{{info.product_name}} * {{info.count}} </p>
            </div>
          </div>
        </template>
      </el-table-column>
      <!-- <el-table-column
        prop="name"
        label="订单类型"
        width="80">
        <template slot-scope="scope">
       
        </template>
      </el-table-column> -->
      <el-table-column
        label="收货地址"
        width="200"
      >
        <template slot-scope="scope">
          <div class="reciver">
            <p class="info">{{ scope.row.order_base_info.receiver }} &emsp; {{ scope.row.order_base_info.phone}}</p>
            <p>
              {{ scope.row.order_base_info.province }}
              {{ scope.row.order_base_info.city }}
              {{ scope.row.order_base_info.area }}
              {{ scope.row.order_base_info.address }}

            </p>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="祝福卡"
        >
        <template slot-scope="scope">
          <div class="bless">
            {{ scope.row.order_base_info.remark ? scope.row.order_base_info.remark : '暂无留言信息'}}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="address"
        label="配送信息">
        <template slot-scope="scope">
          <div class="delivery">
            配送状态：
            <el-tag
              type="success"
              v-if="scope.row.order_base_info.order_status >= 40"
            >已发货</el-tag>
            <el-tag type="warning" v-else>未发货</el-tag>
            <p class="info">期望配送时间：{{ scope.row.order_base_info.expected_time}}</p>
            <p class="info">匿名配送： {{ scope.row.order_base_info.anonymous_status ? '是' : '否'}}</p>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="detail"
        label="订单信息">
        <template slot-scope="scope">
          <div class="delivery">
            <p class="info">订 单 号：{{ scope.row.order_base_info.order_sn}}</p>
            <p class="info">支付价格：&yen;{{ scope.row.order_base_info.pay_price}}</p>
            <p class="info">下单时间： {{ scope.row.order_base_info.created_timestamp | formTime}}</p>
            <p>订单类型： {{scope.row.order_base_info.product_type === 2 ? '礼品鲜花' : '包月鲜花'}}</p>
          </div>
        </template>
      </el-table-column>
      <!-- <el-table-column
        align="center"
        prop="address"
        label="配送状态">
        <template slot-scope="scope">
          <div class="reciver">
           
          </div>
        </template>
      </el-table-column> -->
      <!-- <el-table-column
        align="center"
        label="是否匿名">
        <template slot-scope="scope">
          <div class="anonymous">
            <p class="info">{{ scope.row.anonymous_status ? '是' : '否'}}</p>
          </div>
        </template>
      </el-table-column> -->
      <!-- <el-table-column
        align="center"
        label="操作">
        <template slot-scope="scope">
         <el-button @click="dirver(scope.row)" v-show="!scope.row.delivery_timestamp">发货</el-button>
         <el-button v-show="scope.row.delivery_timestamp" disabled>已发货</el-button>
        </template>
      </el-table-column> -->
    </el-table>
  </div>
</template>

<script>
import { dateFormat } from '@/utils/utils'
import { deliverOrder } from '../../orders/api';

export default {
  name: 'data-table',
  props: {
      list: {
        type: Array,
        default() {
            return []
        }
      }
  },
  data() {
    return {
        query: {
          address: '',
          name: '',
          pageIndex: 1,
          pageSize: 10
        },
        tableData: [],
        multipleSelection: [],
        delList: [],
        editVisible: false,
        pageTotal: 0,
        form: {},
        idx: -1,
        id: -1
    };
    },
    created() {
    },
    methods: {
      // 删除操作
      handleDelete(index) {
        // 二次确认删除
        this.$confirm('确定要删除吗？', '提示', {
            type: 'warning'
        })
            .then(() => {
                this.$message.success('删除成功');
                this.tableData.splice(index, 1);
            })
            .catch(() => {});
      },
      async dirver(info) {
        
        let { errorCode } = await deliverOrder(info)
        if (errorCode === 0) {
          this.$message({
          message: '发获成功',
          type: 'success'
        });
          this.$emit('dirver', {...info, delivery_timestamp: new Date().getTime()})
        }
      }
  },
  filters: {
    formTime(t) {
      if(!t) {
        return '暂无'
      }
      t = new Date(t * 1000)
      return dateFormat(t, 'YYYY-mm-dd HH:MM')
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

.data-table{
  max-height: calc(100vh - 260px);
  overflow: auto;
  .el-table {
    th{
      background-color: #00b799 !important;
    }
  }
  .delivery{
    .info{
      line-height: 28px;
    }
  }
}
.product-wrap{
  display: flex;
  flex-wrap: wrap;
  .product{
    text-align: center;
    margin-right: 10px;
  }
  .img{
    max-width: 150px;
    max-height: 150px;
  }
}

.no-data{
  padding: 200px;
  color: #00b799;
  text-align: center;
}
</style>
<style lang="less">
.el-table__expanded-cell[class*=cell]{
  padding: 10px
}
.data-table{
  .el-table {
    th{
      background-color: #00b799 !important;
      color: #fff;
    }
  } 
}
</style>
