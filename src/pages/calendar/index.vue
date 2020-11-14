<template>
  <div class="orders">
    <h2 class="title">送花日历</h2>
    <!-- <div
      class="date-piker-wrap"
      v-show="activeName == '60'"
    >
      <el-date-picker
        v-model="day"
        align="right"
        type="date"
        placeholder="选择日期"
        :picker-options="pickerOptions">
      </el-date-picker>
    </div> -->
    <Search @search="search" />
    <section class="content">
      <DataTable v-loading="loading" :list="list" @dirver="dirver" />
      <!-- <div class="pagination">
        <el-pagination
            background
            layout="total, prev, pager, next"
            :current-page="pageInfo.index"
            :page-size="pageInfo.page_size"
            :total="pageInfo.count"
            @current-change="handlePageChange"
        ></el-pagination>
      </div> -->
    </section>
  </div>
</template>

<script>
import Search from './order/search'
import DataTable from './order/data-table'
import { getOrderList } from './api'
export default {
  name: 'orders',
  data() {
    return {
     
      filterInfo: {
      },
      activeName: 'all',
      list: [],
      order_status: '',
      pageInfo: {
        count: 40,
        page_size: 10,
        index: 0
      },
      expressList: [],
      loading: false,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
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
      }
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
    async loadInfo(filterInfo) {
      let { errorCode, data } = await getOrderList(filterInfo)
      if (errorCode === 0) {
        this.list = data.calendar_list
        // this.pageInfo = data.pageInfo
      }
    },
    /**
     * @des 搜索
     */
    search(filterInfo) {

      this.filterInfo = filterInfo
      console.log('this', filterInfo)
      this.$nextTick(() => this.loadInfo(filterInfo))
    },
    handlePageChange() {
      // this.loadInfo(this.filterInfo)
    },
    /**
     * @desc 发获
     */
    dirver(info) {
      let { list } = this
      let id = info.order_id
      this.list = list.map(item => {
        if (item.order_id !== id) return item
        return info
      })
      console.log('info', info)
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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.orders{
  position: relative;
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
  .date-piker-wrap{
    position: absolute;
    top: 79px;
    right: 12px;
    z-index: 2;
  }
}
</style>
