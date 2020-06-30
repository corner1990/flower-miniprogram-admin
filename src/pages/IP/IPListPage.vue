<template>
  <Block class="IPListPage" title="IP列表">
    <div slot="action">
      <el-button type="primary" round icon="el-icon-plus" @click="dialogVisible=true">创建IP</el-button>

      <!-- Dialog -->
      <el-dialog title="创建IP" :visible.sync="dialogVisible">
        <Box row center>
          <el-form :model="starForm" :rules="starRules" ref="starForm">
            <!-- IP名称 -->
            <FormItem title="IP名称" required>
              <el-form-item prop="name">
                <el-input placeholder="输入IP名称" v-model="starForm.name" />
              </el-form-item>
            </FormItem>

            <!-- IP介绍 -->
            <FormItem title="IP介绍" required>
              <el-form-item prop="introduce">
                <el-input
                  type="textarea"
                  maxlength="600"
                  show-word-limit
                  placeholder="输入IP介绍"
                  v-model="starForm.introduce"
                />
              </el-form-item>
            </FormItem>

            <!-- IP头像 -->
            <FormItem title="IP头像" required>
              <el-upload
                :action="uploadOssFileURL"
                :on-success="file=>starForm.avatar[0]=file.data[0]"
                :on-error="handleImageError"
                :file-list="starForm.avatar"
                list-type="picture"
                accept="image/*"
                :limit="1"
                name="image"
                drag
              >
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">
                  将文件拖到此处，或
                  <em>点击上传</em>
                </div>
                <div slot="tip" class="el-upload__tip">建议尺寸 800*800，1张，单个图片不超过20M。</div>
              </el-upload>
            </FormItem>

            <!-- IP主图 -->
            <FormItem title="IP主页头像&明星页卡" required>
              <el-upload
                :action="uploadOssFileURL"
                :on-success="file=>starForm.background[0]=file.data[0]"
                :on-error="handleImageError"
                :file-list="starForm.background"
                list-type="picture"
                accept="image/*"
                :limit="1"
                name="image"
                drag
              >
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">
                  将文件拖到此处，或
                  <em>点击上传</em>
                </div>
                <div slot="tip" class="el-upload__tip">建议尺寸 800*800，1张，单个图片不超过20M。</div>
              </el-upload>
            </FormItem>

            <!-- IP标签 -->
            <FormItem title="IP标签">
              <el-select
                v-model="starForm.tags"
                placeholder="请选择文章标签"
                clearable
                multiple
                filterable
                size="medium"
                remote
                :remote-method="handleRemoteTags"
              >
                <div>
                  <el-option
                    v-for="(item, index) in form.tags"
                    :key="index"
                    :label="item.content"
                    :value="item.id"
                  />
                </div>
              </el-select>
            </FormItem>
          </el-form>
        </Box>
        <div slot="footer" class="dialog-footer">
          <el-button @click="handleClickClear">取消并清空</el-button>
          <el-button type="primary" @click="handleClickConfirmAdd">创 建</el-button>
        </div>
      </el-dialog>
    </div>

    <!-- 筛选 -->
    <el-form style="max-width: 600px;" :model="form">
      <!-- <Headline>搜索IP</Headline> -->
      <el-select
        v-model="form.selectedIp"
        filterable
        remote
        :remote-method="loadIp"
        size="medium"
        placeholder="输入IP关键字搜索"
      >
        <el-option
          :label="star.content"
          :value="star.content"
          v-for="(star, index) in form.ipList"
          :key="index"
        ></el-option>
      </el-select>
      <el-button style="margin-left: 10px;" size="medium" @click="form.selectedIp = ''">清空并获取全部</el-button>
    </el-form>

    <!-- 列表 -->
    <el-table
      class="table"
      :data="tableData"
      style="width: 100%; margin-top: 20px;"
      v-loading="loading"
    >
      <!-- 物料内容 -->
      <el-table-column label="IP名称">
        <template slot-scope="scope">{{scope.row.star_name}}</template>
      </el-table-column>

      <!-- 物料内容 -->
      <el-table-column label="IP热度">
        <!-- <template slot-scope="scope"></template> -->
      </el-table-column>

      <!-- 物料内容 -->
      <el-table-column label="IP介绍" min-width="400">
        <template slot-scope="scope">{{scope.row.official_description}}</template>
      </el-table-column>

      <!-- 物料内容 -->
      <el-table-column label="IP商品数">
        <!-- <template slot-scope="scope"></template> -->
      </el-table-column>

      <!-- 物料内容 -->
      <el-table-column label="IP头像">
        <template slot-scope="scope">
          <div class="table__avatar">
            <img :src="scope.row.official_avatar" alt />
          </div>
        </template>
      </el-table-column>

      <!-- 物料内容 -->
      <el-table-column label="IP主页头图">
        <template slot-scope="scope">
          <div class="table__bg">
            <img :src="scope.row.official_background" alt />
          </div>
        </template>
      </el-table-column>

      <!-- 物料内容 -->
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type plain icon="el-icon-edit" round @click="handleClickEdit(scope.row.id)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      class="pagination"
      background
      layout="prev, pager, next"
      :current-page.sync="pageInfo.index"
      @current-change="handlePageChange"
      :page-count="pageInfo.pageCount"
      hide-on-single-page
    ></el-pagination>
  </Block>
</template>

<script>
import Block from '../material/components/MaterialAds/Block.vue'
import FormItem from '../material/components/FormItem.vue'
// import Headline from '../material/components/MaterialAds/Headline.vue'
import { getStarIpList, uploadOssFileURL } from '../material/api'
import { getIpList, saveStar } from './api'
// import { fetchData } from '../../api'
import { Box } from 'vue-raw-ui'

export default {
  name: 'IPListPage',
  components: {
    Block,
    FormItem,
    // Headline,
    Box
  },
  data() {
    return {
      uploadOssFileURL,
      tableData: [],
      pageInfo: {
        index: 0,
        pageCount: 1
      },
      form: {
        selectedIp: '',
        ipList: []
      },
      starForm: {
        name: '',
        introduce: '',
        avatar: [],
        background: [],
        tags: []
      },
      starRules: {
        name: [{ required: true, message: '请输入IP名称', trigger: 'blur' }],
        introduce: [{ required: true, message: '请输入IP介绍', trigger: 'blur' }]
      },
      loading: false,
      dialogVisible: false
    }
  },
  methods: {
    // 编辑star
    async handleClickEdit(id) {
      this.$router.push({ path: 'ipedit', query: { id } })
    },
    // 翻页
    handlePageChange() {
      this.fetchData()
    },
    async loadIp(keyword) {
      const { errorCode, data } = await getStarIpList({ index: 0, page_size: 10, keyword })
      if (errorCode === 0) {
        this.form.ipList = data
      }
    },
    async fetchData(star_name) {
      this.loading = true
      const { errorCode, data } = await getIpList({ index: this.pageInfo.index - 1, star_name })
      this.loading = false
      if (errorCode === 0) {
        const { pageInfo, star_list } = data
        this.pageInfo.pageCount = Math.ceil(pageInfo.count / pageInfo.page_size) // 总页数
        this.tableData = star_list // 表格数据
      }
    },
    // 上传错误
    handleImageError() {
      this.$message.error('上传图片失败，请重新上传')
    },
    handleRemoteTags() {},
    // 确认创建IP
    handleClickConfirmAdd() {
      this.$refs.starForm.validate(async valid => {
        if (!this.starForm.avatar || !this.starForm.background) return this.$message.error('请上传图片')
        if (!valid) return

        const star_name = this.starForm.name
        const star_desc = this.starForm.introduce
        const avatar = this.starForm.avatar[0]
        const background = this.starForm.background[0]

        const { errorCode, data } = await saveStar({ star_name, star_desc, avatar, background })
        if (errorCode === 0) {
          console.log(data)
          this.$message.success('IP创建成功')
          this.resetStarForm()
          this.fetchData()
          this.dialogVisible = false
        }
      })
    },
    // 取消创建IP
    handleClickClear() {
      this.resetStarForm()
      setTimeout(() => {
        this.dialogVisible = false
      }, 300)
    },
    // 清空starForm
    resetStarForm() {
      this.starForm = {
        name: '',
        introduce: '',
        avatar: [],
        background: [],
        tags: []
      }
    }
  },
  watch: {
    'form.selectedIp'(star_name) {
      this.fetchData(star_name)
      console.log(star_name)
    }
  },
  mounted() {
    this.loadIp()
    this.fetchData()
  }
}
</script>

<style lang="less" scoped>
@import '../../less/main.less';

.table {
  &__avatar {
    .size(60px);
    .fit();
    border-radius: 50%;
    overflow: hidden;
  }

  &__bg {
    .fit(contain);
  }
}
</style>
