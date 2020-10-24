<template>
  <div class="orders">
    <h2 class="title">订单管理</h2>
    <Search @search="search" />
    <section class="content">
      <el-tabs v-model="activeName" type="card" @tab-click="changeStatus">
        <template>
          <el-tab-pane
            :label="tab.label"
            :name="tab.key"
            v-for="(tab, key) in tabs"
            :key="key"
            
          >
           <DataTable v-loading="loading" :list="list" />
          </el-tab-pane>
        </template>
      </el-tabs>
      <div class="pagination">
        <el-pagination
            background
            layout="total, prev, pager, next"
            :current-page="pageInfo.index"
            :page-size="pageInfo.page_size"
            :total="pageInfo.count"
            @current-change="handlePageChange"
        ></el-pagination>
      </div>
    </section>
  </div>
</template>

<script>
import Search from './order/search'
import DataTable from './order/data-table'
import { getOrderList, getExpressList } from './api'
export default {
  name: 'orders',
  props: {
    msg: String
  },
  data() {
    return {
      tabs: [
        {
          label: '全部',
          key: 'all'
        },
        {
          label: '待付款',
          key: '10'
        },
        {
          label: '待发货',
          key: '30'
        },
        {
          label: '已发货',
          key: '40'
        },
        {
          label: '已完成',
          key: '50'
        },
        {
          label: '已关闭',
          key: '60'
        }
      ],
      filterInfo: {
      },
      activeName: 'all',
      allData: {}, // 保存所有数据
      list: [],
      order_status: '',
      pageInfo: {
        count: 40,
        page_size: 10,
        index: 0
      },
      expressList: [],
      loading: false
    }
  },
  components: {
    Search,
    DataTable
  },
  methods: {
    /**
     * @desc 加载数据
     */
    async loadInfo(index = 0) {
      let { order_status } = this
      !order_status ? order_status = 0 : null
      this.loading = true
      let { errorCode, data } = await getOrderList({
        ...this.pageInfo,
        ...this.filterInfo,
        order_status,
        index
      })
      this.loading = false
      if (errorCode === 0) {
        this.list = data.order_list
        this.pageInfo = data.pageInfo
      }
    },
    /**
     * @des 搜索
     */
    search(filterInfo) {
      this.pageInfo = {
        index: 0,
        page_size: 10
      }
      let { 
        time: { start_time, end_time }, 
        ...info
      } = filterInfo
      
      this.filterInfo = { ...info, start_time, end_time }
      this.loadInfo()
    },
    handlePageChange(index) {
      this.loadInfo(index-1)
    },
    changeStatus(tab) {
      this.list = []
      let { name } = tab
      name = name === 'all' ? null : name - 0
      this.order_status = name
      this.loadInfo(0)
    },
    /**
     * @desc 获取快递公司列表
     */
    async loadExpressList() {
      let { errorCode, data } = await getExpressList()
      if (errorCode === 0) {
        window.sessionStorage.setItem('$expressList', JSON.stringify(data))
        this.expressList = data
      }
    }
  },
  filters: {
    filterList(value, item) {
      let { key } = item
      if (key === 'all') return value
      return value.filter(() => `${value.order_status}` === key)      
    }
  },
  mounted() {
    this.loadInfo()
    this.loadExpressList()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.orders{
  .title{
    background: #fff;
    padding: 10px 15px;
    border-bottom: 1px solid #eee
  }
  .content{
    &{
      margin-top: 16px;
      background: #fff;
      overflow: inherit;
    }
  }
}
</style>
