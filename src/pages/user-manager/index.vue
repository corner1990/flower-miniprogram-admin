<template>
  <div class="user-manager">
    <h4 class="title">用户管理</h4>
    <el-table
        :data="list"
        max-height="550"
        border
        class="table"
        ref="multipleTable"
        header-cell-class-name="table-header"
        
    >
      <el-table-column  label="用户信息">
        <template slot-scope="scope">
          <div class="flex user-info">
            <img :src="scope.row.userBaseInfo.avatar" />
            <h4 class="user-name">
              {{scope.row.userBaseInfo.nick_name}}
            </h4>
            
          </div>
        </template> 
      </el-table-column>
      <el-table-column  label="联系方式">
        <template slot-scope="scope">
          <div class="flex" v-if="scope.row.userBaseInfo.phone">
            电话：<el-tag >{{scope.row.userBaseInfo.phone}}</el-tag>
          </div>
          <span v-else>暂无联系方式</span>
        </template> 
      </el-table-column>
      <el-table-column label="注册时间">
        <template slot-scope="scope">
          <el-tag type="success" >{{scope.row.userBaseInfo.created_timestamp | dateFormat}}</el-tag>
        </template> 
      </el-table-column>
       <!-- <el-table-column label="收货地址">
        <template slot-scope="scope">
          <el-tag  v-if="scope.row.userBaseInfo.default_shipping_address">{{scope.row.userBaseInfo.default_shipping_address}}</el-tag>
          <span v-else>暂未收货地址</span>
        </template> 
      </el-table-column> -->
      <el-table-column label="用户ID" align="center">
        <template slot-scope="scope">
          <p>ID:{{scope.row.userBaseInfo.id }}</p>
        </template>
      </el-table-column>
      <!-- <el-table-column label="操作" width="180" align="center">
        <template slot-scope="scope">
          <el-button
            type="text"
            icon="el-icon-edit"
            v-show="scope.row.base_info.publish_status !== 1"
          >编辑</el-button>
        </template>
      </el-table-column> -->
    </el-table>
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
</template>

<script>
import { dateFormat } from '@/utils/utils'
import { getUserList } from './api'
export default {
  name: 'user-manager',
  data() {
    return {
      list: [],
      pageInfo: {
        count: 0,
        page_size: 10,
        index: 0
      }
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
      let { pageInfo } = this
      let { errorCode, data } = await getUserList({
        ...pageInfo,
        index
      })
      if (errorCode === 0) {
        this.list = data.user_list
        this.pageInfo = data.pageInfo
      }
      this.loading = false
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
  },
  created() {
    this.loadInfo()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import url('../../less/main.less');
.user-manager{
  background-color: @white;
  height: 100%;
  padding: 12px;
  box-sizing: border-box;

  .title{
    line-height: 46px;
    // background-color: #EBEEF5;
    border-bottom: 1px solid #eee;
    text-indent: 12px;
    margin-bottom: 10px;
    
    &::before{
      position: absolute;
      content: "";
      height: 28px;
      width: 4px;
      transform: translate(-10px, 7px);
      background-color: @color-brand;
      display: inline-block;
    }
    // color: @white;
  }
  .user-info{
    img{
      width: 100px;
      height: 100px;
      object-fit: cover;
    }
    h4{
      margin-left: 10px;
    }
  }
}
</style>
