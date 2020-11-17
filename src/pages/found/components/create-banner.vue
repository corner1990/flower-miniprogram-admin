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
            list-type="picture-card"
            :http-request="uploadImg">
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
import {
  getOssSign,
} from '../../api'
import md5 from '@/utils/md5'
import OSS from 'ali-oss'
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
     * @desc 获取签名
     */
    async getSign() {
      let { errorCode, data } = await getOssSign()
      if (errorCode === 0) {
        this.sign = data
        let {
          securityToken,
          accessKeyId,
          accessKeySecret,
          bucket,
          endpoint
        } = data
        // 创建实例
        let client  = new OSS({
          endpoint,
          accessKeyId,
          accessKeySecret,
          bucket,
          stsToken: securityToken
        })
        this.client  = client 
      }
      
    },
    /**
     * 上传图片
     * @param data
     */
    async uploadImg(param) {
      let { file } = param
      // 处理文件名
      let imgName = md5(`${file.uid}-${file.name}`)
      let imgKey = `ipxmall/${imgName}`
       var formData = new FormData();
      formData.append("file", file);
      
      this.client.put(imgKey, file)
        .then(response => {
          // 上传完毕回调
          let res = response.res
          if (res.status === 200) {
            
            param.url = res.requestUrls
            param.onSuccess(res) 
            
          } else {
            param.onError(res)
          }
          // 图片前缀
        })
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
        if (this.formInfo.image.length === 0) {
          return this.$message.error('请上传图片');
        }
        let {
          content,
          image
        } = this.formInfo
        // if (sort === '') {
        //   sort = 10
        // }
        let img = this.getImgSrc(image)[0]
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
        if (item.response) {
          img.content = item.response.requestUrls[0]
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
    this.getSign()
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
