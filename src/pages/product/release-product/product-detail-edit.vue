<template>
  <div class="base-info">
    <h3 class="item-title">商详编辑</h3>
    <el-form
      :label-position="labelPosition"
      label-width="80px"
      class="base-form"
    >
      <el-form-item label="商详图片" required>
        <el-upload
          action="#"
          :limit="5"
          :file-list="fileList"
          :on-change="handleChange"
          :auto-upload="false"
          multiple
          drag
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
                  @click="handleRemove(file)"
                >
                  <i class="el-icon-delete"></i>
                </span>
              </span>
            </div>
        </el-upload>
      </el-form-item>
    </el-form>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
import {
  // getOssSign
  uploadBase64Image
} from '../api'
// import md5 from '@/utils/md5'
// import OSS from 'ali-oss'
export default {
  name: 'base-info',
  props: {
    editInfo: Object
  },
  data() {
    return {
      labelPosition: 'right',
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      fileList: [],
      client: null,
      upload: [],
      isUploadind: false,
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!');
    },
    handleRemove(file) {
      this.fileList = this.fileList.filter(item => item.uid !== file.uid)
    },
    handleChange(file, fileList) {
      this.fileList = fileList;
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
    async uploadImg() {
      let file = this.upload.shift()
      let uploadFile = file.image
      this.isUploadind = true
      try {
        let { errorCode, data } = await uploadBase64Image({file_base_64: uploadFile})
        this.isUploadind = false
        this.autoUpLoad()
        if (errorCode === 0) {
          // file.url = data
          file.requestUrls = data
          return false
        } else {
          this.$message.error('图片上传失败，请重新上传');
          let fileList = this.fileList.filter(item => item !== file)
          this.fileList = fileList
        }

      } catch(err) {
        console.log('err', err)
        this.isUploadind = false
        this.autoUpLoad()
        this.$message.error('图片上传失败，请重新上传');
        let fileList = this.fileList.filter(item => item !== file)
        this.fileList = fileList
      }
      
      
      // 处理文件名
      // let imgName = md5(`${file.uid}-${file.name}`)
      // let imgKey = `ipxmall/${imgName}`
      // let uploadFile = file.image
     
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
    autoUpLoad() {
      if (this.isUploadind) return false
      this.$nextTick(() => {
        if (this.upload.length) this.uploadImg()
      })
    },
    /**
     * @desc 剪贴图片
     */
    cutImg(file) {
      let el = document.createElement('img')
      el.style.position = 'absolute'
      el.style.left = '-300000px'

      el.src= file.url
      // let maxWidth = 1920
      // let maxWidth = 500
      el.addEventListener('load', () => {
        let { width, height } = el
        
        // if (width > maxWidth) {
        //   height = Math.round((maxWidth / width * height))
        //   width = maxWidth
        // }
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
      // 有图片上传时给一个15秒的延时
      this.upload.push(file)
      this.autoUpLoad()
    },
    /**
     * @desc 编辑时初始化数据
     */
    initInfo() {
      let infoStr = window.sessionStorage.getItem('$editInfo')
      if (!infoStr) {
        return false
      }
      let { detail = {} } = JSON.parse(infoStr)
      
      this.fileList = detail.detail_list.map(item => {
        return {...item, url: item.content}
      })
    }
  },
  computed: {
    /**
     * @desc 是否是编辑状态
     */
    isEdit() {
      return /edit-product/.test(this.$route.path)
    }
  },
  watch: {
    editInfo: {
      deep: true,
      handler() {
        this.initInfo()
      }
    },
    fileList: {
      deep: true,
      handler(fileList) {
        this.$emit('update', 'description', fileList)
      }
    }
  },
  mounted(){
    // this.getSign()
    if (this.isEdit) {
      this.initInfo()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.base-info{
  &{
    background: #fff;
    padding: 0 15px 15px;
  }
  .el-upload-dragger{
    width: auto;
    height: auto;
  }
  .item-title{
    &{
      line-height: 32px;
      background: #eee;
      font-size: 16px;
    }
    &::before{
      content: "";
      display: inline-block;
      height: 16px;
      width: 4px;
      background: blue;
      vertical-align: middle;
      margin-top: -4px;
      margin: 10px;
    }
  }
  .base-form{
    margin-top: 16px;
    width: 600px;
    .medium{
      width: 216px;
    }
  }
}
</style>
<style lang="less">
.base-info{
  .el-upload-dragger{
    width: auto;
    height: auto;
    border: none;
  }
}
</style>
