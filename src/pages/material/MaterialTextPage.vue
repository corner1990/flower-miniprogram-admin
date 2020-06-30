<template>
  <Block title="发布纯文字内容">
    <el-form ref="form" style="max-width: 600px;" :model="form" :rules="rules">
      <!-- 文字内容 -->
      <FormItem title="文字内容" required>
        <el-form-item prop="content">
          <el-input
            v-model="form.content"
            type="textarea"
            maxlength="500"
            show-word-limit
            placeholder="输入文案"
          ></el-input>
        </el-form-item>
      </FormItem>

      <!-- 二选一 -->
      <el-radio v-model="form.isSuperProduct" :label="false">对应IP</el-radio>
      <el-radio v-model="form.isSuperProduct" :label="true">对应超级商品</el-radio>
      <!-- 对应IP -->
      <FormItem title="对应IP" :required="!form.isSuperProduct">
        <el-form-item prop="selectedIp">
          <el-select
            v-model="form.selectedIp"
            filterable
            remote
            :remote-method="loadIp"
            size="medium"
            placeholder="输入IP关键字搜索"
            :disabled="form.isSuperProduct"
          >
            <el-option
              :label="star.content"
              :value="star.id"
              v-for="(star, index) in form.ipList"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
      </FormItem>

      <!-- 对应商品 -->
      <FormItem title="对应商品" :required="form.isSuperProduct">
        <el-form-item prop="selectedProduct">
          <el-select
            v-model="form.selectedProduct"
            filterable
            remote
            :remote-method="loadProduct"
            size="medium"
            placeholder="输入商品关键字搜索"
            :disabled="!form.isSuperProduct"
          >
            <el-option
              v-for="(product, index) in form.productList"
              :key="index"
              :label="product.content"
              :value="product.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </FormItem>

      <!-- 是否用马甲号发布 -->
      <el-form-item label="是否用马甲号发布" style="margin-top: 20px">
        <el-switch v-model="form.isFake" active-text="是" inactive-text="否" />
      </el-form-item>
    </el-form>

    <el-button size="medium" type="primary" @click="handleClickUpload" :loading="loading" icon="el-icon-s-promotion">发布内容</el-button>
    <el-button size="medium" type icon="el-icon-brush" @click="handleClickReset">清空</el-button>
  </Block>
</template>

<script>
// import { getStarIpList } from '../material/api'
import { getStarIpList, createStarMaterielFeed, getSuperProductList } from '../material/api'
import Block from './components/MaterialAds/Block'
import FormItem from './components/FormItem.vue'

export default {
  name: 'material-text-info',
  components: {
    Block,
    FormItem
  },
  data() {
    return {
      form: {
        content: '',
        isSuperProduct: false,
        selectedIp: '',
        ipList: [],
        selectedProduct: '',
        productList: [],
        isFake: true
      },
      loading: false
    }
  },
  methods: {
    async loadIp(keyword) {
      const { errorCode, data } = await getStarIpList({ index: 0, page_size: 10, keyword })
      if (errorCode === 0) {
        this.form.ipList = data
      }
    },
    async loadProduct(keyword) {
      const { errorCode, data } = await getSuperProductList({ index: 0, page_size: 10, keyword })
      if (errorCode === 0) {
        this.form.productList = data
      }
    },
    handleClickUpload() {
      this.$refs.form.validate(async valid => {
        if (!valid) return this.$message.error('请填写完整')

        const star_id = this.form.selectedIp
        const sku_id = this.form.selectedProduct
        const content = this.form.content
        const is_fake = this.form.isFake

        const { errorCode, data } = await createStarMaterielFeed({ star_id, sku_id, content, is_fake })
        this.loading = false
        if (errorCode === 0) {
          this.$message.success('发布成功')
          console.log(data)
        }
      })
    },
    handleClickReset() {
      this.form = {
        content: '',
        selectedIp: '',
        ipList: [],
        selectedProduct: '',
        productList: [],
        isFake: true
      }
    }

  },
  computed: {
    rules() {
      return {
        content: [{ required: true, message: '请输入相应内容', trigger: 'blur' }],
        selectedIp: [{ required: !this.form.isSuperProduct, message: '请选择对应IP', trigger: 'blur' }],
        selectedProduct: [{ required: this.form.isSuperProduct, message: '请选择对应商品', trigger: 'blur' }]
      }
    }
  },
  watch: {
    'form.isSuperProduct'(){
      this.form.selectedIp = ''
      this.form.selectedProduct = ''
    }
  },
  mounted() {
    this.loadIp()
    this.loadProduct()
  }
}
</script>

<style lang="less" scoped>
.material-text-info {
  & {
    background: #fff;
    // padding: 0 15px 15px;
    padding: 15px;
  }
  .item-title {
    & {
      line-height: 32px;
      background: #eee;
      font-size: 16px;
    }
    &::before {
      content: '';
      display: inline-block;
      height: 16px;
      width: 4px;
      background: blue;
      vertical-align: middle;
      margin-top: -4px;
      margin: 10px;
    }
  }
  .material-text-form {
    margin-top: 16px;
    width: 600px;
    .medium {
      width: 216px;
    }
  }
  .btn-wrap {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 200px;
    background: #fff;
  }
}
</style>
