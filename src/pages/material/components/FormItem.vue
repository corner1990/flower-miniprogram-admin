<template>
  <Box class="FormItem" row>
    <Headline :required="required" style="margin-top: 6px;" minWidth="titleWidth || headlineWidth || labelWidth">
      <div slot="caption" class="caption"><slot name="caption"></slot></div>
      {{headline || title || label}}
    </Headline>
    <div class="main"> <slot></slot> </div>
  </Box>
</template>

<script>
import Headline from './MaterialAds/Headline.vue'
import {Box} from 'vue-raw-ui'

export default {
  name: 'FormItem',
  props: {
    headline: String,
    title: String,
    required: Boolean,
    titleWidth: String,
    headlineWidth: String,
    labelWidth: String,
  },
  components: {
    Headline,
    Box
  }
}
</script>

<style lang="less" scoped>
.FormItem {
  margin: 20px 0;

  .caption {
    color: rgba(112, 128, 144, 0.6);
  }
}
.FormItem:first-of-type {
  margin-top: 0;
}
.main {
  flex: 1;
}
</style>
