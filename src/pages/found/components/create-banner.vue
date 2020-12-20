<template>
  <div class="create-banner">
   <el-dialog
      :visible="show"
      width="540px"
      :title="title"
      @close="cancel"
    >
      <el-form
        :label-position="labelPosition"
        label-width="100px"
        ref="bannerForm"
        class="base-form"
        :model="formInfo"
        :rules="rules"
      >
        <!-- <el-form-item label="banner链接" prop="link">
          <el-input class="medium" v-model="formInfo.link">
          </el-input>
        </el-form-item> -->
        <el-form-item label="描述文案" prop="content">
           <el-input
            class="medium"
            v-model="formInfo.content"
            type="textarea"
            :rows="2"
           >
          </el-input>
        </el-form-item>
         <!-- <el-form-item label="banner排序" prop="sort">
           <el-input class="medium" v-model="formInfo.sort">
          </el-input>
        </el-form-item> -->
       
        <el-form-item label="展示图片" prop="image">
          <el-upload
            action="#"
            :file-list="formInfo.image"
            :limit="1"
            :on-change="mainHandleChange"
            :auto-upload="false"
            list-type="picture-card">
              <i slot="default" class="el-icon-plus"></i>
              <div slot="file" slot-scope="{file}">
                <img
                  class="el-upload-list__item-thumbnail"
                  :src="file.url" alt=""
                >
                <span class="el-upload-list__item-actions">
                  <span
                    class="el-upload-list__item-preview"
                    @click="handlePictureCardPreview(file)"
                  >
                    <i class="el-icon-zoom-in"></i>
                  </span>
                  <span
                    v-if="!disabled"
                    class="el-upload-list__item-delete"
                    @click="handleDownload(file)"
                  >
                    <i class="el-icon-download"></i>
                  </span>
                  <span
                    v-if="!disabled"
                    class="el-upload-list__item-delete"
                    @click="handleRemove(file, 'main_image')"
                  >
                    <i class="el-icon-delete"></i>
                  </span>
                </span>
              </div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div class="btn-wrap">
        <el-button class="close-btn" @click="cancel">取消</el-button>
        <el-button type="primary" @click="vertiry">{{title}}</el-button>
      </div>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
    </el-dialog>
  </div>
</template>

<script>
// import {
//   getOssSign,
// } from '../../api'
// import md5 from '@/utils/md5'
// import OSS from 'ali-oss'
import { createBanner, updateBanner } from '../api'
import { uploadBase64Image } from '../../product/api'

export default {
  name: 'create-banner',
  props: {
    show: {
      type: Boolean,
      default: true
    },
    info: {
      type: [Object, null],
      default() {
        return null
      }
    }
  },
  data() {
    return {
      labelPosition: 'right',
      formInfo: {
        image: [],
        content: '',
        link: '',
        sort: ''
      },
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      rules:{
        content: [
          { required: true, message: '请输入文字描述', trigger: 'blur' }
        ],
        image: [
          { required: true, message: '请上传展示图片', trigger: 'blur' }
        ]
        
      }
    }
  },
  computed: {
    title() {
      let title = '创建发现页内容'
      if (this.syncInfo) {
        title = '编辑内容'
      }
      return title
    },
    syncInfo() {
      return this.info
    }
  },
  methods: {
    /**
     * @desc 隐藏窗口
     */
    cancel() {
      this.formInfo = {
        image: [],
        content: ''
      }
      this.$emit('update', 'showEdit', false)
      this.$emit('update', 'editInfo', null)
    },
    /**
     * @desc 保存商品图片
     */
    mainHandleChange(file, fileList) {
      this.formInfo.image = fileList;
      this.cutImg(file)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleDownload(file) {
      console.log(file);
    },
    beforeUpload() {
      return false 
    },
    handleRemove() {
      this.formInfo.image = []
    },
    /**
     * 上传图片
     * @param data
     */
    async uploadImg(file) {
      // 处理文件名
      // let imgName = md5(`${file.uid}-${file.name}`)
      // let imgKey = `ipxmall/${imgName}`
      let uploadFile = file.image
      try {
        let { errorCode, data } = await uploadBase64Image({file_base_64: uploadFile})
        
        if (errorCode === 0) {
          file.requestUrls = data
        } else {
          this.formInfo.image = []
          this.$message.error('图片上传失败，请重新上传2');
        }

      } catch(err) {
        console.log('err', err)
        this.formInfo.image = []
        this.$message.error('图片上传失败，请重新上传1');
      }
      // this.client.put(imgKey, uploadFile)
      //   .then(response => {
      //     // 上传完毕回调
      //     let res = response.res
      //     if (res.status === 200) {
      //       file.requestUrls = res.requestUrls
      //       // param.onSuccess(res) 
      //     } else {
      //       // param.onError(res)
      //     }
      //     // 图片前缀
      //   })
    },
    /**
     * @desc 剪贴图片
     */
    cutImg(file) {
      let el = document.createElement('img')
      el.style.position = 'absolute'
      el.style.left = '-300000px'

      el.src= file.url
      let maxWidth = 1920
      // let maxWidth = 500
      el.addEventListener('load', () => {
        let { width, height } = el
        
        if (width > maxWidth) {
          height = Math.round((maxWidth / width * height))
          width = maxWidth
        }
        this.drawImg(el, width, height, file)
      })
    },
    /**
     * @desc canvas 渲染图片
     */
    drawImg(img, width, height, file) {
      let canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = height
      let ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0,width, height)

      file.image = canvas.toDataURL('image/jpeg', 0.71)
      // 上传图片
      this.uploadImg(file)
    },
    /**
     * @desc 编辑时初始化数据
     */
    initInfo() {
      let { syncInfo } = this
      if (!syncInfo) return false
      let detail = syncInfo.feed_detail
      // 处理图片
      let image = detail.image_list.map( img => ({ ...img, url: img.image }))
      this.formInfo = {
        image,
        content: detail.description
      }
    },
    /**
     * @desc 验证
     */
    vertiry() {
      this.$refs.bannerForm.validate(vaild => {
        if (!vaild) return false
        let {
          content,
          image
        } = this.formInfo
        if (image.length === 0) {
          return this.$message.error('请上传图片');
        }
        
        
        // if (sort === '') {
        //   sort = 10
        // }
        let img = this.getImgSrc(image)[0]
        let isUpladed = [img?.content].every(item => { return item && !item.includes('blob:') })
        if (!isUpladed) {
          this.$message.error('图片上传中，请稍后再试');
          return false
        }
        let params = {
          content,
          image: img.content
        }
        // 编辑
        if (this.syncInfo) {
          this.updateBannerFn(params)
          return false
        }
        this.createBannerFn(params)
      })
    },
    /**
     * @desc 获取图片列表
     */
    getImgSrc(fileList = []) {
      if(!fileList.length) return ''
      return fileList.map((item, id) => {
        let img = {
          id,
          type: 'image',
        }
        if (item.requestUrls) {
          img.content = item.requestUrls
        } else {
          img.content = item.url
        }
        
        return img
      })
    },
    async createBannerFn(params) {
      let { errorCode } = await createBanner(params)
      if (errorCode === 0) {
        this.$emit('refresh')
        this.cancel()
      }
    },
    /**
     * @desc 更新banner
     */
    async updateBannerFn(params) {
      let { feed_id } = this.syncInfo.feed_base_info
      let { errorCode } = await updateBanner({...params, feed_id })
      if (errorCode === 0) {
        this.$emit('refresh')
        this.cancel()
      }
    }
  },
  watch: {
    show(show) {
      if (!show) return false
      this.initInfo()
    }
  },
  mounted() {
    // this.getSign()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.create-banner{
  .btn-wrap{
    text-align: center;
  }
  .close-btn{
    width: 115px;
  }
}
</style>
