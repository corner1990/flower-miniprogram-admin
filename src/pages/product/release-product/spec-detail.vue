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
        <template>
          <el-table-column
            :label="item.label"
            width="80" 
            v-for="(item, key) in colums"
            :key="key"
            :prop="`${key}`"
          >
            <template slot-scope="scope">
                <p>{{scope.row[key]}}</p>
              </template>
          </el-table-column>
        </template>
        
        <el-table-column label="价格">
            <template slot-scope="scope">
              <el-input class="medium" v-model="scope.row.current_price">
                <template slot="prepend">&yen;</template>
              </el-input>
            </template>
        </el-table-column>
        <el-table-column label="划线价">
            <template slot-scope="scope">
              <el-input class="medium" v-model="scope.row.former_price">
                <template slot="prepend">&yen;</template>
              </el-input>
            </template>
        </el-table-column>
        <el-table-column prop="address" label="库存">
           <template slot-scope="scope">
              <el-input class="medium" v-model="scope.row.stock" />
            </template>
        </el-table-column>
    </el-table>
    <el-row class="list-operation">
      <el-col :span="24">
        批量处理：
        <el-popover
          v-for="(item, key) in operateList"
          :key="key"
          placement="top"
          v-model="item.visible"
          style="text-algin: center;"
          trigger="click">
          <el-row>
            <el-col :span="24">
              <p class="list-operation-title">统一修改{{item.name}}
                <el-input class="medium" v-model="operateValue">
                  <template slot="prepend" v-if="item.key == 'price'">&yen;</template>
                </el-input>
              </p>
              <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text" @click="item.visible = false">取消</el-button>
                <el-button type="primary" size="mini" @click="changeData(item)">确定</el-button>
              </div>
            </el-col>
          </el-row>
          <!-- <el-button type="text">价格</el-button> -->
          <el-button type="text" slot="reference" style="margin-left: 10px;">{{ item.name }}</el-button>
          
        </el-popover>
        <el-popover
          placement="top"
          style="text-algin: center;"
          v-model="resetVisible"
          trigger="click">
          <el-button type="text" @click="resetData('current_price')">价格</el-button>
          <el-button type="text" @click="resetData('former_price')">划线价</el-button>
          <el-button type="text" @click="resetData('stock')">库存</el-button>
          <el-button type="text" @click="resetData('all')">全部重置</el-button>
          <el-button slot="reference" style="margin-left: 10px;">重置</el-button>
        </el-popover>
      </el-col>
    </el-row>
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
    },
    skuInfo: {
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
      operateList: [
        {
          name: '价格',
          key: 'current_price',
          visible: false,
        },
        {
          name: '划线价',
          key: 'former_price',
          visible: false
        },
        {
          name: '库存',
          key: 'stock',
          visible: false
        }
      ],
      operateValue: ''
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
    /**
     * @desc 处理sku信息
     */
    skuInfo(skuInfo) {
      // let keys = [ 'stock', 'former_price', 'current_price' ]
      
      skuInfo.map((sku, idx) => {
        let item = this.tableData[idx]
        let spec = {}
        if (this.isEdit) {
          spec = JSON.parse(sku.specifications)
          spec = spec.reduce((prev, next) => {
            prev[next.key] = next.attr
            return prev
          }, {})
        }
        this.tableData[idx] = {...item, ...sku, ...spec}
      })
    },
    tableData: {
      deep: true,
      handler(tableData) {
        this.$emit('update', 'sepcsData', tableData)
      }
    }
  },
  computed: {
    colums() {
      let { list } = this
      return list.map(item => {
        return {
          label: item.name,
          price: ''
        }
      })
    },
    /**
     * @desc 是否是编辑状态
     */
    isEdit() {
      return /edit-product/.test(this.$route.path)
    }
  },
  methods: {
    initData(list) {
      let arr = list.map((item, key) => {
        let attr = Object.values(item.attr)
        attr.key = key
        return attr
      })
      
      let data = this.reduceMultipleArr(arr)
      
      this.tableData = data.map((item) => {
        let obj = item
        if (typeof item === 'string') {
          obj = {
            [data.key]: item
          }
        }
        return {
          ...obj,
          stock: '',
          former_price: '',
          current_price: ''
        }
      })
    },
    // 计算 2 个数组时一共组合情况
    reduceTwoArr (source1, source2) {
        let result = []
        // 遍历第一层
        source1.forEach(item => {
          let obj = {}
          
          if (typeof item === 'object') {
            obj = item
          } else {
            obj[source1.key] = item
          }
          // 遍历第二层
          source2.forEach(item2 => {
            let obj2 = JSON.parse(JSON.stringify(obj))
            obj2[source2.key] = item2
            result.push(obj2)
          })
        })
        return result
    },
    // 计算多个数组时一共组合情况
    reduceMultipleArr (arr = []) {
      if (!arr.length) return []
      return arr.reduce((acc, currentItem) => {
          return this.reduceTwoArr(acc, currentItem)
      })
    },
    /**
     * @desc 批量修改数据
     */
    changeData(info) {
      let { operateValue, tableData } = this
      let { key } = info
      this.tableData = tableData.map(item => {
        item[key] = operateValue
        return item
      })
      this.operateValue = ''
      info.visible = false
    },
    resetData(key) {
      let { tableData } = this
      let obj = {
        stock: '',
        former_price: '',
        current_price: ''
      }
      if (key === 'all') {
        this.tableData = tableData.map(item => {
          return {...item, ...obj}
        })
      } else {
        this.tableData = tableData.map(item => {
          item[key] = ''
          return item
        })
      }
      this.resetVisible = false
    },
    initParmas() {
      // let key = 'current_price'
      
      this.tableData = this.tableData.map(item => {
        let { current_price } = item
        item.current_price = 1

        return {...item, current_price}
      })
      // console.log(this.tableData)
    //  this.
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
  .list-operation{
    margin-top: 20px;
  }
}
.list-operation-title{
  text-align: left;
  line-height: 32px;
  padding-bottom: 16px;
}
</style>
