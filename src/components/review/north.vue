<!--北向资金界面-->
<template>
  <div>
    <el-table :data="tableData" :header-cell-style="rowClass" :default-sort="{ prop: 'rdid', order: 'descending' }" border
      style="width: 100%" max-height="800" highlight-current-row>
      <el-table-column fixed sortable prop="rdid" width="110" label="日期" align="left">
        <span slot-scope="scope">
          <el-tag effect="dark">{{ rdidFormat(scope.row.rdid) }}</el-tag>
        </span>
      </el-table-column>
      <el-table-column prop="northAll" label="北向净买入" align="left">
        <span slot-scope="scope" :class="(scope.row.northAll.slice(0,1) =='-') ? 'green':'red' ">
          {{ scope.row.northAll }}
        </span>
      </el-table-column>
      <el-table-column  prop="shIndex" label="上证指数" align="left">
        <span slot-scope="scope" :class="(scope.row.shIndex.slice(0,1) =='-') ? 'green':'red' ">
          {{ scope.row.shIndex }}
        </span>
      </el-table-column>
      <el-table-column prop="hgtb" label="沪股通净买入" align="left">
      </el-table-column>
      <el-table-column prop="sgtb" label="深股通净买入" align="left">
      </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNum"
      :page-sizes="[10, 30, 50, 100]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "North",
  data() {
    return {
      tableData: [],
      pageSize: 10,
      pageNum: 1,
      total: 0,
    }
  },
  methods: {
    loadPost() {
      this.$axios.post('/north/page', {
        pageSize: this.pageSize,
        pageNum: this.pageNum,
        param: {

        }
      }).then(res => {
        if (res.code == 200) {
          this.$message({
            message: '操作成功！',
            type: 'success'
          });
          this.tableData = res.data
          this.total = res.total
        } else {
          this.$message({
            message: '操作失败！',
            type: 'error'
          });
        }
      })
    },
    rdidFormat(rdid) {
      return rdid.substring(0, 4) + "-" + rdid.substring(4, 6) + "-" + rdid.substring(6, 8);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageNum = 1
      this.pageSize = val
      this.loadPost()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pageNum = val
      this.loadPost()
    },
    //设置表头的颜色
    rowClass({ row, rowIndex }) {
      console.log(rowIndex) //表头行标号为0
      return 'background: gainsboro'
    }
  },
  beforeMount() {
    this.loadPost();
  },
  components: {
  }
}
</script>

<style lang="less" scoped>
.red {
  color: red;
}

.green {
  color: green;
}
</style>