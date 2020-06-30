<template>
  <Box class="PreviewBanner" ref="banner">
    <div class="bg">
      <img :src="banner.background || 'https://via.placeholder.com/500.png?text=Please+Upload+Image'" alt />
    </div>

    <!-- upload -->
    <el-upload
      class="uploader"
      ref="upload"
      action=""
      drag
      :auto-upload="false"
      accept="image/*"
      :on-change="handleChangeFile"
    >
      <Box slot="trigger" class="upload" center>点击或拖拽上传图片</Box>
    </el-upload>


    <h4 class="titled" contenteditable @blur="handleBlurTitle" @click.stop>
      <p>{{banner.title || placeholder}}</p>
    </h4>
    <div class="info">
      <span class="info__tag">原创</span>
      <span class="info__name">{{username||'请输入用户ID'}}</span> |
      <span class="info__time">3小时前</span>
    </div>
  </Box>
</template>

<script>
import { Box } from 'vue-raw-ui'
import { mapState } from 'vuex'
import uploadOSS from '../../../../utils/uploadOSS'
import { Loading } from 'element-ui'

export default {
  name: 'PreviewBanner',
  components: {
    Box
  },
  data(){
    return {
      file: {
        filename: '',
        raw: {}
      },
      placeholder: '请输入标题'
    }
  },
  methods: {
    handleBlurTitle(ev){
      this.$store.commit('material/ads/updateBannerTitle', ev.target.textContent)
    },
    // 上传图片到OSS 并返回url
    async handleChangeFile(file){
      this.file = {
        filename: file.name,
        raw: file.raw
      }
      // loading
      const loading = Loading.service({ target: this.$refs.banner.$el })
      const res = await uploadOSS(`ipxmall/ads/${file.name}`, file.raw)
      loading.close()
      // 同步全局数据
      this.$store.commit('material/ads/updateBannerBackground', res.url)
    }
  },
  computed: {
    ...mapState('material/ads',{
      banner: state=>state.banner,
      username: state=>state.userInfo.userBaseInfo && state.userInfo.userBaseInfo.nick_name
    })
  }
}
</script>

<style lang="less" scoped>
@import '../../../../less/main.less';

.PreviewBanner {
  .card();
  box-shadow: 0 2px 4px @shadow-color;
  overflow: hidden;
  padding: 15px;
  box-sizing: border-box;
  width: 460px;
  height: 350px;
  position: relative;
}

.uploader {
  margin: 0 auto;
}

.upload {
  .cover();
  background: @black65;
  color: white;
  // cursor: pointer;
  opacity: 0;
  transition: 0.3s;

  &:hover {
    opacity: 1;
  }
}

.bg {
  .fit();
  .cover();
  background: @black;
  img {
    opacity: .85;
  }
}

.titled {
  position: relative;
  margin-top: auto;
  .title();
  font-size: 22px;
  font-weight: normal;
  color: @white;
  margin-bottom: 20px;
  cursor: pointer;
  outline: none;

  &:focus {
    // text-decoration: underline;
    background: @black65;
  }
}

.info {
  position: relative;
  color: @white;
  margin-bottom: 10px;
  .caption();
  color: @white;

  &__tag {
    padding: 4px 14px;
    background: linear-gradient(to right, orangered, hotpink 60%);
    font-size: 14px;
    border-radius: 6px;
  }

  span {
    margin: 0 10px;
  }
  span:first-of-type {
    margin-left: 0;
  }
}
</style>

<style>
.uploader .el-upload--text,
.uploader .el-upload-dragger
{
  background: transparent;
  border: none;
}

.uploader .el-upload-list {
  display: none;
}
</style>