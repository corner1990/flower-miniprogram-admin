<template>
  <div class="data-table">
    <template>
      <InfoCard :info="info"  v-for="(info, key) in list" :key="key" />
    </template>
    
  </div>
</template>

<script>
import InfoCard from './info-card'
import { dateFormat } from '@/utils/utils'

export default {
  name: 'data-table',
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
        query: {
            address: '',
            name: '',
            pageIndex: 1,
            pageSize: 10
        },
        tableData: [],
        multipleSelection: [],
        delList: [],
        editVisible: false,
        pageTotal: 0,
        form: {},
        idx: -1,
        id: -1
    };
    },
    created() {
    },
    methods: {
      // 删除操作
      handleDelete(index) {
          // 二次确认删除
          this.$confirm('确定要删除吗？', '提示', {
              type: 'warning'
          })
              .then(() => {
                  this.$message.success('删除成功');
                  this.tableData.splice(index, 1);
              })
              .catch(() => {});
      },
      // 多选操作
      handleSelectionChange(val) {
          this.multipleSelection = val;
      },
      delAllSelection() {
          const length = this.multipleSelection.length;
          let str = '';
          this.delList = this.delList.concat(this.multipleSelection);
          for (let i = 0; i < length; i++) {
              str += this.multipleSelection[i].name + ' ';
          }
          this.$message.error(`删除了${str}`);
          this.multipleSelection = [];
      },
      // 编辑操作
      handleEdit(index, row) {
        this.$router.push({
          path: '/edit-product',
          query: {id: row.id}
        })
      },
      // 保存编辑
      saveEdit() {
        this.editVisible = false;
        this.$message.success(`修改第 ${this.idx + 1} 行成功`);
        this.$set(this.tableData, this.idx, this.form);
      }
  },
  components: {
    InfoCard
  },
  filters: {
    formTime(t) {
      t = new Date(t * 1000)
      return dateFormat(t)
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.data-table{
  max-height: calc(100vh - 320px);
  overflow: auto;
}
</style>
<style>
.el-table__expanded-cell[class*=cell]{
  padding: 10px
}
</style>
