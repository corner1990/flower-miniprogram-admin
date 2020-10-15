<template>
  <div class="MaterialImagePage">
    <Block title="发布图片内容">
      <div class="main">
        <el-form style="max-width: 600px" :model="form" :rules="rules" ref="form">
          <!-- 上传图片 -->
          <FormItem title="上传图片" required>
            <el-upload
              :action="uploadOssFileURL"
              :auto-upload="true"
              :on-change="handleImageChange"
              :on-remove="handleImageRemove"
              :on-error="handleImageError"
              list-type="picture"
              :file-list="form.images"
              accept="image/*"
              :limit="9"
              multiple
              name="image"
              drag
            >
              <!-- <i class="el-icon-plus"></i> -->
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">
                将文件拖到此处，或
                <em>点击上传</em>
              </div>
              <div slot="tip" class="el-upload__tip">最多9张，单个图片不超过10M。</div>
            </el-upload>
          </FormItem>

          <!-- 标题 -->
          <FormItem title="图片标题">
            <el-form-item prop="title">
              <el-input v-model="form.title" placeholder="输入标题" size="medium"></el-input>
            </el-form-item>
          </FormItem>

          <!-- 二选一 -->
          <el-radio v-model="form.isSuperProduct" :label="false">对应IP</el-radio>
          <el-radio v-model="form.isSuperProduct" :label="true">对应超级商品</el-radio>
          <!-- 选择IP -->
          <FormItem title="选择对应IP" :required="!form.isSuperProduct">
            <el-form-item prop="selectedIp">
              <el-select
                v-model="form.selectedIp"
                placeholder="请选择对应的IP"
                clearable
                filterable
                size="medium"
                remote
                :remote-method="handleRemoteIp"
                :disabled="form.isSuperProduct"
              >
                <div>
                  <el-option
                    v-for="(item, index) in form.ipList"
                    :key="index"
                    :label="item.content"
                    :value="item.id"
                  />
                </div>
              </el-select>
            </el-form-item>
          </FormItem>

          <!-- 选择对应商品 -->
          <FormItem title="选择对应商品" :required="form.isSuperProduct">
            <el-form-item prop="selectedProduct">
              <el-select
                v-model="form.selectedProduct"
                placeholder="请选择对应的商品"
                clearable
                filterable
                size="medium"
                remote
                :remote-method="handleRemoteProduct"
                :disabled="!form.isSuperProduct"
              >
                <el-option
                  v-for="(item, index) in form.productList"
                  :key="index"
                  :label="item.content"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </FormItem>

          <!-- 介绍 -->
          <FormItem title="图片介绍" required>
            <el-input
              type="textarea"
              :rows="4"
              placeholder="输入文案"
              v-model="form.introduce"
              maxlength="100"
              show-word-limit
            ></el-input>
          </FormItem>

          <!-- 是否用马甲号发布 -->
          <el-form-item label="是否用马甲号发布" style="margin-top: 20px">
            <el-switch v-model="form.isFake" active-text="是" inactive-text="否" />
          </el-form-item>

          <el-button size="medium" type="primary" @click="handleClickUpload" :loading="loading" icon="el-icon-s-promotion">发布内容</el-button>
          <el-button size="medium" type icon="el-icon-brush" @click="handleClickReset">清空</el-button>
        </el-form>
      </div>
    </Block>
  </div>
</template>

<script>
import Block from './components/MaterialAds/Block.vue'
// import { Box } from 'vue-raw-ui'
import { createStarMaterielFeed, uploadOssFileURL, getStarIpList, getSuperProductList } from './api'
import FormItem from './components/FormItem.vue'

export default {
  name: 'MaterialImagePage',
  components: {
    Block,
    // Box,
    FormItem
  },
  data() {
    return {
      uploadOssFileURL,
      form: {
        images: [],
        title: '',
        isSuperProduct: false,
        selectedIp: '',
        ipList: [],
        selectedProduct: '',
        productList: [],
        introduce: '',
        isFake: true
      },
      loading: false
    }
  },
  methods: {
    // 添加图片文件
    handleImageChange(file, fileList) {
      this.form.images = fileList
    },
    // 删除图片文件
    handleImageRemove(file, fileList) {
      this.form.images = fileList
    },
    // 上传错误
    handleImageError() {
      this.$message.error('上传图片失败，请重新上传')
    },
    // 获取IP
    async handleRemoteIp(keyword) {
      const { errorCode, data } = await getStarIpList({ index: 0, page_size: 10, keyword })
      if (errorCode === 0) {
        this.form.ipList = data
      }
    },
    // 获取Product
    async handleRemoteProduct(keyword) {
      const { errorCode, data } = await getSuperProductList({ index: 0, page_size: 10, keyword })
      if (errorCode === 0) {
        this.form.productList = data
      }
    },
    // 发布
    async handleClickUpload() {
      if (!this.imageList) return this.$message.error('请至少上传一张图片')
      this.$refs.form.validate(async valid => {
        if (!valid) return this.$message.error('请填写完整')

        const star_id = this.form.selectedIp
        const sku_id = this.form.selectedProduct
        const content = this.form.introduce
        const image_list = this.imageList
        const is_fake = this.form.isFake

        this.loading = true
        const { errorCode, data } = await createStarMaterielFeed({ star_id, content, sku_id, image_list, is_fake })
        this.loading = false
        if (errorCode === 0) {
          this.$message.success('发布成功')
          console.log(data)
        }
      })
    },
    // 清空
    handleClickReset() {
      this.form = {
        images: [],
        title: '',
        selectedIp: '',
        ipList: [],
        selectedProduct: '',
        productList: [],
        introduce: '',
        isFake: true
      }
    }
  },
  computed: {
    // 上传给后台的数据格式
    imageList() {
      if (!this.form.images.length) return false
      return this.form.images.map(item => ({
        image: item.response.data[0]
      }))
    },
    rules(){
      return {
        // title: [{ min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'change' }],
        introduce: [{ required: true, message: '请填写图片介绍', trigger: 'change' }],
        selectedIp: [{ required: !this.form.isSuperProduct, message: '请选择对应IP', trigger: 'change' }],
        selectedProduct: [{ required: this.form.isSuperProduct, message: '请选择对应商品', trigger: 'change' }]
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
    this.handleRemoteIp()
    this.handleRemoteProduct()
  }
}
</script>

<style lang="less" scoped>
// .main {
//   max-width: 400px;
//   margin-top: 20px;
// }
</style>
