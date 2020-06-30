<template>
  <div class="FilterForm">
    <el-form :model="form" :rules="rules" style="max-width: 400px;" label-width="80px">
      
      <Headline>筛选评论</Headline>

      <el-form-item label="栏目">
        <el-select v-model="form.catagory" placeholder="请选择栏目" size="medium">
          <el-option value="全部">全部</el-option>
          <el-option value="哈哈">哈哈</el-option>
          <el-option value="呵呵">呵呵</el-option>
        </el-select>
      </el-form-item>
    

      <el-form-item label="用户昵称">
        <el-input placeholder="请输入要筛选的用户昵称" size="medium" />
      </el-form-item>

      <el-form-item label="对应IP">
        <el-select v-model="form.ip" placeholder="请选择栏目" size="medium">
          <el-option value="全部">全部</el-option>
          <el-option value="哈哈">哈哈</el-option>
          <el-option value="呵呵">呵呵</el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="评论时间">
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

      <el-button type="primary" plain size="medium">筛选</el-button>
      <el-button plain icon="el-icon-brush" size="medium" @click="handleClickReset">清空筛选条件</el-button>
    </el-form>
  </div>
</template>

<script>
import FormItem from '../FormItem.vue'
import { Box } from 'vue-raw-ui'
import Headline from '../MaterialAds/Headline.vue'

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
        catagory: '全部',
        ip: '全部',
        dateTime: ''
      },
      rules: {}
    }
  },
  methods: {
    handleClickReset(){
      
    }
  }

}
</script>

<style lang="less" scoped>
</style>
