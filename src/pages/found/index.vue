<template>
  <div class="found">
    <div class="release-btn">
      <el-button type="primary" @click="showEdit = true">创建内容</el-button>
    </div>
    <div class="table-wrap">
      <dataTable :list="list" @update="update" @refresh="refresh" />
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
    </div>
    
    <CreateBanner
      :show="showEdit"
      :info="editInfo"
      @update="update"
      @refresh="refresh" 
    />
    
  </div>
</template>

<script>
import dataTable from './components/data-table'
import CreateBanner from './components/create-banner'
import { getIndexBannerList } from './api'
export default {
  name: 'Found',
  props: {
    msg: String
  },
  components: {
    // Search,
    dataTable,
    CreateBanner
  },
  data() {
    return {
      pageInfo: {
        index: 0,
        count: 50,
        page_size: 10,
        has_more: true
      },
      list: [],
      editInfo: null,
      showEdit: false
    }
  },
  methods: {
    handleClick() {
      this.loadInfo()
    },
    /**
     * @desc  更新数据
     */
    update(key, value) {
      this[key] = value
    },
    remove() {
      this.loadInfo(this.pageInfo)
    },
    handlePageChange(index) {
      index -= 1
      this.loadInfo({...this.pageInfo, index})
    },
    /**
     * @desc 加载数据
     */
    async loadInfo(params = this.pageInfo) {
      let { errorCode, data } = await getIndexBannerList(params)
      if (errorCode === 0) {
        this.list = data.feed_info_list
        this.pageInfo = data.page_info
      }
    },
    /**
     * @desc 刷新页面
     */
    refresh() {
      let { index, ...params } = this.pageInfo
      index -= 1
      this.loadInfo({...params, index})
    }
  },
  created() {
    this.loadInfo(this.pageInfo)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.found{
  position: relative;
  background: #fff;
  .product-tab{
    background: #fff;
    margin-top: 16px;
    padding: 15px;
    
  }
  .release-btn{
    padding: 12px;
    // position: absolute;
    // left: 270px;
    // top: 125px;
    // z-index: 2;
    .el-button{
      padding: 10px 20px;
      margin: 12px 0;
    }
  }
  .table-wrap{
    background-color: #fff;
    padding: 0 12px;
  }
  .pagination{
    padding-bottom: 20px
  }
}
</style>
