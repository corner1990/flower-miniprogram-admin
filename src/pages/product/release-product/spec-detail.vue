<template>
  <div class="spec-detail">
    <el-table
        :data="tableData"
        max-height="550"
        border
        class="table"
        ref="multipleTable"
        header-cell-class-name="table-header"
    >
        <!-- <el-table-column type="selection" width="55" align="center"></el-table-column> -->
        <el-table-column label="名称">
            <template slot-scope="scope">
              <el-input class="medium" v-model="scope.row.key">
              </el-input>
            </template>
        </el-table-column>
        <el-table-column label="内容">
          <template slot-scope="scope">
            <el-input class="medium" v-model="scope.row.val">
            </el-input>
          </template>
        </el-table-column>
         <el-table-column label="操作" width="100" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="delItem(scope)">删除</el-button>
          </template>
        </el-table-column>
    </el-table>
    <div class="add-btn-wrap">
      <el-button @click="addInfo">添加规格</el-button>
    </div>
    
  </div>
</template>

<script>
export default {
  name: 'spec-detail',
  props: {
    list: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      visible: false,
      resetVisible: false,
      tableData: [],
      info: {}
    }
  },
  watch: {
    // list: {
    //   deep: true,
    //   handler(list ) {
    //     // console.log('list', list)
    //     this.initData(list)
    //   }
    // },
   
    tableData: {
      deep: true,
      handler(tableData) {
        this.$emit('update', 'specifications', tableData)
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
  methods: {
    addInfo() {
      this.tableData.push({key: '', val: ''})
    },
    /**
     * @desc 删除
     */
    delItem(scope) {
      let list = this.tableData
      list = list.filter((item, key) => {
        return key !== scope.$index
      })
      
      this.tableData = list
      this.$emit('update', 'specifications', list)
    },
    /**
     * @desc 初始化编辑参数
     */
    initParmas() {
       let infoStr = window.sessionStorage.getItem('$editInfo')

      let {
        specifications
      } = JSON.parse(infoStr)
      if (!specifications) return false
      specifications = JSON.parse(specifications)
      specifications = specifications.map(item => {
        let key = Object.keys(item)[0]
        return  { key, val: item[key] }
      })
      this.tableData = specifications
      this.$emit('update', 'specifications', specifications)
    }
  },
  mounted() {
   
    if (this.isEdit) {
      // 处理商品规格无法编辑的的问题
     setTimeout(() => {
       this.initParmas()
     }, 500)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">

.spec-detail{
  padding-right: 450px;
  .add-btn-wrap{
    margin-top: 20px;
  }
}
.list-operation-title{
  text-align: left;
  line-height: 32px;
  padding-bottom: 16px;
}
</style>
