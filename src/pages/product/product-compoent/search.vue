<template>
  <div class="product-search">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="商品名称">
        <el-input v-model="formInline.name" placeholder="商品名称"></el-input>
      </el-form-item>

      <!--      <el-form-item label="商品类型" >-->
      <!--        <el-select v-model="formInline.group" placeholder="商品类型">-->
      <!--          <el-option label="全部" value="all"></el-option>-->
      <!--          <el-option label="虚拟" value="onLine"></el-option>-->
      <!--          <el-option label="非虚拟" value="offLine"></el-option>-->
      <!--        </el-select>-->
      <!--      </el-form-item>-->
      <!-- <el-form-item label="商品状态" style="margin-left: 72px;">
        <el-select v-model="formInline.publish_type" placeholder="商品类型">
          <el-option label="全部" value=""></el-option>
          <el-option label="上架" value="1"></el-option>
          <el-option label="下架" value="2"></el-option>
        </el-select>
      </el-form-item> -->
      <el-form-item label="价格区间">
        <el-input placeholder v-model="formInline.price_min" style="width: 150px;">
          <template slot="prepend">&yen;</template>
        </el-input>
      </el-form-item>
      <el-form-item label>
        <i class="el-icon-minus"></i>
      </el-form-item>
      <el-form-item label>
        <el-input placeholder v-model="formInline.price_max" style="width: 150px;">
          <template slot="prepend">&yen;</template>
        </el-input>
      </el-form-item>
      <!-- <br /> -->
      <el-form-item >
        <el-button type="primary" @click="onSubmit">筛选</el-button>
        <!-- <el-button type="plan" @click="OnExport">导出</el-button>
        <el-button type="text">查看已导出列表</el-button>-->
        <el-button type="text" @click="resetSearch">重置筛选条件</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'product-search',
  props: {
    msg: String
  },
  data() {
    return {
      formInline: {
        name: '',
        kind: '',
        group: '',
        price_min: '',
        price_max: ''
      }
    }
  },
  methods: {
    onSubmit() {
      this.$emit('search', this.formInline, 'search')
    },
    resetSearch() {
      this.formInline = {
        name: '',
        kind: '',
        group: '',
        publish_type: '',
        price_min: '',
        price_max: ''
      }
      this.$emit('search', this.formInline, 'reset')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.product-search {
  & {
    background: #fff;
    padding: 15px;
  }
  .price-wrap {
    display: flex;
  }
}
</style>
