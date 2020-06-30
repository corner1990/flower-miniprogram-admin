<template>
  <div class="repease-product">
    <h2 class="title">{{ title }}</h2>
    <BaseInfo @update="update" :editInfo="editInfo" />
    <PriceWarehouse @update="update" :editInfo="editInfo" />
    <ProductDetailEdit @update="update" :editInfo="editInfo" />
    <div class="btn-wrap">
      <el-button type="primary" @click="vertify">保存并预览</el-button>
    </div>
  </div>
</template>

<script>
import BaseInfo from './release-product/base-info'
import PriceWarehouse from './release-product/price-warehose'
import ProductDetailEdit from './release-product/product-detail-edit'
import { createProduct, getProductDetail, updateProductSkuInfo  } from './api'

export default {
  name: 'repease-product',
  props: {},
  components: {
    BaseInfo,
    PriceWarehouse,
    ProductDetailEdit
  },
  data() {
    return {
      baseInfo: {},
      priceInfo: {},
      productDetail: {},
      baseForm: null,
      editInfo: null
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
    }
  },
  watch: {
    $route(){
      this.loadInfo()
    }
  },
  mounted() {
    window.sessionStorage.removeItem('$eitdInfo')
    console.log('release-product')
    
    if (this.isEdit) {
      this.loadInfo()
    }
    
  },
  methods: {
    update(key, val) {
      this[key] = val
    },
    vertify() {
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
      let { baseInfo, priceInfo, productDetail } = this
      let main_pic =  baseInfo.main_pic&&baseInfo.main_pic[0] ? this.getImgSrc(baseInfo.main_pic)[0].image : ''
      let background_pic =  baseInfo.background_pic&&baseInfo.background_pic[0] ? this.getImgSrc(baseInfo.background_pic)[0].image : ''
      let params = {
        ...this.baseInfo,
        ...priceInfo,
        main_pic,
        bar_code: parseInt(baseInfo.bar_code),
        gallery_image: this.getImgSrc(baseInfo.gallery_image),
        background_pic,
        detail_image: this.getImgSrc(productDetail) || [],

      }
      if (priceInfo.type === '多规格') {
        params.specifications = this.initSpecs()
        
        params.stock = params.specifications.reduce((prev, next) => { return prev + (next.stock - 0) }, 0)
      }
      if (this.isEdit) { // 调用编辑接口
        
        this.updateProductInfo(params)
        return false
      }
      this.createProductInfo(params)
    },
    async updateProductInfo(params) {
      let infoStr = window.sessionStorage.getItem('$editInfo')
      let { product_item_info } = JSON.parse(infoStr)

      params.id = product_item_info.id - 0
      let { errorCode } = await updateProductSkuInfo(params)
      if (errorCode === 0) {
        this.$router.go(-1)
      }
    },
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
          description: 'description'
        }
        if (item.response) {
          img.image = item.response.requestUrls[0]
        } else {
          img.image = item.url
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
.repease-product{
  .title{
    background: #fff;
    padding: 15px;
  }
  .btn-wrap{
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 200px;
    background: #fff;
  }
}
</style>
