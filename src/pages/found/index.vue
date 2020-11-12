<template>
  <div class="banner">
    <div class="release-btn">
      <el-button type="primary" @click="showEdit = true">创建内容</el-button>
    </div>
    <div class="table-wrap">
      <dataTable :list="list" @update="update" @refresh="loadInfo" />
    </div>
    
    <CreateBanner
      :show="showEdit"
      :info="editInfo"
      @update="update"
      @refresh="loadInfo" 
    />
    
  </div>
</template>

<script>
import dataTable from './components/data-table'
import CreateBanner from './components/create-banner'
import { getIndexBannerList } from './api'
export default {
  name: 'banner',
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

    /**
     * @desc 加载数据
     */
    async loadInfo() {
      let { errorCode, data } = await getIndexBannerList()
      if (errorCode === 0) {
        this.list = data.banner_list
      }
    },
  },
  created() {
    this.loadInfo()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.banner{
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
}
</style>
