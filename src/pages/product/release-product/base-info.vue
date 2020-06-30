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
      <el-row :gutter="10">
        <el-col :span="9">
          <el-form-item label="商品类目" prop="cate_level_1">
            <el-select
              placeholder="商品类目"
              v-model="info.cate_level_1"
              value=""
              @blur="selectChange(1)"
            >
              <el-option
                v-for="(item, key) in level1"
                :key="key"
                :label="item.cate_level1_name"
                :value="item.cate_level1_id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label-width="0" prop="cate_level_2">
          <el-select
            placeholder="商品类目"
            v-model="info.cate_level_2"
            value=""
            @blur="selectChange(2)"
          >
            <el-option
                v-for="(item, key) in syncLevel2"
                :key="key"
                :label="item.cate_level2_name"
                :value="item.cate_level2_id"
              ></el-option>
          </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label-width="0" prop="cate_level_3">
          <el-select
            placeholder="商品类目"
            v-model="info.cate_level_3"
            value=""
            @blur="selectChange(3)"
          >
            <el-option
                v-for="(item, key) in syncLevel3"
                :key="key"
                :label="item.cate_level3_name"
                :value="item.cate_level3_id"
              ></el-option>
          </el-select>
          </el-form-item>
      </el-col>
      </el-row>
      <el-form-item label="是否超级商品">
        <el-radio v-model="info.is_super" :label="1">是</el-radio>
        <el-radio v-model="info.is_super" :label="0">否</el-radio>
      </el-form-item>
       <el-form-item label=" 品牌名称" prop="brand_id">
        <el-select placeholder="品牌名称" v-model="info.brand_id">
          <el-option
            v-for="(item, key) in brandList"
            :key="key"
            :label="item.brand_name"
            :value="(item.id - 0)"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品名称" prop="product_name">
        <el-input class="medium" v-model="info.product_name">
        </el-input>
      </el-form-item>
      <!-- <el-form-item label="商品编码" prop="bar_code">
        <el-input class="medium" v-model="info.bar_code">
        </el-input>
      </el-form-item> -->
      <el-form-item label="商品主图" prop="main_pic">
        <el-upload
          action="#"
          :file-list="info.main_pic"
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
                  @click="handleRemove(file, 'main_pic')"
                >
                  <i class="el-icon-delete"></i>
                </span>
              </span>
            </div>
        </el-upload>
      </el-form-item>
      <el-form-item label="商品图片" prop="gallery_image">
        <el-upload
          action="#"
          :file-list="info.gallery_image"
          :on-change="handleChange"
          :limit="4"
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
                  @click="handleRemove(file, 'gallery_image')"
                >
                  <i class="el-icon-delete"></i>
                </span>
              </span>
            </div>
        </el-upload>
      </el-form-item>
      <!-- <el-form-item label="商品背景图片" prop="background_pic">
        <el-upload
          action="#"
          :limit="1"
          :file-list="info.background_pic"
          :on-change="bgHandleChange"
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
                  @click="handleRemove(file, 'background_pic')"
                >
                  <i class="el-icon-delete"></i>
                </span>
              </span>
            </div>
        </el-upload>
      </el-form-item> -->
      <el-form-item label="对应IP" prop="star_id">
        <el-select
          placeholder="输入IP关键字搜索"
          v-model="info.star_id"
          filterable
          remote
          :remote-method="loadIp"
          :loading="loading"
        >
          <el-option
          :label="star.content"
          :value="star.id"
          v-for="star in ipList"
          :key="star.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品描述" prop="description">
        <el-input class="medium" v-model="info.description">
        </el-input>
      </el-form-item>
      <el-form-item label="商品摘要" prop="summary">
        <el-input class="medium" v-model="info.summary">
        </el-input>
      </el-form-item>
      <el-form-item label="快递运费" prop="shipping_price">
        <el-input class="medium" v-model="info.shipping_price">
          <template slot="prepend">&yen;</template>
        </el-input>
      </el-form-item>
    </el-form>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
    <!-- <el-button v-on:click="checkForm">valdata</el-button> -->
  </div>
</template>

<script>
import {
  getOssSign,
  getProductCategoryList,
  getProductBrandList,
  getStarIpList
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
        cate_level_1: '',
        cate_level_2: '',
        cate_level_3: '',
        is_super: 0,
        bar_code: '',
        product_name: '',
        brand_id: '',
        main_pic: [],
        summary: '',
        description: '',
        gallery_image: [],
        background_pic: [],
        product_class: '',
        shipping_price: '',
        star_id: ''
      },
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      ipList: [],
      level1: [],
      level2: [],
      level3: [],
      brandList: [],
      loading: false,
      pageInfo: {
        page_size: 30
      }
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
      this.info.main_pic = fileList;
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
     * @desc 获取产品层级数据
     */
    async loadProductCategory() {
      let res = await getProductCategoryList()
      if (res.errorCode === 0) {
        let arr = res.data.product_category_list
        arr.forEach(item => {
          let index = item.category_level
          this[`level${index}`].push(item)
          // console.log('item', item)
        })
      }
    },
    /**
     * @desc 联动清空值
     */
    selectChange(index) {
      let keys = [
        'cate_level_1',
        'cate_level_2',
        'cate_level_3',
      ]
      keys.slice(index).map(key => (this.info[key] = ''))
    },
    /**
     * @desc 获取品牌列表
     */
    async loadBrandList() {
      let {errorCode, data} = await getProductBrandList()
      if (errorCode === 0 ) {
        this.brandList =  data.product_brand_list
      }
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
        if (['main_pic', 'background_pic'].includes(key)) {
          info[key] = [{url: data[key], name: key, uid: data[key]} ]

        }
        if (['gallery_image'].includes(key)) {
          let arr = JSON.parse(data[key])
          info[key] = arr.map(item => {
            return {...item, url: item.image}
          })
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
    /**
     * @desc 后台加载IP
     */
    async loadIp(keyword = '') {
      let { pageInfo } = this
      if (keyword) {
        pageInfo = {
          page_size: 30
        }
      }
      let { errorCode, data } = await getStarIpList({ ...pageInfo, keyword })
      if (errorCode === 0) {
        this.ipList = data
      }
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
    syncLevel2() {
      let parendId = this.info.cate_level_1
      if( parendId === '') return []
      return this.level2.filter(item => item.parent_id === parendId)
    },
    syncLevel3() {
      let parendId = this.info.cate_level_2
      if( parendId === '') return []
      return this.level3.filter(item => item.parent_id === parendId)
    },
    /**
     * @desc 是否是编辑状态
     */
    isEdit() {
      return /edit-product/.test(this.$route.path)
    },
    rules() {
      let { info } = this
      return {
        cate_level_1: [
          { required: true, message: '请选择商品类目', trigger: 'blur' }
        ],
        cate_level_2: [
          { required: true, message: '请选择商品类目', trigger: 'blur' }
        ],
        brand_id: [
          { required: true, message: '请选择品牌名称', trigger: 'blur' }
        ],
        product_name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' }
        ],
        // bar_code: [
        //   { required: true, message: '请输入商品编码', trigger: 'blur' }
        // ],
        main_pic: [
          { required: true, message: '请上传商品主图', trigger: 'blur' }
        ],
        gallery_image: [
          { required: true, message: '请上传商品图', trigger: 'blur' }
        ],
        // background_pic: [
        //   { required: true, message: '请上传商品背景图', trigger: 'blur' }
        // ],
        star_id: [
          { required: info.is_super, message: '请选择对应IP', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '请输入商品描述', trigger: 'blur' }
        ],
        summary: [
          { required: true, message: '请输入商品摘要', trigger: 'blur' }
        ],
        shipping_price: [
          { required: true, message: '请输入商品运费', trigger: 'blur' }
        ],
      }
    }
  },
  created() {
    // 获取oss签名
    this.getSign()
    this.loadIp()
    this.loadProductCategory()
    this.loadBrandList()
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
