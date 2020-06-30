<template>
  <div class="FilterForm">
    <el-form :model="form" :rules="rules" style="max-width: 400px;" label-width="80px">
      <Headline>筛选内容</Headline>

      <el-form-item label="类别">
        <el-select v-model="form.catagory" placeholder="请选择内容类别" size="medium">
          <el-option label="全部" value="">全部</el-option>
          <el-option label="纯文字" value="1">纯文字</el-option>
          <el-option label="图片" value="2">图片</el-option>
          <el-option label="短视频" value="3">短视频</el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="用户昵称">
        <el-input placeholder="请输入要筛选的用户昵称" v-model="form.nickname" size="medium" />
      </el-form-item>

      <el-form-item label="对应IP">
        <el-select
          v-model="form.ip"
          placeholder="请选择栏目"
          filterable
          no-data-text="请选择对应IP"
          remote
          :remote-method="loadIp"
          size="medium"
          clearable
        >
          <el-option
            v-for="(star, index) in form.ipList"
            :key="index"
            :label="star.content"
            :value="star.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="上传时间">
        <el-date-picker
          v-model="form.dateTime"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions"
          size="medium"
        ></el-date-picker>
      </el-form-item>

      <el-button type="primary" plain size="medium" @click="handleClickFilter">筛选</el-button>
      <el-button plain icon="el-icon-brush" size="medium" @click="handleClickReset">清空筛选条件</el-button>
    </el-form>
  </div>
</template>

<script>
import FormItem from '../FormItem.vue'
import { Box } from 'vue-raw-ui'
import Headline from '../MaterialAds/Headline.vue'
import { getStarIpList } from '../../api'

export default {
  name: 'FilterForm',
  components: {
    FormItem,
    Box,
    Headline
  },
  data() {
    return {
      pickerOptions: {
        shortcuts: [
          {
            text: '昨天',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 1)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      },
      form: {
        catagory: '',
        nickname: '',
        selectedIp: '',
        ipList: [],
        dateTime: ''
      },
      rules: {}
    }
  },
  methods: {
    async loadIp(keyword) {
      const { errorCode, data } = await getStarIpList({ index: 0, page_size: 10, keyword })
      if (errorCode === 0) {
        this.form.ipList = data
      }
    },
    handleClickReset(){
      this.form = {
        catagory: '',
        nickname: '',
        selectedIp: '',
        ipList: [],
        dateTime: ''
      }
      this.handleClickFilter()
    },
    handleClickFilter(){
      this.$emit('clickFilter', this.form)
    }
  },
  mounted(){
    this.loadIp()
  }
}
</script>

<style lang="less" scoped>
</style>
