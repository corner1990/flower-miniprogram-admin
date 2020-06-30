<template>
  <div class="release-info">
    <el-form :inline="true" :model="info" :rules="rules" ref="numberValidateForm">
      <el-form-item label="日签日期" prop="show_date">
        <el-date-picker v-model="info.show_date" value-format="yyyy-MM-dd" placeholder="选择日期"></el-date-picker>
      </el-form-item>
      <br />
      <el-form-item label="商品skuId" prop="sku_id">
        <el-input v-model="info.sku_id" placeholder="skuId" type="number"></el-input>
      </el-form-item>
      <br />
      <el-form-item label="日签类型" prop="show_type">
        <el-select v-model="info.show_type" placeholder="日签类型">
          <el-option label="画报" value="1"></el-option>
          <el-option label="超级商品" value="2"></el-option>
          <el-option label="预告" value="3"></el-option>
          <el-option label="新品上架" value="4"></el-option>
        </el-select>
      </el-form-item>
      <br />
      <el-form-item label=" 特殊节日 " prop="holiday">
        <el-input v-model="info.holiday" placeholder="节日名称"></el-input>
      </el-form-item>
      <br />
      <el-form-item label="H5链接" prop="link">
        <el-input v-model="info.link" placeholder="链接" style="width: 400px;"></el-input>
      </el-form-item>
      <br />
      <el-form-item label="日签文案" prop="content_desc">
        <el-input placeholder="请输入" v-model="info.content_desc" style="width: 400px;"></el-input>
      </el-form-item>
      <div>
        <el-form-item label="日签图片">
          <el-upload
            action="#"
            :limit="5"
            :file-list="fileList"
            :on-change="handleChange"
            list-type="picture-card"
            :http-request="uploadImg"
          >
            <i slot="default" class="el-icon-plus"></i>
            <div slot="file" slot-scope="{file}">
              <img class="el-upload-list__item-thumbnail" :src="file.url" alt />
              <span class="el-upload-list__item-actions">
                <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
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
      </div>
      <div class="btn-wrap">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="subimt">发布</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import { getOssSign } from '../../product/api'
import md5 from '@/utils/md5'
import OSS from 'ali-oss'
// import { dateFormat } from '@/utils/utils'
import { saveTheatre } from '../api'

export default {
  name: 'release-info',
  data() {
    return {
      disabled: false,
      info: {
        show_type: '',
        background: '',
        link: '',
        holiday: '',
        show_date: '',
        content_desc: ''
      },
      fileList: [],
      resetInfo: {
        show_type: '',
        background: '',
        link: '',
        holiday: '',
        show_date: '',
        content_desc: ''
      },
      rules: {
        sku_id: [
          { required: false, message: '请输入skuId', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        show_date: [{ required: true, message: '请选择日期', trigger: 'change' }],
        show_type: [{ required: true, message: '请选择类型', trigger: 'blur' }],
        holiday: [
          { required: false, message: '请输入节日', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        link: [{ required: false, message: '请输入活动名称', trigger: 'blur' }],
        content_desc: [
          { required: true, message: '请输入文案', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 15 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleRemove(file) {
      this.fileList = this.fileList.filter(item => item.uid !== file.uid)
    },
    handleChange(file, fileList) {
      this.fileList = fileList
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleDownload(file) {
      console.log(file)
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
        let { securityToken, accessKeyId, accessKeySecret, bucket, endpoint } = data
        // 创建实例
        let client = new OSS({
          endpoint,
          accessKeyId,
          accessKeySecret,
          bucket,
          stsToken: securityToken
        })
        this.client = client
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
      var formData = new FormData()
      formData.append('file', file)

      this.client.put(imgKey, file).then(response => {
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
    cancel() {
      this.$emit('update', 'releaseInfo', false)
    },
    subimt() {
      this.$refs['numberValidateForm'].validate((valid) => {
        if (valid) {
          this.save()
        } else {
          return false
        }
      })
    },
    save() {
      let { info, fileList } = this
      if (fileList.length < 1) {
        return this.$message.error('请上传图片')
      }
      info.background = fileList[0]['response']['requestUrls'][0]
      this.saveTheatre(info)
    },
    async saveTheatre(params) {
      let { errorCode, errorMessage } = await saveTheatre(params)
      if (errorCode === 0) {
        this.$message.success('创建成功')
        this.info = this.resetInfo //重置
        this.$emit('success')
      } else {
        this.$message.error(errorMessage)
      }
    }
  },
  mounted() {
    this.getSign()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.release-info {
  .btn-wrap {
    text-align: right;
  }
}
</style>
