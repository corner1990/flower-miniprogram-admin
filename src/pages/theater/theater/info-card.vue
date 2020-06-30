<template>
  <div class="theater-info-card">
    <el-card class="box-card">
      <div slot="header" class="clearfix header-coustm">
        <span></span>
        <el-button type="primary" @click="release">创建日签</el-button>
      </div>
      <el-row class="list">
        <el-col :span="4" v-for="(item, key) in list" :key="key" class="item">
            <el-card :body-style="{ padding: '0px' }" class="item-card">
              
              <el-image
              :src="item | initSrc"></el-image>
              <img src="" class="image">
              <div class="text-centent">
                <p class="type-wrap"> 
                  <span>{{ item.show_base_info.date }}</span>
                </p>
                <!-- <p class="text textHide" v-if="true">{{ item | content }}</p> -->
                <p class="text textHide" >{{ item | content }}</p>
                <div class="item-btn-group">
                  <el-button type="text" @click="delItem(item)">删除</el-button>
                  <!-- <el-button type="text">编辑</el-button>
                  <el-popover
                    placement="top"
                    width="200"
                    trigger="click"
                    content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
                    <div>
                      <el-button type="text">查看</el-button>
                      <el-button type="text">编辑</el-button>
                    </div>
                    <el-button type="text" slot="reference">更多</el-button>
                  </el-popover> -->
                </div>
              </div>
              
            </el-card>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { deleteTheatre } from '../api'
export default {
  name: 'theater-info-card',
  props: {
    list: {
      type: Array,
      defulat() {
        return []
      }
    }
  },
  computed: {
    currentDate() {
      return '2020-05-22'
    }
  },
  filters: {
    initSrc(info) {
      let type = info.show_base_info.show_type
      let src = ''
      switch(type){
        case 1:
          src = info.daily_pictorial.background
        break;
        case 2:
          src = info.super_product && info.super_product.background
        break;
        case 3:
          src = info.activity_notice.background
        break;
        case 4:
          src = info.new_arrival_product.sku_img
        break;
        
      }
      return src
    },
    content(info) {
      let type = info.show_base_info.show_type
      let src = ''
      switch(type){
        case 1:
          src = info.daily_pictorial.content
        break;
        case 2:
          src = info.super_product && `skuId: ${info.super_product.sku_id}`
        break;
        case 3:
          src = info.activity_notice.link || 'https://ipxcdn.jfshare.com/system/theatre/64f1e8e6879c32505ec61d5e9a93a6fc.jpg'
        break;
        case 4:
          src = `skuId: ${info.new_arrival_product.sku_id}`
        break;
        
      }
      return src
    }
  },
  methods: {
    release() {
      this.$emit('update', 'releaseInfo', true)
    },
    delItem(info) {
      let id = info.show_base_info.show_id
       this.$confirm('确定要删除该内容么?', '提示', {
          confirmButtonText: '删除',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // this.$message({
          //   type: 'success',
          //   message: '删除成功!'
          // });
          
          return deleteTheatre({id})
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        }).then(res => {
          let { errorCode } = res
          if (errorCode === 0) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.$emit('delItem', id)
          }
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.theater-info-card{
  &{
    margin-top: 14px;
  }
  .header-coustm{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .item{
    position: relative;
    margin: 0 16px 16px 0;
    max-height: 260px;
    min-height: 260px;
  }
  .item-card{
    height: 260px;
  }
  .type-wrap{
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
  }
  .text-centent{
    position: absolute;
    bottom: 0;
    width: 100%;
    background: rgba(0, 0, 0, 0.5);
    padding: 10px;
    color: rgba(255, 255, 255, 0.85);
    box-sizing: border-box;
    
    .type{
      font-size: 12px;
    }
    .text{
      margin: 10px 0;
      max-height: 100px;
      overflow: hidden;
      word-break: break-all;
    }
    .time{
      font-size: 12px;
    }
  }
  .item-btn-group{
    width: 100%;
    display: flex;
    justify-content: flex-end;
    
    .el-button{
      margin-left: 8px;
      color: rgba(255, 255, 255, 0.85);
    }
    .more{
      transform: rotate(90deg);
    }
  }
  .textHide {
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    line-clamp: 4;
    -webkit-box-orient: vertical;
  }
}
</style>
