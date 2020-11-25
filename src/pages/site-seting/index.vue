<template>
  <div class="user-manager">
    <h4 class="title">站点设置</h4>
    <div class="seting-wrap">
      <div class="set-line flex" v-for="(item, key) in list" :key="key">
        <div class="set-title">{{item.config_name}}</div>
        <el-switch
          v-model="item.val"
          active-color="#00b799"
          @change="configChnage(item)"
          inactive-color="#ddd">
        </el-switch>
      </div> 
    </div>
  </div>
</template>

<script>
import { dateFormat } from '@/utils/utils'
import { getSystemConfigList, updateConfigValue } from './api'
export default {
  name: 'site-seting',
  data() {
    return {
      list: [],

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
    configChnage(info) {
      let { config_key, val } = info
      let config_value = val ? 1 : 0
      this.updateConfigVal({config_key, config_value})
      // console.log('info', {config_key, config_value})
    },
    /**
     * @desc 加载数据
     */
    async loadInfo() {
      let { errorCode, data } = await getSystemConfigList()
      if (errorCode === 0) {
        this.list = data.map(item => ({...item, val: item.config_value === '1' ? true : false}))
      }
    },
    /**
     * @desc 更新数据
     * @returns void
     */
    async updateConfigVal(params) {
      await updateConfigValue(params)
    }
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
  .set-line{
    height: 42px;
    align-items: center;
    .set-title{
      margin-right: 50px;
    }
  }
}
</style>
