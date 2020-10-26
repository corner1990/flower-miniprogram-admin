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
    list: {
      deep: true,
      handler(list ) {
        // console.log('list', list)
        this.initData(list)
      }
    },
   
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
    initData(list) {
      console.log('list', list)
    },
    
  
    
    initParmas() {
      console.log('initParmas')
    }
  },
  mounted() {
   
    if (this.isEdit) {
      // 处理商品规格无法编辑的的问题
     setTimeout(() => {
       this.initParmas()
     }, 1000)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">

.spec-detail{
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
