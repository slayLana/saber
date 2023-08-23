
<template>
  <el-drawer
  title="列显引"
  size="22%"
  :visible.sync="visible"  :modal-append-to-body="false"
  @close="handleClose"
  >
   <el-table
   class="el-table el-table--fit el-table--border el-table--scrollable-y el-table--enable-row-hover el-table--enable-row-transition el-table--small"
   size="small"
      :data="option.column"
      style="width: 100%">
      <el-table-column
        prop="label"
        label="列名"
        width="190">
      </el-table-column>
      <el-table-column
        prop="hide"
        label="隐藏"
        width="100">
        <template slot-scope="{ row }">
          <el-checkbox v-model="row.hide"></el-checkbox>
        </template>
      </el-table-column>
      
    </el-table>
</el-drawer>

</template>
<script>
export default {
  name: "table-drawer",
  props: {
    visible:{
      type:Boolean,
      default:false
    },
    option:{
      type:Object,
      default:()=>({})
    }
  },
  data() {
    return {
      
    };
  },
  mounted(){
  },
  computed: {
    
  },
  methods: {
    handleClose(){
      this.$emit('update:visible',false)
    }
  },
}
</script>

<style lang="scss">
.el-drawer__body{
  padding: 30px 10px 60px 30px;
}

.el-drawer__header {
    margin: 0;
    min-height: 20px;
    padding: 16px 10px 16px 24px;
    border-bottom: 1px solid #f0f0f0;
}
.el-dialog__title, .el-drawer__header {
    color: rgba(0,0,0,.85);
    font-weight: 500;
    word-wrap: break-word;
}
</style>
