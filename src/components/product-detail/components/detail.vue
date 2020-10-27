<template>
  <div class="detail">
    <h4>商品详情</h4>
    <img
      v-for="(img, key) in detailList"
      :key="key"
      class="detail-img"
      :src="img.content"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'detail',
  data() {
    return {
      list: [
        {
          "type": "image",
          "content": "https://ipxcdn.jfshare.com/system/admin/4074d94e37789c08cdebf08ef2155b00.jpg"
        },
        {
          "type": "image",
          "content": "https://ipxcdn.jfshare.com/system/admin/4074d94e37789c08cdebf08ef2155b00.jpg"
        },
        {
          "type": "image",
          "content": "https://ipxcdn.jfshare.com/system/admin/4074d94e37789c08cdebf08ef2155b00.jpg"
        },
        {
          "type": "image",
          "content": "https://ipxcdn.jfshare.com/system/admin/4074d94e37789c08cdebf08ef2155b00.jpg"
        },
         {
          "type": "image",
          "content": "https://ipxcdn.jfshare.com/system/admin/e21b644a171fd9e5b3d7b9c440e6f4d5.jpg"
        }
      ]
    }
  },
  computed: {
    ...mapState('product', ['info']),
    detailList() {
      let { detail } = this.info
      let arr =[]
      if (detail) {
        arr = detail.detail_list
      }
      return arr
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import url('../../../less/main.less');
.detail{
  background-color: @white;
  padding: 12px;
  h4{
    margin-bottom: 12px;
  }
  .detail-img{
    width: 100%;
    object-fit: cover;
  }
}
</style>
