<template>
  <div class="product-about">
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item title="规格参数" name="1">
        <div v-for="(arr, key) in specifications" :key="key">
          {{arr[0]}}: {{arr[1]}}
        </div>
      </el-collapse-item>
      <el-collapse-item title="品牌故事" name="2">
        <div>{{info.brand_story}}</div>
      </el-collapse-item>
       <el-collapse-item title="保养说明" name="2">
        <div>{{info.care_instructions}}</div>
      </el-collapse-item>
      <el-collapse-item title="运输说明" name="3">
        <div>{{info.logistics_desc}}</div>
      </el-collapse-item>
      <el-collapse-item title="退换货说明" name="4">
        <div>{{info.after_sale_instructions}}</div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'product-about',
  data() {
    return {
      activeNames: []
    };
  },
  methods: {
    handleChange(val) {
      console.log(val);
    }
  },
  computed: {
    ...mapState('product', ['info']),
    specifications() {
      
      let spec = this.info.specifications
      
      if (!spec) return false
      spec = JSON.parse(spec)
      
      // 返回数据
      return spec.map(item => {
        let key = Object.keys(item)[0]
        return [key, item[key]]
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.product-about{
  padding: 0 12px;
  .el-collapse-item__header{
    box-shadow: 0 0 8px #eee;
  }
}
</style>
<style  lang="less">
.product-about{
  .el-collapse-item{
    margin-bottom: 10px;
  }
  .el-collapse-item__header{
    box-shadow: 0 0 8px #eee;
    border: 0;
    padding-left: 10px;
  }
  .el-collapse-item__wrap{
    box-shadow: 8px 0 8px #eee;
    border: 0;
    padding: 10px;
    border-radius: 0 0 8px 8px;
  }
  .el-collapse{
    border: 0;
  }
}
</style>