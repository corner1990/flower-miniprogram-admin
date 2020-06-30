<template>
  <div class="theater">
    <Search />
    <Card
      @update="update"
      :list="list"
      @delItem="delItem"
    />
    <div class="pagination-wrap">
      <el-pagination
        background
        layout="prev, pager, next"
        @current-change="handleCurrentChange"
        :page-size="pageInfo.page_size"
        :total="pageInfo.count">
      </el-pagination>
    </div>
    <el-dialog title="创建日签" :visible.sync="releaseInfo">
      <ReleaseInfo @update="update" @success="releaseInfo=false" />
    </el-dialog>
  </div>
</template>

<script>
import Card from './theater/info-card'
import Search from './theater/search'
import ReleaseInfo from './theater/release-info'
import { getShowList } from './api'
export default {
  name: 'theater',
  components: {
    Card,
    Search,
    ReleaseInfo
  },
  data() {
    return {
      releaseInfo: false,
      pageInfo: {
        count: 0,
        index: 0
      },
      list: []
    }
  },
  methods: {
    update(key, val) {
      this[key] = val
    },
    async loadInfo(params) {
      let { errorCode, data } = await getShowList({ ...this.pageInfo, ...params })
      if (errorCode === 0) {
        this.list = data.list
        this.pageInfo = data.page_info
      }
    },
    handleCurrentChange(index) {
      index = index - 0 - 1
      this.loadInfo({ index })
    },
    delItem(id) {
      this.list = this.list.filter(item => item.show_base_info.show_id !== id)
    }
  },
  mounted() {
    this.loadInfo()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.theater{
  .pagination-wrap{
    text-align: right;
    padding: 10px 0;
    background: #fff;
    border-radius: 4px;
  }
}
</style>
