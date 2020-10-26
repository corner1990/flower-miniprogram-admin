<template>
  <div class="repease-product">
    <h2 class="title">{{ title }}</h2>
    <BaseInfo @update="update" :editInfo="editInfo" />
    <!-- <PriceWarehouse @update="update" :editInfo="editInfo" /> -->
    
    <el-form
      :label-position="labelPosition"
      label-width="100px"
      ref="specialForm"
      class="specil-form"
      :model="info"
      :rules="rules"
    >
      <el-form-item label="规格明细">
        <!-- <p class="tip-text">待商品规格保存后可设置规格明细</p> -->
        <SpecDetail :list="specifications" @update="update" />
      </el-form-item>
      <el-form-item label="品牌故事" prop="brand_story">
        <el-input class="medium" v-model="info.brand_story">
        </el-input>
      </el-form-item>
      <el-form-item label="养护说明" prop="care_instructions">
        <el-input class="medium" v-model="info.care_instructions">
        </el-input>
      </el-form-item>
      <el-form-item label="物流说明" prop="logistics_desc">
        <el-input class="medium" v-model="info.logistics_desc">
        </el-input>
      </el-form-item>
      <el-form-item label="特别说明" prop="special_note">
        <el-input class="medium" v-model="info.special_note">
        </el-input>
      </el-form-item>
      <el-form-item label="售后说明" prop="after_sale_instructions">
        <el-input class="medium" v-model="info.after_sale_instructions">
        </el-input>
      </el-form-item>
    </el-form>
    <ProductDetailEdit @update="update" :editInfo="editInfo" />
    <div class="btn-wrap">
      <el-button type="primary" @click="vertify">保存并预览</el-button>
    </div>
  </div>
</template>

<script>
import BaseInfo from './release-product/base-info'
// import PriceWarehouse from './release-product/price-warehose'
import SpecDetail from './release-product/spec-detail'
import ProductDetailEdit from './release-product/product-detail-edit'
import { createProduct, getProductDetail, updateProductSkuInfo  } from './api'

export default {
  name: 'repease-product',
  props: {},
  components: {
    BaseInfo,
    SpecDetail,
    ProductDetailEdit
  },
  data() {
    return {
      labelPosition: 'right',
      baseInfo: {
        main_image: []
      },
      specifications: [],
      description: [],
      baseForm: null,
      editInfo: null,
      info: {}
    }
  },
  computed: {
    title() {
      return this.$route.meta.title
    },
    /**
     * @desc 是否是编辑状态
     */
    isEdit() {
      return /edit-product/.test(this.$route.path)
    },
    rules() {
      return {
        brand_story: [
          { required: true, message: '请输入品牌故事', trigger: 'blur' }
        ],
        care_instructions: [
          { required: true, message: '请输入养护说明', trigger: 'blur' }
        ],
        logistics_desc: [
          { required: true, message: '请输入物流说明', trigger: 'blur' }
        ],
        special_note: [
          { required: true, message: '请输入特别说明', trigger: 'blur' }
        ],
        after_sale_instructions: [
          { required: true, message: '请输入售后说明', trigger: 'blur' }
        ],
      }
    }
  },
  watch: {
    $route(){
      this.loadInfo()
    }
  },
  mounted() {
    window.sessionStorage.removeItem('$eitdInfo')
    
    if (this.isEdit) {
      this.loadInfo()
    }
    
  },
  methods: {
    update(key, val) {
      this[key] = val
    },
    vertify() {
      // this.vertifySpecialForm()
      // return false
      this.baseForm.validate(valid => {
        if (valid) {
          // this.submit()
          this.vertifySpecialForm()
          } else {
            console.log('error submit!!');
            return false;
          }
      })
    },
    /**
     * @desc 验证信息
     */
    vertifySpecialForm() {
      
      this.baseForm.validate(valid => {
        if (valid) {
          this.submit()
          } else {
            console.log('error submit!!');
            return false;
          }
      })
    },
    /**
     * @desc 提交
     */
    submit() {
      let { baseInfo, specifications, description } = this
      let main_image =  baseInfo.main_image.length > 0 ? this.getImgSrc(baseInfo.main_image)[0].content : ''
      specifications = specifications.reduce((prev, next) => {
        let { key, val } = next
        prev.push({[key]: val})
        return prev
      }, [])

      let params = {
        ...this.baseInfo,
        main_image,
        specifications: JSON.stringify(specifications),
        description: this.getImgSrc(description) || [],

      }
      
      if (this.isEdit) { // 调用编辑接口
        
        this.updateProductInfo(params)
        return false
      }
      this.createProductInfo(params)
      
    },
    /**
     * @desc 编辑
     */
    async updateProductInfo(params) {
      let infoStr = window.sessionStorage.getItem('$editInfo')
      let { product_item_info } = JSON.parse(infoStr)

      params.id = product_item_info.id - 0
      let { errorCode } = await updateProductSkuInfo(params)
      if (errorCode === 0) {
        this.$router.go(-1)
      }
    },
    /**
     * @desc 创建
     */
    async createProductInfo(params) {
      let { errorCode } = await createProduct(params)
      if (errorCode === 0) {
        this.$router.go(-1)
      }
    },
    /**
     * @des 处理spec信息
     */
    initSpecs() {
      let { priceInfo } = this
      let { specList,  sepcsData} = priceInfo
      if (!sepcsData) return []
      sepcsData = sepcsData.map((spec ) => {
        let { id = 1} = spec
        let detail = []
         specList.map((item, key) => {
            let obj = {name: item.name, key, attr: spec[`${key}`]}
            detail.push(obj)
          })
          // 处理index
          let indexes = detail.map((subItem) => {
            let { key, attr } = subItem
            let info = specList[key].attr
            let values = Object.values(info)
            return values.indexOf(attr)
          }).join('_')
          
          return {...spec, indexes, detail, sku_id: id}
      })
      
      return sepcsData
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
    /**
     * @desc 获取信息
     */
    async loadInfo() {
    
      let { errorCode, data } = await getProductDetail(this.$route.query)
      if (errorCode === 0) {
        this.editInfo = data
        window.sessionStorage.setItem('$editInfo', JSON.stringify(data))
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import url('../../less/main.less');
.repease-product{
  &{
    height: calc(100vh - 100px);
    overflow: auto;
  }
  .title{
    background: @white;
    padding: 15px;
  }
  .specil-form{
    background-color: @white;
    padding: 10px 0;
  }
  .btn-wrap{
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 200px;
    background: @white;
  }
}
</style>
