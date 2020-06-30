<template>
  <Box class="MaterialContent" row left>
    <div class="image-wrapper" v-if="this.type==='image'">
      <div class="image-count">{{previewSrcList.length}} 张</div>
      <el-image
        class="image"
        :src="info.feed_base_info.content.feed_entity_list[0].image"
        :preview-src-list="previewSrcList"
        fit="cover"
      />
    </div>
    <div class="video" v-if="this.type==='video'">
      <video
        controls
        autoplay
        muted
        loop
        :src="info.feed_base_info.content.feed_entity_list[0].video_link"
      ></video>
    </div>
    <div class="text">{{info.feed_base_info.content.content_desc}}</div>
  </Box>
</template>

<script>
import { Box } from 'vue-raw-ui'

export default {
  name: 'MaterialContent',
  components: {
    Box
  },
  props: {
    info: Object
  },
  computed: {
    // image或video
    type() {
      if (!this.info.feed_base_info.content) return ''
      if (!this.info.feed_base_info.content.feed_entity_list.length) return ''
      return this.info.feed_base_info.content.feed_entity_list[0].element_type
    },
    // previewSrcList
    previewSrcList() {
      return this.info.feed_base_info.content.feed_entity_list.map(item => item.image)
    }
  },
  // mounted() {
  //   console.log(this.info)
  // }
}
</script>

<style lang="less" scoped>
@import '../../../../less/main.less';

.image,
.video {
  .size(100px);
  min-width: 100px;
  border-radius: 4px;
  margin-right: 10px;
  background: @black15;
}

.image-wrapper {
  position: relative;

  .image-count {
    position: absolute;
    left: 4px;
    top: 4px;
    background: @white85;
    border-radius: 20px;
    color: royalblue;
    z-index: 1;
    padding: 4px 10px;
    line-height: 14px;
    font-weight: bold;
    font-size: 12px;
  }
}

.video {
  video {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}

.text {
  line-height: 18px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
  overflow: hidden;
  font-size: 14px;
  margin-right: 10px;
}
</style>
