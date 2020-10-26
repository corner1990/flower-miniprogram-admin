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
      <el-form-item label="快递运费" prop="shipping_price">
        <el-input class="medium" v-model="info.shipping_price">
          <template slot="prepend">&yen;</template>
        </el-input>
      </el-form-item>
      <el-form-item label="库存" prop="stock">
        <el-input class="medium" v-model="info.stock"></el-input>
      </el-form-item>
    </el-form>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
import {
  getOssSign,
} from '../api'
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
      info: {
        stock: '',
        product_name: '',
        main_image: [],
        summary: '',
        shipping_price: '',
        current_price: '',
        original_price: ''
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
    mainHandleChange(file, fileList) {
      this.info.main_image = fileList;
    },
    /**
     * @desc 保存背景图片
     */
    bgHandleChange(file, fileList) {
      this.info.background_pic = fileList;
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

      let { product_sku_info, product_item_info } = JSON.parse(infoStr)
      let data = product_sku_info[0]
      let { info } = this
      let keys = Object.keys(info)
      keys.map(key => {

        info[key] = data[key]
        if (['main_image', 'background_pic'].includes(key)) {
          info[key] = [{url: data[key], name: key, uid: data[key]} ]

        }
        
        if (key === 'description') {
          info[key]  = JSON.parse(data[key]).title
        }
        if (key === 'shipping_price') {
          info[key] = product_item_info.shipping_price
        }
      })
      this.$emit('update', 'baseInfo', info)
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
        current_price: [
          { required: true, message: '请输入当前价格', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    // 获取oss签名
    this.getSign()
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
}
</style>
