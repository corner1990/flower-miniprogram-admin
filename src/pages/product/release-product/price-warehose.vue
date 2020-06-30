<template>
  <div class="base-info">
    <h3 class="item-title">价格库存</h3>
    <el-form
      :label-position="labelPosition"
      label-width="80px"
      class="base-form"
      :model="info"
    >
      <!-- <el-form-item label="选择规格">
        <el-radio-group v-model="info.type" size="medium">
           <el-radio-button label="单规格"></el-radio-button>
            <el-radio-button label="多规格"></el-radio-button>
        </el-radio-group>
      </el-form-item> -->
     
      <template  v-if="info.type !== '单规格'">
        <el-form-item label="商品规格">
          
          <div class="spec-wrap" v-if="specList.length">
            <p class="spec-item"
              v-for="(spec, key) in specList"
              :key="key"
            >
              {{ spec.name }}: {{ Object.values(spec.attr).join(';') }}
            </p>
            <el-button type="text" @click="() => dialogFormVisible = true">修改</el-button>
          </div>
          <el-button
            @click="() => dialogFormVisible = true"
            v-else
          >添加规格</el-button>
        </el-form-item>
        <el-form-item label="规格明细">
          <!-- <p class="tip-text">待商品规格保存后可设置规格明细</p> -->
          <SpecDetail :list="specList" @update="update" :skuInfo="skuInfo" />
        </el-form-item>
      </template>
      <template v-else>
        <el-form-item label="价格">
          <el-input class="medium" v-model="info.current_price">
            <template slot="prepend">&yen;</template>
          </el-input>
        </el-form-item>
        <el-form-item label="划线价">
          <el-input class="medium " v-model="info.former_price">
            <template slot="prepend">&yen;</template>
          </el-input>
        </el-form-item>
        <el-form-item label="库存">
          <el-input class="medium " v-model="info.stock"></el-input>
        </el-form-item>
      </template>
    </el-form>
    <el-dialog
      title="添加商品规格" 
      :visible.sync="dialogFormVisible"
      top="25vh"
    >
      <AddSpec @update="update" :specs="specList" />
    </el-dialog>
  </div>
</template>

<script>
import AddSpec from './add-spec'
import SpecDetail from './spec-detail'
export default {
  name: 'base-info',
  props: {
    editInfo: Object
  },
  components: {
    AddSpec,
    SpecDetail
  },
  data() {
    return {
      labelPosition: 'right',
      info: {
        type: '多规格', 
        stock: '',
        former_price: '',
        current_price: ''
      },
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      fileList: [],
      dialogFormVisible: false,
      specList: [],
      sepcsData: [],
      specs: [], // 编辑时使用
      skuInfo: [], // 编辑时保存数据
      iitem_id: ''
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!');
    },
    handleRemove(file) {
      this.fileList = this.fileList.filter(item => item.uid !== file.uid)
      console.log(file);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleDownload(file) {
      console.log(file);
    },
    update(key, val) {
      this[key] = val
      this.updateParentInfo()
    },
    /**
     * @desc 更新父组件数据
     */
    updateParentInfo() {
      this.$emit('update', 'priceInfo', { 
          ...this.info,
          sepcsData: this.sepcsData,
          specList: this.specList,
          item_id: this.item_id
        })
    },
    /**
     * @desc 编辑时初始化数据
     */
    initInfo() {
      let infoStr = window.sessionStorage.getItem('$editInfo')
      let data = JSON.parse(infoStr)
      let { product_item_info , product_sku_info } = data
      let specs = product_item_info.specifications
      this.skuInfo = product_sku_info
      this.specList = JSON.parse(specs)
      this.item_id = product_sku_info[0].item_id
      this.updateParentInfo()
    }
  },
  watch: {
    sepcsData: {
      deep: true,
      handler() {
        this.updateParentInfo()
        
      }
    },
    info: {
      deep: true,
      handler() {
        this.updateParentInfo()
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
    }
  },
  mounted() {
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
    // width: 600px;
    .tip-text{
      color: #999;
    }
    .medium{
      width: 216px;
    }
  }
}
</style>
