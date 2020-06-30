<template>
  <Block class="IPEditPage" title="IP信息编辑" desc="对需要修改的信息进行修改" v-loading="loading">
    <el-form style="max-width: 600px;" :model="form" :rules="rules" ref="form">
      <!-- IP名称 -->
      <FormItem title="IP名称">
        <el-form-item prop="name">
          <el-input v-model="form.name" placeholder="输入IP名称" size="medium" />
        </el-form-item>
      </FormItem>

      <!-- IP介绍 -->
      <FormItem title="IP介绍">
        <el-form-item prop="introduce">
          <el-input
            v-model="form.introduce"
            type="textarea"
            maxlength="600"
            show-word-limit
            placeholder="输入IP介绍"
            size="medium"
            :autosize="{minRows: 3, maxRows: 8}"
          />
        </el-form-item>
      </FormItem>

      <!-- IP头像 -->
      <FormItem title="IP头像">
        <Box v-if="prevAvatar" avatar size="50" slot="caption">
          <img :src="prevAvatar" alt="">
        </Box>
        <p v-else slot="caption">暂无头像</p>

        <el-upload
          :action="uploadOssFileURL"
          :on-change="handleAvatarChange"
          :on-remove="handleAvatarRemove"
          :on-error="handleImageError"
          list-type="picture"
          :file-list="form.avatar"
          accept="image/*"
          :limit="1"
          name="image"
          drag
          :on-exceed="handleAvatarExceed"
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
      <FormItem title="IP主页头像&明星页卡">
        <Box v-if="prevBg" fit :size="[80,60]" slot="caption">
          <img :src="prevBg" alt="">
        </Box>
        <p v-else slot="caption">暂无背景图</p>

        <el-upload
          :action="uploadOssFileURL"
          :on-change="handleBgChange"
          :on-remove="handleBgRemove"
          :on-error="handleImageError"
          list-type="picture"
          :file-list="form.background"
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
          v-model="form.tags"
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

      <el-button size="medium" type="primary" @click="handleClickSave" :loading="saving" icon="el-icon-s-promotion">保存</el-button>
      <el-button size="medium" @click="$router.back()">返回</el-button>
    </el-form>
  </Block>
</template>

<script>
import Block from '../material/components/MaterialAds/Block.vue'
import FormItem from '../material/components/FormItem.vue'
import { uploadOssFileURL } from '../material/api'
import { getStarInfo, updateStarInfo } from './api'
import {Box} from 'vue-raw-ui'

export default {
  name: 'IPEditPage',
  components: {
    Block,
    FormItem,
    Box
  },
  data() {
    return {
      uploadOssFileURL,
      form: {
        name: '',
        introduce: '',
        avatar: [],
        background: [],
        tags: []
      },
      prevAvatar: '',
      prevBg: '',
      rules: {
        name: [{ required: true, message: '请输入IP名称', trigger: 'blur' }],
        introduce: [{ required: true, message: '请输入IP介绍', trigger: 'blur' }]
      },
      loading: true,
      saving: false
    }
  },
  methods: {
    // 添加图片文件
    handleAvatarChange(file, fileList) {
      this.form.avatar = fileList
    },
    // 删除图片文件
    handleAvatarRemove(file, fileList) {
      this.form.avatar = fileList
    },
    handleAvatarExceed(file, fileList) {
      console.log( fileList )
    },
    // 添加图片文件
    handleBgChange(file, fileList) {
      this.form.background = fileList
    },
    // 删除图片文件
    handleBgRemove(file, fileList) {
      this.form.background = fileList
    },
    // 上传错误
    handleImageError() {
      this.$message.error('上传图片失败，请重新上传')
    },
    handleRemoteTags() {

    },
    handleClickSave() {
      this.$refs.form.validate(async valid=>{
        if(!valid) return

        const star_name = this.form.name
        const official_description = this.form.introduce
        const official_avatar = this.form.avatar.length ? this.form.avatar[0].response.data[0] : false
        const official_background = this.form.background.length ? this.form.background[0].response.data[0] : false
        const star_id = this.query.id

        const {errorCode, data} = await updateStarInfo({ star_id, star_name, official_description, ...official_avatar?{official_avatar}:null, ...official_background?{official_background}:null })
        if(errorCode === 0){
          console.log( data )
          this.$message.success('修改成功')
          this.$router.back()
        }
      })
    },
    // 获取明星信息
    async fetchData(){
      const {errorCode, data} = await getStarInfo({star_id: this.query.id})
      this.loading = false
      if(errorCode === 0){
        this.form.name = data.data.star_name
        this.form.introduce = data.data.official_description
        this.prevAvatar = data.data.official_avatar
        this.prevBg = data.data.official_background
      }
    }
  },
  computed: {
    query() {
      return this.$route.query
    }
  },
  mounted(){
    this.fetchData()
  }
}
</script>

<style lang="less" scoped>
</style>
