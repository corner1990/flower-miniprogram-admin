<template>
  <Block class="MaterialCommentsReviewPage" title="评论审核">
    <FilterForm />

    <Divider/>
    
    <Result />
  </Block>
</template>

<script>
import Block from './components/MaterialAds/Block.vue'
import FilterForm from './components/MaterialCommentsReview/FilterForm.vue'
import Result from './components/MaterialCommentsReview/Result.vue'
// import Headline from './components/MaterialAds/Headline.vue'
import Divider from '../../components/Divider.vue'

export default {
  name: 'MaterialCommentsReviewPage',
  components: {
    Block,
    FilterForm,
    Result,
    // Headline,
    Divider
  }
}
</script>

<style lang="less" scoped>

</style>
