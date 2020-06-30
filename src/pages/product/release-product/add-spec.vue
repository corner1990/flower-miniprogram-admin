<template>
  <div class="add-spec">
    
    <template>
      <el-row style="color: lightgray">
        如: 颜色 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 黑;白;红
      </el-row>
      <el-row
        :gutter="24"
        v-for="(item, key) in list"
        :key="key"
        class="line"
      >
        <el-col :span="9">
          <el-input placeholder="sku名称" v-model="item.key"></el-input>
        </el-col>
        <el-col :span="12">
          <el-input placeholder="sku参数，多个使用英文;隔开" v-model="item.value"></el-input>
        </el-col>
        <el-col :span="2">
          <el-button type="text" style="color:orangered;" @click="delLine(item)">删除</el-button>
        </el-col>
      </el-row>
    </template>
    <div>
      <el-button type="text" @click="addLine" icon="el-icon-circle-plus">添加</el-button>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="saveSpec">确 定</el-button>
    </div>
  </div>
</template>

<script>
import { createProductItem } from '../api'
export default {
  name: 'add-spec',
  props: {
    specs: {
      type: [Object, Array],
      default() {
        return []
      }
    }
  },
  data() {
    return {
      dialogTableVisible: false,
      dialogFormVisible: false,
      formLabelWidth: '120px',
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      list: [
        {
          key: '',
          value: ''
        }
      ]
    }
  },
  methods: {
    addLine() {
      let line = {
          key: '',
          value: ''
        }
      this.list.push(line)
    },
    delLine(delItem) {
      let len = this.list.length
      if (len <= 1) {
        return this.$alert('SKU至少要保存1个以上', '删除提醒', {
          confirmButtonText: '确定',
          callback: action => {
            console.log('action, ', action)
          }
        })
      }
      this.list = this.list.filter(item => item !== delItem)
    },
    listChange(list) {
      // this.$emit('update', 'specList', list)
      console.log('list', list)
    },
    close() {
      this.$emit('update', 'dialogFormVisible', false)
    },
    /**
     * @desc 保存规格
     */
    async saveSpec() {
      let { list } = this
      let specifications = list.filter(item => item.key).map(item => {
        let { key, value } = item
        let attr = {...value.split(';')}
        return {name: key, attr}
      })
     
      let { errorCode, errorMessage, data } = await createProductItem({ specifications: JSON.stringify(specifications) })
      if (errorCode === 0) {
        this.$emit('update', 'specList', specifications)
        this.$emit('update', 'item_id', data)
        this.close()
      } else {
        this.$message.error(errorMessage)
      }
    },
  },
  watch: {
    list: {
      deep: true,
      handler() {
        // console.log(newVal, oldVal)
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
      this.list = this.specs.map(item => {
        let { name, attr } = item
        attr = Object.values(attr).join(';')
        return { key: name, value: attr}
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.add-spec{
  .dialog-footer{
    padding-top: 30px;
    text-align: right;
  }
  .content{
    padding-bottom: 20px;
  }
  .line{
    padding: 10px 0;
  }
}
</style>
