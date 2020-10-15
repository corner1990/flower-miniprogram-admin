<template>
  <div class="Editor">
    <quill-editor
      ref="myTextEditor"
      v-model="content"
      :options="editorOption"
      @change="handleChange"
    ></quill-editor>
  </div>
</template>

<script>
// 全局quill样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

// import { q } from 'vue-quill-editor'
import { quillEditor } from 'vue-quill-editor'
import { mapMutations } from 'vuex'

// 编辑器配置
const editorOption = {
  placeholder: '写点东西吧~',
  theme: 'snow',
  modules: {
    toolbar: [{ header: 2 }, 'bold', 'italic', 'underline', { align: [] }]
    // 暂时屏蔽发图的
    // toolbar: [{ header: 2 }, 'bold', 'italic', 'underline', { align: [] }, 'image']
  }
}

export default {
  name: 'Editor',
  components: {
    quillEditor
  },
  data() {
    return {
      editorOption
    }
  },
  methods: {
    ...mapMutations('material/ads', ['filterContentHtml']),
    handleChange() {}
  },
  computed: {
    content: {
      get() {
        return this.$store.state.material.ads.contentHtml
      },
      set(payload) {
        this.$store.commit('material/ads/updateContentHtml', payload)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.Editor {
  width: 460px;
  margin-bottom: 20px;
}
</style>

<style lang="less">
// 编辑区域高度
.ql-editor {
  max-height: 70vh;
}
</style>
