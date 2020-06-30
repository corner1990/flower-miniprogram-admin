<template>
  <div class="data-table">
    <el-table
        :data="tableData"
        max-height="550"
        border
        class="table"
        ref="multipleTable"
        header-cell-class-name="table-header"
        @selection-change="handleSelectionChange"
    >
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <!-- <el-table-column prop="id" label="ID" width="55" align="center"></el-table-column> -->
        <el-table-column prop="name" label="商品名称">
          <template slot-scope="scope">

              <el-row>
                <el-col :span="12">
                  <el-image
                      class="table-td-thumb"
                      :src="scope.row.product_sku_info[0] && scope.row.product_sku_info[0].main_pic || ''"
                      :preview-src-list="[scope.row.product_sku_info[0] && scope.row.product_sku_info[0].main_pic]"
                  ></el-image>
                </el-col>
                <el-col :span="12">
                  {{ scope.row.product_sku_info[0] && scope.row.product_sku_info[0].product_name || '' }}
                </el-col>
              </el-row>
            </template>
        </el-table-column>
        <el-table-column label="价格">
            <template slot-scope="scope">￥{{scope.row | formatPrice}}</template>
        </el-table-column>
        <el-table-column prop="stock" label="库存"></el-table-column>
        <el-table-column label="销量" align="center">
            <template slot-scope="scope">
                <el-tag
                  type="success"
                >{{scope.row.sale}}</el-tag>
            </template>
        </el-table-column>

        <el-table-column prop="created_timestamp" label="创建时间">
          <template slot-scope="scope">
                <el-tag
                  type="info"
                >{{scope.row.created_timestamp | dateFormat}}</el-tag>
            </template>
        </el-table-column>
        <el-table-column label="状态" align="center">
            <template slot-scope="scope">
                <p>{{scope.row.published_status === 1 ? '上架' : '下架'}}</p>
            </template>
        </el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-button
              type="text"
              icon="el-icon-edit"
              v-show="scope.row.published_status !== 1"
              @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button>
            <el-button
              type="text"
              icon="el-icon-edit"
              v-show="scope.row.published_status !== 1"
              @click="operation(scope.$index, scope.row)"
            >上架</el-button>
            <el-button
              type="text"
              icon="el-icon-edit"
              v-show="scope.row.published_status === 1"
              @click="operation(scope.$index, scope.row)"
            >下架</el-button>
            <!-- <el-button
              type="text"
              icon="el-icon-delete"
              class="red"
              @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button> -->
          </template>
        </el-table-column>
    </el-table>

  </div>
</template>

<script>
import { dateFormat, formatPrice } from '@/utils/utils'
import { deleteProduct, operateProduct } from '../api'
export default {
  name: 'data-table',
  props: {
    list: {
      type: Array,
      default() {
        return []
      }
    },
    type: {
      type: [String, Array],
      default: '0'
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
        multipleSelection: [],
        delList: [],
        editVisible: false,
        pageTotal: 0,
        form: {},
        tableData: [],
        idx: -1,
        id: -1,
        src: 'https://img20.360buyimg.com/mobilecms/s700x700_jfs/t1/66856/21/4885/89400/5d305dcdE3a32bbb4/7999de5bed64297f.jpg!q70.jpg'
    };
  },
  created() {},
  watch: {
    list(list) {
      this.tableData = list
    }
  },
  methods: {

    // 触发搜索按钮
    handleSearch() {
        this.$set(this.query, 'pageIndex', 1);
        this.getData();
    },
    // 删除操作
    handleDelete(index, row) {
        // 二次确认删除
        this.$confirm('确定要删除吗？', '提示', {
            type: 'warning'
        })
          .then(() => {
            let { id } = row
            return deleteProduct({item_id: id})
          })
          .then((res) => {
            let { errorCode, errorMessage } = res
            if (errorCode === 0) {
              this.$message.success('删除成功');
              this.tableData.splice(index, 1);
              return false
            }
            this.$message.error(errorMessage)
          })
          .catch(() => {});
    },
    // 多选操作
    handleSelectionChange(val) {
        this.multipleSelection = val;
    },
    delAllSelection() {
        const length = this.multipleSelection.length;
        let str = '';
        this.delList = this.delList.concat(this.multipleSelection);
        for (let i = 0; i < length; i++) {
            str += this.multipleSelection[i].name + ' ';
        }
        this.$message.error(`删除了${str}`);
        this.multipleSelection = [];
    },
    // 编辑操作
    handleEdit(index, row) {
      window.sessionStorage.setItem('refersh', '1')
      this.$router.push({ path: '/edit-product', query: { item_id: row.product_sku_info[0].item_id } })
    },
    async operation(index, row) {
      let item_array = [row.id]
      let { type } = this
      type -= 0
      // 操作类型 ：1.上架0.下架
      let operate_type = row.published_status === 1 ? 0 : 1
      let msg = '下架成功'
      if (operate_type === 1) {
        msg = "上架成功"
      }
      let { errorCode } = await operateProduct({ item_array, operate_type })
      if (errorCode === 0) {
        this.$message.success(msg)
        this.tableData = this.tableData.map(item => {
          if (item.id !== row.id) return item
          return {
            ...row,
            published_status: operate_type
          }
        }).filter(item => {
          if (type === 0) return true
          return type === item.published_status
        })
      }
    },
  },
  filters: {
    /**
     * @desc 格式化时间
     */
    dateFormat(value) {
      let data  = new Date((value - 0) * 1000)
      return dateFormat(data)
    },
    /**
     * @desc 处理价格
     */
    formatPrice(item) {
      let { low_price, high_price } = item
      low_price = formatPrice(low_price-0)
      let res = low_price

      if (high_price ) {
        high_price = formatPrice(high_price)
        res = `${res} ~ ${high_price}`
      }
      return res

    }
  },
  mounted() {
    this.tableData = this.list
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.data-table{}
</style>
