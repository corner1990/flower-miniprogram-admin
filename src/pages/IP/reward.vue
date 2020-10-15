<template>
  <Block class="reward" title="中奖列表">
    <div slot="action">
      <el-button type="primary" icon="el-icon-refresh-left" round size="medium" @click="refreshData">刷新</el-button>
    </div>

    <!-- 列表 -->
    <el-table
      class="table"
      :data="tableData"
      style="width: 100%; margin-top: 20px;"
      v-loading="loading"
    >
      <!-- 索引 -->
      <el-table-column type="index"></el-table-column>

      <!-- 中奖时间 -->
      <el-table-column label="中奖时间" min-width="100">
        <template slot-scope="scope">{{scope.row.created_timestamp | formatTime}}</template>
      </el-table-column>

      <!-- 奖品 -->
      <el-table-column label="奖品" prop="award_name"></el-table-column>

      <!-- 中奖人账号 -->
      <el-table-column label="中奖人账号(UID)" prop="user_id"></el-table-column>

      <!-- 中奖人手机号 -->
      <el-table-column label="中奖人手机号" prop="phone_num"></el-table-column>

      <!-- 领取状态 -->
      <el-table-column label="领取状态">
        <template slot-scope="scope">{{scope.row.receive_status | formatStatus}}</template>
      </el-table-column>

      <!-- 操作 -->
      <el-table-column label="操作" min-width="200">
        <template slot-scope="scope">
          <!-- 收货地址 -->
          <el-popover v-if="!scope.row.express_num && scope.row.address" placement="top-start" title="收货地址" width="260" trigger="click" style="margin-right: 10px;">
            <div>
              <p><el-button v-clipboard="()=>{
                $message.success('已拷贝')
                return formatAddress(scope.row)  
              }" circle plain type="text" icon="el-icon-document-copy"></el-button> {{scope.row | formatAddress}}</p>
            </div>
            <el-button
              v-if="!scope.row.express_num && scope.row.address"
              plain
              icon="el-icon-location-outline"
              round
              size="mini"
              slot="reference"
            >查看地址</el-button>
          </el-popover>
          <!-- 上传运单号 -->
          <el-button
            v-if="!scope.row.express_num && scope.row.address"
            type="primary"
            plain
            icon="el-icon-truck"
            round
            size="mini"
            @click="handleClickUpload(scope.row.id)"
          >上传快递单号</el-button>
          <!-- 发货信息 -->
           <el-popover v-if="scope.row.express_num" placement="top-start" title="发货信息" width="260" trigger="click" style="margin-right: 10px;">
            <div>
              <p><i class="el-icon-guide"></i> {{scope.row | formatAddress}}</p>
              <p><i class="el-icon-truck"></i> {{form.expressComponayList.find(item=>item.key === scope.row.express_company) ? form.expressComponayList.find(item=>item.key === scope.row.express_company).name : ''}}</p>
              <p><i class="el-icon-tickets"></i> {{scope.row.express_num}}</p>
            </div>
            <el-button
              v-if="scope.row.express_num"
              plain
              type="success"
              icon="el-icon-finished"
              round
              size="mini"
              slot="reference"
            >已发货</el-button>
          </el-popover>
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

    <!-- Dialog -->
    <el-dialog title="上传快递单号" :visible.sync="dialogVisible">
      <el-form :model="form" :rules="rules" style="padding: 0 15px;">
        <FormItem title="快递公司" required>
          <el-form-item prop="selectedCompany" size="medium">
            <el-select
              v-model="form.selectedCompany"
              size="medium"
              placeholder="请选择快递公司"
            >
              <el-option
                v-for="(company, index) in form.expressComponayList"
                :key="index"
                :label="company.name"
                :value="company.key"
              ></el-option>
            </el-select>
          </el-form-item>
        </FormItem>
        <FormItem title="快递单号" required>
          <el-form-item prop="company" size="medium">
            <el-input type="text" placeholder="填写快递单号" v-model="form.expressNum" />
          </el-form-item>
        </FormItem>
      </el-form>
      
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClickClear">取消并清空</el-button>
        <el-button type="primary" @click="handleClickConfirmDeliver">上传发货</el-button>
      </div>
    </el-dialog>
  </Block>
</template>

<script>
import Block from '../material/components/MaterialAds/Block.vue'
import { getAwardList, getExpessList, deliverAward } from './api'
import FormItem from '../material/components/FormItem.vue'

export default {
  name: 'reward',
  components: {
    Block,
    FormItem
  },
  data() {
    return {
      tableData: [],
      loading: true,
      pageInfo: {
        index: 0,
        has_more: true,
        pageCount: 1
      },
      dialogVisible: false,
      form: {
        selectedCompany: '',
        expressNum: '',
        expressComponayList: [],
        currentId: null
      },
      rules: {}
    }
  },
  methods: {
    // 获取列表数据
    async fetchData() {
      this.loading = true
      const { errorCode, data } = await getAwardList({ index: this.pageInfo.index - 1 })
      this.loading = false
      if (errorCode === 0) {
        const { page_info, award_list } = data
        this.pageInfo.pageCount = Math.ceil(page_info.count / page_info.page_size) // 总页数
        this.tableData = award_list // 表格数据
      }
    },
    // 翻页
    handlePageChange() {
      this.fetchData()
    },
    // 点击上传快递单号
    handleClickUpload(id) {
      this.dialogVisible = true
      this.form.currentId = id
    },
    // 加载快递公司
    async loadCompany() {
      const {data} = await getExpessList()
      this.form.expressComponayList = Object.keys(data).map(item=>({
        key: item,
        name: data[item]
      }))
    },
    // 清空
    handleClickClear() {
      this.form.selectedCompany = ''
      this.form.expressNum = ''
      this.dialogVisible = false
    },
    // 发货
    async handleClickConfirmDeliver() {
      const user_award_id = this.form.currentId
      const express_company = this.form.selectedCompany
      const express_num = this.form.expressNum

      const {errorCode} = await deliverAward({
        user_award_id,
        express_company,
        express_num
      })

      if(errorCode === 0){
        this.$message.success('上传发货成功')
        this.handleClickClear()
        this.refreshData()
      }
    },
    // 格式化地址
    formatAddress(row) {
      return `${row.province} ${row.city} ${row.area} ${row.address}`
    },
    // 刷新数据
    refreshData() {
      this.fetchData()
    }
  },
  filters: {
    formatTime(timestamp) {
      if (!timestamp) return ''
      return new Date((timestamp + '000') * 1).toLocaleString()
    },
    formatStatus(status) {
      if (status == 1) return '已领取'
      return '未领取'
    },
    formatAddress(row) {
      return `${row.province} ${row.city} ${row.area} ${row.address}`
    }
  },
  watch: {},
  mounted() {
    this.fetchData()
    this.loadCompany()
  }
}
</script>

<style lang="less" scoped>
</style>
