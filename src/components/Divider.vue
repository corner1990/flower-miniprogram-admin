<template>
  <div class="Divider" :class="{'Divider--insivisible': invisible}">
    
  </div>
</template>

<script>
export default {
  name: 'Divider',
  props: {
    invisible: Boolean
  }
}
</script>

<style lang="less" scoped>
@import '../less/main.less';

.Divider {
  margin: 20px 0;
  width: 100%;
  height: 1px;
  background: @divider-color;

  &--invisible {
    background: transparent;
  }
}
</style>
