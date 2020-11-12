<template>
  <div class="data-table">
    
    <el-table
      :data="list"
      class="table"
      style="width: 100%">
      <el-table-column
        label="鲜花"
        width="160">
        <template slot-scope="scope">
          <img class="img" :src="scope.row.main_image" alt="" srcset="">
          <p>{{scope.row.product_name}}</p>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="包月鲜花"
        width="120">
        <template slot-scope="scope">
         <p>{{scope.row.week_num}}</p>
        </template>
      </el-table-column>
      <el-table-column
        label="送货地址"
        width="200"
      >
        <template slot-scope="scope">
          <div class="reciver">
            <p class="info">{{ scope.row.receiver }} &emsp; {{ scope.row.phone}}</p>
            <p>
              {{ scope.row.province }}
              {{ scope.row.city }}
              {{ scope.row.area }}
              {{ scope.row.address }}

            </p>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="祝福卡">
        <template slot-scope="scope">
          <div class="bless">
            {{ scope.row.remark ? scope.row.remark : '暂无留言信息'}}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="address"
        label="配送时间">
        <template slot-scope="scope">
          <div class="delivery">
            <p class="info">{{ scope.row.delivery_timestamp | formTime}}</p>
            <p></p>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="address"
        label="配送状态">
        <template slot-scope="scope">
          <div class="reciver">
            <el-tag type="success" v-show="scope.row.delivery_timestamp">已发货</el-tag>
            <el-tag v-show="!scope.row.delivery_timestamp">未发货</el-tag>
            <p></p>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="是否匿名">
        <template slot-scope="scope">
          <div class="anonymous">
            <p class="info">{{ scope.row.anonymous_status ? '是' : '否'}}</p>
            <p></p>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
         <el-button @click="dirver(scope.row)" v-show="!scope.row.delivery_timestamp">发货</el-button>
         <el-button v-show="scope.row.delivery_timestamp" disabled>已发货</el-button>
        </template>
      </el-table-column>
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
        if (info) {
          return this.$emit('dirver', info)
        }
        let { errorCode } = await deliverOrder(info)
        if (errorCode === 0) {
          this.$message({
          message: '发获成功',
          type: 'success'
        });
          this.$emit('dirver', info)
        }
      }
  },
  filters: {
    formTime(t) {
      t = new Date(t * 1000)
      return dateFormat(t)
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
}
.img{
  max-width: 150px;
  max-height: 150px;
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
