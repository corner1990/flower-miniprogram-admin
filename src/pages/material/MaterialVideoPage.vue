<template>
  <div class="MaterialVideoPage">
    <Block title="发布短视频">
      <el-form :model="form" :rules="rules" ref="form" style="max-width: 600px;">
        <!-- 视频上传 -->
        <FormItem required title="视频上传">
          <el-form-item prop="video">
            <el-upload
              action="#"
              :on-success="handleVideoSuccess"
              :on-remove="handleVideoRemove"
              :on-change="handleVideoChange"
              :http-request="uploadVideo"
              :on-error="()=>$message.error('上传视频失败，请重新上传')"
              :limit="1"
              drag
              name="video"
              accept="video/*"
            >
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">
                将视频文件拖到此处，或
                <em>点击上传</em>
              </div>
              <div slot="tip" class="el-upload__tip">时长小于6分钟，视频大小不超过15M</div>
            </el-upload>
          </el-form-item>
        </FormItem>

        <!-- 视频 -->
        <FormItem title="视频标题">
          <el-form-item prop="title">
            <el-input
              v-model="form.content"
              class="medium"
              show-word-limit
              placeholder="输入标题"
              size="medium"
            ></el-input>
          </el-form-item>
        </FormItem>

        <!-- 封面图片 -->
        <!-- <FormItem title="封面图片" >
          <el-form-item prop="cover">
            <el-upload
              :action="uploadOssFileURL"
              :on-success="handleCoverSuccess"
              :on-remove="handleCoverRemove"
              :on-error="()=>$message.error('上传封面失败，请重新上传')"
              :limit="1"
              accept="image/*"
              list-type="picture"
              drag
            >
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">
                将图片文件拖到此处，或
                <em>点击上传</em>
              </div>
              <div slot="tip" class="el-upload__tip">建议尺寸 800*800，最多5张，单个图片不超过20M。</div>
            </el-upload>
          </el-form-item>
        </FormItem>-->

        <!-- 二选一 -->
        <el-radio v-model="form.isSuperProduct" :label="false">对应IP</el-radio>
        <el-radio v-model="form.isSuperProduct" :label="true">对应超级商品</el-radio>
        <!-- 对应IP -->
        <FormItem title="选择对应IP" :required="!form.isSuperProduct">
          <el-form-item prop="selectedIp">
            <el-select
              v-model="form.selectedIp"
              filterable
              remote
              :remote-method="loadIp"
              placeholder="输入IP关键字搜索"
              size="medium"
              :disabled="form.isSuperProduct"
            >
              <el-option
                v-for="(star,index) in form.ipList"
                :key="index"
                :label="star.content"
                :value="star.id"
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
              placeholder="输入商品关键字搜索"
              size="medium"
              :disabled="!form.isSuperProduct"
            >
              <el-option
                v-for="(product,index) in form.productList"
                :key="index"
                :label="product.content"
                :value="product.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </FormItem>

        <!-- 视频介绍 -->
        <FormItem title="视频介绍" required>
          <el-form-item>
            <el-input
              v-model="form.introduce"
              label="视频介绍:"
              label-width="80px"
              type="textarea"
              size="medium"
              maxlength="100"
              :rows="4"
              show-word-limit
              placeholder="输入文案"
            ></el-input>
          </el-form-item>
        </FormItem>

        <!-- 是否用马甲号发布 -->
        <el-form-item label="是否用马甲号发布" style="margin-top: 20px">
          <el-switch v-model="form.isFake" active-text="是" inactive-text="否" />
        </el-form-item>
      </el-form>

      <el-button
        size="medium"
        type="primary"
        @click="handleClickUpload"
        :loading="loading"
        icon="el-icon-s-promotion"
      >发布内容</el-button>
      <el-button size="medium" type icon="el-icon-brush" @click="handleClickReset">清空</el-button>
    </Block>
  </div>
</template>

<script>
import { getStarIpList, createStarMaterielFeed, uploadOssFileURL, getSuperProductList, auditMedia } from '../material/api'
import Block from './components/MaterialAds/Block'
import FormItem from './components/FormItem.vue'
import path from 'path-browserify'
import upload from '../../utils/upload'

export default {
  name: 'MaterialVideoPage',
  components: {
    Block,
    FormItem
  },
  data() {
    return {
      uploadOssFileURL,
      form: {
        video: null,
        videoFile: null,
        title: '',
        cover: '',
        isSuperProduct: false,
        selectedIp: '',
        ipList: [],
        selectedProduct: '',
        productList: '',
        introduce: '',
        isFake: true
      },
      loading: false,
      upload: null
    }
  },
  methods: {
    handleVideoSuccess(file, fileList) {
      this.form.video = file
    },
    handleVideoRemove(file, fileList) {
      this.form.video = file
    },
    handleCoverSuccess(file, fileList) {
      this.form.cover = file
    },
    handleCoverRemove(file, fileList) {
      this.form.cover = file
    },
    handleVideoChange(file) {
      this.form.videoFile = file
    },
    // uploader() {
    //   new upload({
    //     success(option) {
    //       // 上传成功
    //       params.onSuccess()
    //       console.log(option)
    //     },
    //     progress(option) {
    //       // 上传进度
    //       console.log('progress', option)
    //     }
    //   })
    // },
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
    async uploadVideo(params) {
      const { file } = params
      this.form.video = file
      this.upload.addFile(params)
      this.upload.autoUpload()
    },
    // 发布
    async handleClickUpload() {
      if(!this.upload.videoId) return this.$message.error('请上传视频')
      // if (!this.form.video) return this.$message.error('请上传视频')
      this.$refs.form.validate(async valid => {
        if (!valid) return this.$message.error('请填写完整')

        const file_name = this.form.videoFile.name
        const file_size = this.form.videoFile.size

        const star_id = this.form.selectedIp
        const sku_id = this.form.selectedProduct
        const content = this.form.introduce
        const video_id = this.upload.videoId
        const is_fake = this.form.isFake

        this.loading = true
        const { errorCode, data } = await auditMedia({ file_name, file_size, title: 'Super Video' })
        if (errorCode !== 0) return
        if (errorCode === 0) {
          const { errorCode, data } = await createStarMaterielFeed({ star_id, content, sku_id, video_id, is_fake })
          this.loading = false
          if (errorCode === 0) {
            this.$message.success('发布成功')
          }
        }
      })
    },
    // 清空
    handleClickReset() {
      this.form = {
        video: '',
        title: '',
        cover: '',
        selectedIp: '',
        ipList: [],
        selectedProduct: '',
        productList: '',
        introduce: '',
        isFake: true
      }
    }
  },
  computed: {
    rules() {
      return {
        // title: [ { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'change' } ],
        selectedIp: [{ required: !this.form.isSuperProduct, message: '请选择对应IP', trigger: 'blur' }],
        selectedProduct: [{ required: this.form.isSuperProduct, message: '请选择对应商品', trigger: 'blur' }]
      }
    }
  },
  watch: {
    'form.isSuperProduct'() {
      this.form.selectedIp = ''
      this.form.selectedProduct = ''
    }
  },
  mounted() {
    this.loadIp()
    this.loadProduct()
    this.upload = new upload()
  }
}
</script>


<style lang="less" scoped>
</style>
