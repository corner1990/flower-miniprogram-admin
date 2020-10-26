<template>
  <div class="product">
    <!-- <Search @search="search" /> -->
    <router-link to="/release-product" class="release-btn">
      <el-button type="primary" >发布商品</el-button>
    </router-link>
    <div class="table-wrap">
      <dataTable :list="list" :type="publish_type" @update="update" />
    </div>
    <!-- <el-tabs
      v-model="publish_type"
      type="card"
      @tab-click="handleClick"
      class="product-tab"
    >
      <el-tab-pane
        :label="tab.label"
        :name="tab.key"
        v-for="(tab, key) in tabList"
        :key="key"
      >
        
        <dataTable :list="list" :type="publish_type" @update="update" />
      </el-tab-pane>
    </el-tabs> -->
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
    <el-dialog
      :visible.sync="showDetail"
      width="420px"
    >
      <MobileProductDetail :info="{}" />
    </el-dialog>
  </div>
</template>

<script>
// import { mapState, mapMutations } from 'vuex'
// import Search from './product-compoent/search'
import dataTable from './product-compoent/data-table'
import MobileProductDetail from '../../components/product-detail'
import { getProductList } from './api'
export default {
  name: 'product',
  props: {
    msg: String
  },
  components: {
    // Search,
    dataTable,
    MobileProductDetail
  },
  data() {
    return {
      publish_type: '0',
      tabList: [
        {
          label: '全部',
          key: '0',
        },
        {
          label: '上架中',
          key: '1',
        },
        {
          label: '已下架',
          key: '2'
        }
      ],
       filterInfo: {
      },
      list: [],
      pageInfo: {
        count: 0,
        page_size: 10,
        index: 0
      },
      showDetail: false,
      loading: false
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
    handlePageChange(index) {
      this.loadInfo(index-1)
    },
    /**
     * @des 搜索
     */
    search(filterInfo) {
      this.pageInfo = {
        index: 0,
        page_size: 10
      }
      this.filterInfo = filterInfo
      this.loadInfo()
    },
    /**
     * @desc 加载数据
     */
    async loadInfo(index = 0) {
      if (this.loading) return this.$message.success('数据加载中，请稍等');
      this.list = []
      this.loading = true
      let { publish_type, pageInfo, filterInfo } = this
      let { errorCode, data } = await getProductList({
        ...pageInfo,
        ...filterInfo,
        publish_type,
        index
      })
      if (errorCode === 0) {
        this.list = data.product_item_list
        this.pageInfo = data.pageInfo
      }
      this.loading = false
    },
  },
  created() {
    this.loadInfo()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.product{
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
    background: #fff;
    margin: 0;
    padding: 20px 10px;
  }
}
</style>
