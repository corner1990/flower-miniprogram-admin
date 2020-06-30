<template>
  <div class="PreviewContent ql-editor" v-html="contentHtml" style="max-height: auto; overflow-y: unset">
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'PreviewContent',
  computed: {
    ...mapState('material/ads', {
      contentHtml: state => state.contentHtml
    })
  }
}
</script>

<style lang="less" scoped>
.PreviewContent {
  padding: 15px;
}
</style>

<style lang="less">
.PreviewContent {
  img {
    width: 100%;
  }
}
</style>
