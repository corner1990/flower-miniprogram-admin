<template>
  <el-container class="Result">
    <el-aside>
      <el-header> 新评论数(999+) </el-header>
      <Box class="preview">
        <Box class="preview__item" v-for="(item,index) in previews" :key="index">
          
          <Box row center alignX="space-between" style="width:100%;">
            <el-tag type="success" effect="plain">文章</el-tag>
            <span class="preview__unread">99</span>
          </Box>

          <div class="preview__title">这是文章标题这是文章标题写不完换行显示不了就换行</div>
        
          <Box style="width: 100%;" row alignX="space-between" class="preview__info">
            <span class="preview__date">2020-06-09 20:47:49</span>
            <span class="preview__at">@小花</span>
          </Box>

        </Box>
      </Box>
    </el-aside>

    <el-container>
      <el-header> 评论详情 </el-header>
      <Box class="detail">
        <Box class="detail__item" row style="width: 100%;" v-for="(item, index) in details" :key="index">
          <Box size="50" avatar class="detail__avatar">
            <img :src="false || 'https://i.loli.net/2020/06/09/gUeGZIDqdmykszC.png'" alt="">
          </Box>
          <Box flex="1">
            
            <Box row center style="width: 100%;">
              <div class="detail__username">小花同学</div>
              <div class="detail__date" style="margin-left: auto">2020-06-09 21:24:10</div>
              <Box row center style="margin-left: 10px;">
                <el-link type="success" size="mini" class="detail__pass">通过</el-link>
                <el-link type="danger" size="mini" class="detail__nopass" style="margin-left: 10px;">不通过</el-link>
              </Box>
            </Box>

            <p class="detail__content">是的是的是的</p>
            <ul class="detail-reply">
              <li class="detail-reply__item">
                <span class="detail-reply__at">@小明同学</span>:
                <p class="detail-reply__content">说的太好了</p>
              </li>
            </ul>

          </Box>
        </Box>
      </Box>
    </el-container>
  </el-container>
</template>

<script>
import {Box} from 'vue-raw-ui'

export default {
  name: 'Result',
  components: {
    Box
  },
  data(){
    return {
      previews: [...Array(20)],
      details: [...Array(20)]
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../../../less/main.less';

.Result {
  background: white;
  border-radius: 4px;
  margin: 20px 0;
  min-height: 30vh;
  max-height: 70vh;
  border: 1px solid @divider-color;
}

.el-aside {
  border-right: 1px solid @divider-color;
  width: 300px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.el-header {
  border-bottom: 1px solid @divider-color;
  .center();
  justify-content: flex-start;
}

.preview {
  overflow: hidden;
  overflow-y: auto;
  flex: 1;
  padding-bottom: 40px;
  
  &__item {
    padding: 8px;
    cursor: pointer;
    font-size: @font-size-sm;
    border-bottom: 1px solid @divider-color;

    &:hover {
      background: whitesmoke;
    }
  }

  &__unread {
    color: white;
    background: orangered;
    border-radius: 10px;
    padding: 0 8px;
    font-size: @font-size-xs;
  }

  &__title {
    margin: 6px 0;
  }

  &__info {
    .caption();
  }
}

.detail {
  overflow: hidden;
  overflow-y: auto;
  padding-bottom: 20px;

  &__item {
    padding: 12px;
    box-sizing: border-box;
    border-bottom: 1px solid @divider-color;

    &:hover {
      background: whitesmoke;
      cursor: pointer;
    }
  }

  &__avatar {
    border: 1px solid lightgray;
    margin-right: 12px;
  }

  &__username {
    .subtitle();
    color: royalblue;
    margin: 4px 0;
  }

  &__date {
    .caption();
    margin-right: 20px;
  }

}

.detail-reply {
  margin-top: 10px;

  &__item {
    .main-start();
    border-left: 4px solid @shadow-color;
    padding-left: 8px;
    .caption();
    font-size: 14px;
    background: @divider-color;
  }

  &__at {
    color: @black65;
  }
}

ul,li { list-style-type: none; }
</style>
