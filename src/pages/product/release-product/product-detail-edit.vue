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
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
import { getOssSign } from '../api'
import md5 from '@/utils/md5'
import OSS from 'ali-oss'
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
      this.$emit('update', 'description', fileList)
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
    /**
     * @desc 编辑时初始化数据
     */
    initInfo() {
      let infoStr = window.sessionStorage.getItem('$editInfo')
      let arr = JSON.parse(infoStr).product_sku_info[0].detail_image
      arr = JSON.parse(arr)
      this.fileList = arr.map(item => {
        return {...item, url: item.image}
      })
      this.$emit('update', 'productDetail', this.fileList)
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
    }
  },
  mounted(){
    this.getSign()
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
