<template>
  <div class="base-info">
    <h3 class="item-title">基本信息</h3>
    <el-form
      :label-position="labelPosition"
      label-width="100px"
      ref="baseForm"
      class="base-form"
      :model="info"
      :rules="rules"
    >
      <el-form-item label="鲜花名称" prop="product_name">
        <el-input class="medium" v-model="info.product_name">
        </el-input>
      </el-form-item>
      <el-form-item label="鲜花类型" prop="product_type">
        <el-select placeholder="鲜花类型" v-model="info.product_type">
          <el-option
            v-for="(item, key) in flowerList"
            :key="key"
            :label="item.name"
            :value="item.val"
          ></el-option>
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="商品编码" prop="bar_code">
        <el-input class="medium" v-model="info.bar_code">
        </el-input>
      </el-form-item> -->
      <el-form-item label="商品主图" prop="main_image">
        <el-upload
          action="#"
          :file-list="info.main_image"
          :limit="1"
          :on-change="mainHandleChange"
          :auto-upload="false"
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
     
      <el-form-item label="鲜花摘要" prop="summary">
        <el-input class="medium" v-model="info.summary">
        </el-input>
      </el-form-item>
      <el-form-item label="标准价格" prop="original_price">
        <el-input class="medium" v-model="info.original_price">
          <template slot="prepend">&yen;</template>
        </el-input>
      </el-form-item>
      <el-form-item label="当前价格" prop="current_price">
        <el-input class="medium" v-model="info.current_price">
          <template slot="prepend">&yen;</template>
        </el-input>
      </el-form-item>
      <el-form-item label="商品排序" prop="sort">
        <el-input class="medium" v-model="info.sort"></el-input>
      </el-form-item>
      <!-- <el-form-item label="快递运费" prop="shipping_price">
        <el-input class="medium" v-model="info.shipping_price">
          <template slot="prepend">&yen;</template>
        </el-input>
      </el-form-item> -->
      <!-- <el-form-item label="库存" prop="stock">
        <el-input class="medium" v-model="info.stock"></el-input>
      </el-form-item> -->
    </el-form>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
import {
  // getOssSign,
  uploadBase64Image,
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
      info: {
        stock: 99999,
        product_name: '',
        main_image: [],
        summary: '',
        shipping_price: 0,
        current_price: '',
        original_price: '',
        sort: 0
      },
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      flowerList: [
        {
          name: '包月鲜花',
          val: 1
        },
        {
          name: '礼品鲜花',
          val: 2
        }
      ]
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!');
    },
    handleRemove(file, key) {
      let arr = this.info[key]
      this.info[key] = arr.filter(item => item.uid !== file.uid)
    },
    /**
     * @desc 保存商品图片
     */
    handleChange(file, fileList) {
      this.info.gallery_image = fileList;
    },
    /**
     * @desc 保存商品图片
     */
    mainHandleChange(file) {
   
      this.info.main_image = [file]
      this.cutImg(file)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
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
          this.info.main_image = []
          this.$message.error('图片上传失败，请重新上传2');
        }

      } catch(err) {
        console.log('err')
        this.info.main_image = []
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
      // canvas.toBlob( blob => {
      //   file.image = blob

      //   this.uploadImg(file)
      // }, 'image/jpeg', '0.8')

      file.image = canvas.toDataURL('image/jpeg', 0.71)
      // 上传图片
      this.uploadImg(file)
    },
    /**
     * @desc 编辑时初始化数据
     */
    initInfo() {
      let infoStr = window.sessionStorage.getItem('$editInfo')
      if (!infoStr) {
        return false
      }
      let {
        base_info
      } = JSON.parse(infoStr)

      let main_image = base_info.main_image ? [{url: base_info.main_image}] : []
      let sale_price = base_info.sale_price / 100
      let original_price = base_info.original_price / 100
      let shipping_price = base_info.shipping_price / 100
      let sort = base_info.sort ? parseInt(base_info.sort ) : 0
      this.info = {
        ...base_info,
        main_image,
        sale_price,
        sort,
        original_price,
        shipping_price,
        current_price: sale_price
      }
      this.$emit('update', 'baseInfo', base_info)
    },

    checkForm() {
      console.log('this', this)
      // this.$refs.baseForm.validate(valid => {
      //   if (valid) {
      //       alert('submit!');
      //     } else {
      //       console.log('error submit!!');
      //       return false;
      //     }
      // })
    }
  },
  watch: {
    info: {
      deep: true,
      handler(info) {
        this.$emit('update', 'baseInfo', info)
      }
    },
    editInfo: {
      deep: true,
      handler() {
        this.initInfo()
      }
    }
  },
  computed: {
    /**
     * @desc 是否是编辑状态
     */
    isEdit() {
      return /edit-product/.test(this.$route.path)
    },
    rules() {
      
      return {
       
        product_name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' }
        ],
        product_type: [
          { required: true, message: '请选择鲜花类型', trigger: 'blur' }
        ],
        main_image: [
          { required: true, message: '请上传商品主图', trigger: 'blur' }
        ],
        // description: [
        //   { required: true, message: '请输入商品描述', trigger: 'blur' }
        // ],
        summary: [
          { required: true, message: '请输入商品摘要', trigger: 'blur' }
        ],
        shipping_price: [
          { required: true, message: '请输入商品运费', trigger: 'blur' }
        ],
        original_price: [
          { required: true, message: '请输入标准价格', trigger: 'blur' }
        ],
        stock: [
          { required: true, message: '请输入库存', trigger: 'blur' }
        ],
        sort: [
          { required: true, message: '请输入库存', trigger: 'blur' }
        ],
        current_price: [
          { required: true, message: '请输入当前价格', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    // 获取oss签名
    // this.getSign()
    if (this.isEdit) {
      this.initInfo()
    }
    
  },
  mounted() {
    this.$emit('update', 'baseForm', this.$refs.baseForm)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import url('../../../less/main.less');
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
      background: @color-brand;
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
  #img{
    position: absolute;
    left: -300000px;
  }
}
</style>
