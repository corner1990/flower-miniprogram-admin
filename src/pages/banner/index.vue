<template>
  <div class="banner">
    <div class="release-btn">
      <el-button type="primary" @click="showEdit = true">创建banner</el-button>
    </div>
     <el-tabs v-model="activeName" type="card" @tab-click="changeStatus">
        <template>
          <el-tab-pane
            :label="tab.label"
            :name="tab.key"
            v-for="(tab, key) in tabs"
            :key="key"
            
          >
            <div class="table-wrap">
              <dataTable :list="list" @update="update" @refresh="refresh" />
            </div>
          </el-tab-pane>
        </template>
      </el-tabs>
    
    
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
      tabs: [
        {
          label: '首页',
          key: '0'
        },
        {
          label: '包月鲜花',
          key: '1'
        },
        {
          label: '礼品鲜花',
          key: '2'
        }
      ],
      filterInfo: {
        'space_id': 0
      },
      activeName: '0',
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
      let { errorCode, data } = await getIndexBannerList(this.filterInfo)
      if (errorCode === 0) {
        this.list = data.banner_list
      }
    },
    refresh() {
      this.loadInfo()
    },
    changeStatus(tab) {
      this.list = []
      let { name: space_id } = tab
      this.filterInfo = { space_id }
      
      this.loadInfo()
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
