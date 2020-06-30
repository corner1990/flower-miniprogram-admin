<template>
  <Block class="IPTagPage" title="IP标签">
    <div slot="action">
      <el-button type="primary" round icon="el-icon-plus" @click="handleClickAdd">新增</el-button>

      <!-- Dialog -->
      <el-dialog title="新增IP标签" :visible.sync="dialogVisible">
        <Box row center>
          <!-- <div style="white-space: nowrap; margin-right: 20px;">
            名称
          </div>-->
          <el-input size="medium" placeholder="20个字以内" v-model="tag"></el-input>
        </Box>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleClickConfirmAdd">确 定</el-button>
        </div>
      </el-dialog>
    </div>

    <!-- 表格 -->
    <el-table :data="tableData" style="width: 100%" v-loading="loading">
      <!-- 标签名称 -->
      <el-table-column label="标签名称">
        <template slot-scope="scope">中国好声音</template>
      </el-table-column>

      <!-- 对应IP -->
      <el-table-column label="对应IP">
        <template slot-scope="scope">吴莫愁，大山，吴磊</template>
      </el-table-column>

      <!-- 操作 -->
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-link type="danger" size="mini" @click="handleClickDelete">删除</el-link>
        </template>
      </el-table-column>
    </el-table>
  </Block>
</template>

<script>
import Block from '../material/components/MaterialAds/Block.vue'
import { Box } from 'vue-raw-ui'

export default {
  name: 'IPTagPage',
  components: {
    Block,
    Box
  },
  data() {
    return {
      dialogVisible: false,
      tableData: [{}],
      loading: false,
      tag: ''
    }
  },
  methods: {
    handleClickDelete() {},
    handleClickAdd() {
      this.dialogVisible = true
    },
    handleClickConfirmAdd(){
      this.dialogVisible = false
    }
  }
}
</script>

<style lang="less" scoped>
</style>
