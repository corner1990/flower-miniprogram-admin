<template>
  <div class="Feeds">
    <el-tabs v-model="currentTab" class="tabs">
      <el-tab-pane label="全部" name="2"></el-tab-pane>
      <!-- <el-tab-pane label="未审核" name="-1"></el-tab-pane> -->
      <el-tab-pane label="审核通过" name="1"></el-tab-pane>
      <el-tab-pane label="审核不通过" name="-2"></el-tab-pane>
      <el-tab-pane label="精选" name="4"></el-tab-pane>
    </el-tabs>
    <el-table :data="tableData" style="width: 100%" v-loading="loading">
      <!-- 物料内容 -->
      <el-table-column label="物料内容" min-width="350">
        <template slot-scope="scope">
          <MaterialContent :info="scope.row" />
        </template>
      </el-table-column>

      <!-- 对应IP -->
      <el-table-column class="ip" label="对应IP">
        <template slot-scope="scope">
          <h4 class="ip">{{scope.row.feed_bind_info | formatIpName}}</h4>
        </template>
      </el-table-column>

      <!-- 对应商品 -->
      <el-table-column class="product" label="对应商品" min-width="100">
        <template slot-scope="scope">
          <div class="product__image"><img :src="scope.row.feed_bind_info | formatProductImg" alt=""></div>
          <p class="product__name">{{scope.row.feed_bind_info | formatProductName}}</p>
        </template>
      </el-table-column>

      <!-- 上传者/时间 -->
      <el-table-column class="publish" label="上传者/时间" min-width="100px" align="center">
        <template slot-scope="scope">
          <span
            class="publish__nicknam"
          >{{scope.row.feed_author_info && scope.row.feed_author_info.nick_name}}</span>
          <br />
          <span
            class="publish__date"
          >{{scope.row.feed_author_info && scope.row.feed_base_info.published_timestamp}}</span>
        </template>
      </el-table-column>

      <!-- 状态 -->
      <el-table-column label="状态">
        <template slot-scope="scope">
          <span class="status">{{scope.row.feed_base_info | formatStatus}}</span>
        </template>
      </el-table-column>

      <!-- 操作 -->
      <el-table-column prop="actions" label="操作">
        <template slot-scope="scope">
          <el-link v-if="scope.row.feed_base_info.status==='-2'" type="success" size="mini" @click="handleAudit(scope.row.feed_base_info.id, 1)">通过</el-link>
          <el-link v-if="scope.row.feed_base_info.status!=='-2'" type="danger" size="mini" @click="handleAudit(scope.row.feed_base_info.id, -2)">不通过</el-link>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      class="pagination"
      background
      layout="prev, pager, next"
      :current-page.sync="pageInfo.index"
      @current-change="handlePageChange"
      :page-count="pageInfo.pageCount"
      hide-on-single-page
    ></el-pagination>
  </div>
</template>

<script>
import { getAllFeedList, auditFeed } from '../../api'
import MaterialContent from './MaterialContent.vue'

export default {
  name: 'Feeds',
  components: {
    MaterialContent
  },
  props: {
    filterForm: Object
  },
  data() {
    return {
      pageInfo: {
        index: 0,
        has_more: true,
        pageCount: 1
      },
      currentTab: '2',
      tableData: [],
      loading: false
    }
  },
  methods: {
    // 获取feed列表数据
    async fetchData(param={ index: this.pageInfo.index-1, feed_status: this.currentTab }) {
      this.loading = true
      const { errorCode, data } = await getAllFeedList(param)
      this.loading = false
      if (errorCode === 0) {
        const { page_info, feed_info_list } = data
        this.pageInfo.pageCount = Math.ceil(page_info.count / page_info.page_size) // 总页数
        this.tableData = feed_info_list // 表格数据
      }
    },
    // 翻页
    handlePageChange(){
      this.fetchData()
    },
    // 审核是否通过
    async handleAudit(feed_id, audit_status){
      const {errorCode} = await auditFeed({ feed_id, audit_status })
      if(errorCode === 0) {
        const action = audit_status*1 > 0 ? '通过' : '不通过'
        this.$message.success(`"${action}" 操作成功`)
        this.fetchData()
      }
    }
  },
  filters: {
    formatStatus(obj) {
      if (!obj.status) return ''
      switch (obj.status) {
        case '1':
          return '审核通过'
        case '-1':
          return '审核中'
        case '-2':
          return '审核不通过'
        default:
          return ''
      }
    },
    formatProductImg(obj){
      if(!obj) return ''
      if(!obj.sku_info) return ''
      return obj.sku_info.main_pic
    },
    formatProductName(obj){
      if(!obj) return ''
      if(!obj.sku_info) return ''
      return obj.sku_info.product_name
    },
    formatIpName(obj){
      if(!obj) return ''
      if(!obj.ip_info) return ''
      return obj.ip_info.star_name
    },
  },
  watch: {
    // 改变Tab则获取数据
    currentTab() {
      this.fetchData({ feed_status: this.currentTab })
    },
    // filterForm触发获取数据
    filterForm(form) {
      const timeStamp = (timeStamp)=>Math.ceil(timeStamp/1000)
      const start_time = form.dateTime ? timeStamp(form.dateTime[0]) : ''
      const end_time = form.dateTime ? timeStamp(form.dateTime[1]) : ''
      const feed_resource_type = form.catagory
      this.fetchData({ feed_status: this.currentTab, start_time, end_time, feed_resource_type })
    } 
  },
  mounted(){
    this.fetchData()
  }
}
</script>

<style lang="less" scoped>
@import '../../../../less/main.less';

.pagination {
  margin: 20px 0 60px;
}
.product {

  &__image {
    .size(80px);
    .fit();
  }
  &__name {
    .caption();
    font-size: 12px;
  }
}
</style>
