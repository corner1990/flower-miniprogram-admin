<template>
  <div class="create-banner">
   <el-dialog
      :visible="show"
      width="540px"
      :title="title"
      :close="cancel"
    >
      <el-form
        :label-position="labelPosition"
        label-width="100px"
        ref="bannerForm"
        class="base-form"
        :model="formInfo"
        :rules="rules"
      >
        <el-form-item label="banner链接" prop="link">
          <el-input class="medium" v-model="formInfo.link">
          </el-input>
        </el-form-item>
        <el-form-item label="banner描述" prop="title">
           <el-input class="medium" v-model="formInfo.title">
          </el-input>
        </el-form-item>
         <el-form-item label="banner排序" prop="sort">
           <el-input class="medium" v-model="formInfo.sort" placeholder="请输入1,2,3,4... 等顺序数字">
          </el-input>
        </el-form-item>
        <el-form-item label="banner场景" prop="space_id">
          <el-select v-model="formInfo.space_id" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
       
        <el-form-item label="banner图片" prop="main_image">
          <el-upload
            action="#"
            :file-list="formInfo.image"
            :limit="1"
            :on-change="mainHandleChange"
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
import { uploadBase64Image } from '../../product/api'
// import md5 from '@/utils/md5'
// import OSS from 'ali-oss'
import { createBanner, updateBanner } from '../api'

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
        title: '',
        link: '',
        sort: 1,
        space_id: '0'
      },
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      rules:{
        link: [
          { required: true, message: '请输入Banner链接', trigger: 'blur' }
        ],
        title: [
          { required: true, message: '请选择Banner描述', trigger: 'blur' }
        ],
        image: [
          { required: true, message: '请上传Banner图', trigger: 'blur' }
        ],
        
      },
      options: [
        {
          value: '0',
          label: '首页banner',
        },
        {
          value: '1',
          label: '包月鲜花',
        },
        {
          value: '2',
          label: '礼品鲜花'
        }
      ]
    }
  },
  computed: {
    title() {
      let title = '创建banner'
      if (this.syncInfo) {
        title = '编辑banner'
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
        title: '',
        link: '',
        sort: ''
      }
      this.$emit('update', 'showEdit', false)
      this.$emit('update', 'editInfo', null)
    },
    /**
     * @desc 保存商品图片
     */
    mainHandleChange(file) {
      this.formInfo.image = [file];
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
      // canvas.toBlob( blob => {
      //   file.image = blob

      //   this.uploadImg(file)
      // }, 'image/jpeg', '0.8')

      file.image = canvas.toDataURL('image/jpeg', 0.71)
      // 上传图片
      this.uploadImg(file)
    },
    /**
     * @desc 获取签名
     */
    // async getSign() {
    //   let { errorCode, data } = await getOssSign()
    //   if (errorCode === 0) {
    //     this.sign = data
    //     let {
    //       securityToken,
    //       accessKeyId,
    //       accessKeySecret,
    //       bucket,
    //       endpoint
    //     } = data
    //     // 创建实例
    //     let client  = new OSS({
    //       endpoint,
    //       accessKeyId,
    //       accessKeySecret,
    //       bucket,
    //       stsToken: securityToken
    //     })
    //     this.client  = client 
    //   }
      
    // },
    /**
     * 上传图片
     * @param data
     */
    async uploadImg(file) {      
      let uploadFile = file.image
      let { errorCode, data } = await uploadBase64Image({file_base_64: uploadFile})
      if (errorCode === 0) {
        file.requestUrls = data
      }
    },
    /**
     * @desc 编辑时初始化数据
     */
    initInfo() {
      let { syncInfo } = this
      if (!syncInfo) return false
      let {
        data
      } = syncInfo
      let keys = ['link', 'sort', 'title']
      keys.map(key => {
        this.formInfo[key] = syncInfo[key]
      })
      // 处理图片
      if (data) {
        data = JSON.parse(data)
        this.formInfo.image = [{url: data.image}]
      }
    },
    /**
     * @desc 验证
     */
    vertiry() {
      this.$refs.bannerForm.validate(vaild => {
        if (!vaild) return false
        if (this.formInfo.image.length === 0) {
          return this.$message.error('请上传banner图片');
        }
        let {
          title,
          link,
          sort,
          image,
          space_id
        } = this.formInfo
        if (sort === '') {
          sort = 10
        }
        let img = this.getImgSrc(image)[0]
        let params = {
          title,
          link,
          sort,
          space_id,
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
      let { id } = this.syncInfo
      let { errorCode } = await updateBanner({...params, id})
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
