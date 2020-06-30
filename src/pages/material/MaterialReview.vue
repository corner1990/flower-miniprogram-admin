<template>
  <Block class="MaterialReview" title="内容审核">
    <FilterForm @clickFilter="handleClickFilter" />

    <Divider invisible />

    <Feeds :filterForm="filterForm" />
  </Block>
</template>

<script>
import Block from './components/MaterialAds/Block.vue'
import FilterForm from './components/MaterialReview/FilterForm.vue'
import Feeds from './components/MaterialReview/Feeds.vue'
import Divider from '../../components/Divider.vue'

export default {
  name: 'MaterialReview',
  components: {
    Block,
    FilterForm,
    Feeds,
    Divider
  },
  data(){
    return {
      filterForm: {}
    }
  },
  methods: {
    handleClickFilter(form){
      this.filterForm = {...form}
    }
  }
}
</script>

<style lang="less" scoped>

</style>
