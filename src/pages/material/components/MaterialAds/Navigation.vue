<!-- 
  示例用法: <back-history title="消息中心"></back-history>
  示例用法: <back-history prevTitle="我的"></back-history>
  示例用法: <back-history largeTitle="我的资料"></back-history>
  示例用法: <back-history prevTitle="我的" largeTitle="我的资料"></back-history>
 -->

<template>
  <div
    class="navigation"
    :style="{
      minHeight: containerHeight + 'px'
    }"
  >
    <div :class="{'navigation-fixed': fixed}" ref="containerFixedDom">
      <div class="navigation-wrapper" :style="{
        background: transparent ? 'none':'rgba(255,255,255,.8)',
        backdropFilter: transparent ? 'none':'blur(10px)'
      }">
        <div class="icon-wrapper" @click="handleClick" :style="style">
          <svg t="1584581098225" class="icon" viewBox="0 0 1024 1024" :fill="this.color" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2379" width="20" height="20" > <path d="M497.92 165.12L422.4 89.6 0 512l422.4 422.4 75.52-75.52L151.04 512z" p-id="2380" ></path> </svg>
        </div>
        <h3 class="title-prev" v-if="!title" :style="style">{{ prevTitle }}</h3>

        <h1 v-show="title" class="titled" :style="style">
          {{ title }}
        </h1>
        <h1
          class="titled"
          :style="{
            transform: `translate(${!showLargeTitle ? '0' : '-30px,30px'})`,
            opacity: showLargeTitle ? 0 : 1
          }"
        >
          {{ largeTitle }}
        </h1>
        <div class="toolbar">
          <slot></slot>
        </div>
      </div>

      <h1
        v-show="largeTitle"
        class="title-large"
        :style="{
          ...style,
          opacity: showLargeTitle ? 1 : 0,
          transform: `translate(${
            largeTitle && showLargeTitle ? 0 : '30px,-30px'
          })`,
          background: transparent ? 'none':'white'
        }"
      >
        {{ largeTitle }}
      </h1>
    </div>
  </div>
</template>

<script>
export default {
  name: 'navigation',
  data() {
    return {
      containerHeight: 60,
      showLargeTitle: true
    }
  },
  props: {
    title: String,
    prevTitle: String,
    largeTitle: String,
    color: String,
    onClick: Function,
    transparent: Boolean,
    fixed: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
      if(history.length<=1) this.$router.push('/home')
    },
    handleClick() {
      if (this._events.click) {
        this.$emit('click')
      } else {
        this.goBack()
      }
    },
    /**
     * @desc 获取fixed容器的高度并赋值给父文档流容器
     */
    setContainerHeight() {
      const containerFixedDom = this.$refs.containerFixedDom
      const fixedHeight = parseFloat(
        getComputedStyle(containerFixedDom).getPropertyValue('height')
      )
      this.containerHeight = fixedHeight
    },
    /**
     * @desc 滚动处理
     */
    handleScroll() {
      if (scrollY > 15) {
        this.showLargeTitle = false
        this.$emit('switchTitle', this.showLargeTitle)
      } else if(scrollY < 10){
        this.showLargeTitle = true
        this.$emit('switchTitle', this.showLargeTitle)
      }
    }
  },
  computed: {
    style() {
      let { color = '#170707' } = this
      return { color }
    }
  },
  mounted() {
    // 检测fixed高度并设置container高度
    this.setContainerHeight()

    window.addEventListener('scroll', this.handleScroll)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.navigation {
  position: relative;
  z-index: 10;
  border-bottom: 1px solid whitesmoke;
}

.navigation-fixed {
  position: fixed;
  width: 100%;
}

.navigation-wrapper {
  -webkit-tap-highlight-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 15px;
  height: 70px;
  padding-top: 16px;
  font-size: 20px;
  background: white;
  z-index: 2;
  position: relative;
  transition: .4s;
}

.icon-wrapper {
  width: 44px;
  height: 100%;
  padding-left: 6px;
  position: absolute;
  left: 15px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
}

.titled {
  color: #170707;
  font-weight: 500;
  position: absolute;
  transition: 0.2s;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  box-sizing: border-box;
  max-width: 70vw;
  font-size: 20px;
  max-width: 70%;
}
.title-prev {
  color: rgba(0, 0, 0, 0.6);
  font-size: 16px;
  font-weight: 500;
  margin-right: auto;
  margin-left: 26px;
}

.title-large {
  padding: 0 15px;
  text-align: left;
  font-size: 24px;
  color: #170707;
  font-weight: bold;
  margin-bottom: 20px;
  background: white;
  overflow: hidden;
  transition: 0.2s;
}
.toolbar {
  margin-left: auto;
}
</style>
