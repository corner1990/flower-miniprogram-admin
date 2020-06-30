<template>
  <Block title="上传图片">
    <el-form
      :label-position="labelPosition"
      label-width="80px"
      class="base-form"
    >
      <el-form-item label="">
        <el-upload
          action="#"
          :file-list="fileList"
          :on-change="handleChange"
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
                  @click="handleRemove(file)"
                >
                  <i class="el-icon-delete"></i>
                </span>
              </span>
            </div>
        </el-upload>
      </el-form-item>
    </el-form>
    <section class="img-list-wrap" v-show="imgList.length">
      <div class="img-item" v-for="(img, key) in imgList" :key="key">
        <p class="img-name"><el-tag>{{ img.name }}</el-tag></p>
        <p class="img-url">{{ img.url }}</p>
      </div>
    </section>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </Block>
</template>

<script>
import { getOssSign } from '../product/api'
import md5 from '@/utils/md5'
import OSS from 'ali-oss'
import Block from '../material/components/MaterialAds/Block.vue'

export default {
  name: 'upload-img',
  components: {
    Block
  },
  props: {
    msg: String
  },
  data() {
    return {
      labelPosition: 'right',
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      fileList: [],
      client: null
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
  },
  computed: {
    /**
     * @desc 是否是编辑状态
     */
    imgList() {
      return this.fileList.map(item => {
        let { name, response } = item
        let res = {name }
        if (response) {
          res.url = response.requestUrls[0]
          res.url = res.url.replace('ipxmall.oss-cn-zhangjiakou.aliyuncs.com', 'ipxcdn.jfshare.com')
        }
        return res
      })
    }
  },
  mounted(){
    this.getSign()

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.upload-img{
  &{
    background: #fff;
    padding: 0 15px 15px;
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
  .img-list-wrap{
    &{
      border: 1px solid #eee;
      box-shadow: 0 0 8px 3px #eee;
      padding: 15px 10px 5px;
    }
    .img-item{
      display: flex;
      align-items: center;
      margin-bottom: 10px
    }
    .img-name{
      margin-right: 30px;
    }
  }
}
</style>
