<template>
  <div class="headline" :style="{minWidth}">
    <h4><slot>Headline</slot></h4>
    <div class="icon-required" v-show="required">
      <svg t="1591607496870" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2605" width="200" height="200"><path d="M64 64h896v896H64z" fill-opacity="0" p-id="2606"></path><path d="M867.08 425.9A66.86 66.86 0 0 0 776 385.65L551.2 487.33l27.21-245.18a66.82 66.82 0 1 0-132.82 0l27.21 245.18L248 385.65A66.83 66.83 0 1 0 207 512l241.58 49.88-166.09 182.34A66.84 66.84 0 1 0 390 822.28L512.09 607.9l122.06 214.38a66.79 66.79 0 1 0 107.36-78.06L575.35 561.88 816.94 512a66.79 66.79 0 0 0 50.14-86.1z" fill="#FF0000" p-id="2607"></path></svg>
    </div>
    <slot name="caption" class="caption"></slot>
  </div>
</template>

<script>
export default {
  name: 'Headline',
  props: {
    required: Boolean,
    minWidth: {
      type: String,
      default: '100px'
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../../../less/main.less';

.headline {
  margin-right: 30px;
  position: relative;
  flex-basis: 100px;
  min-width: 100px;

  h4 {
    margin: 24px 0 16px;
    color: slategrey;
  }
}
.headline:first-of-type h4 {
  margin-top: 0;
}
.icon-required {
  .size(8px);
  .center();
  overflow: hidden;
  position: absolute;
  left: -10px;
  top: 4px;
}
</style>
