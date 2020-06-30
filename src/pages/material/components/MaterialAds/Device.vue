<template>
  <div class="Device">
    <Navigation :title="title" transparent />
    <span class="dot"></span>
    <div class="main">
      <slot></slot>
    </div>
  </div>
</template>

<script>
// import PreviewTitle from './PreviewTitle.vue'
// import PreviewBanner from './PreviewBanner.vue'
import Navigation from './Navigation.vue'

export default {
  name: 'Device',
  props: {
    title: String
  },
  components: {
    // PreviewTitle,
    // PreviewBanner,
    Navigation
  }
}
</script>

<style lang="less" scoped>
@import '../../../../less/main.less';

.Device {
  position: fixed;
  right: 4vw;
  top: 40px;
  background: white;
  width: 460px;
  height: calc(460px * 2.1);
  transform: scale(.8);
  // border: 14px solid @black65;
  box-shadow: 
    0 0 0 5px @black25,
    0 0 6px 15px @black65,
    0 2px 0 22px @black45,
    0 40px 20px @black45,
    0 40px 40px 20px @black15
  ;
  border-radius: 40px;
  overflow: hidden;

  transition: .3s;

  display: flex;
  flex-direction: column;

  .PreviewTitle {
    border-radius: 0;
  }
  .PreviewBanner {
    border-radius: 0;
  }
  &:hover {
    transform: scale(.82);
  }

  &::-webkit-scrollbar {
    display: none; /* Chrome Safari */
  }
}

.dot {
  position: absolute;
  padding: 10px;
  background: black;
  border-radius: 50%;
  left: 30px;
  top: 9px;
  z-index: 999;
}

.main {
  overflow: hidden;
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none; /* Chrome Safari */
  }
}
</style>
