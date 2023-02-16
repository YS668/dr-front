<!--上涨家数界面-->
<template>
    <div>
    <el-table :data="tableData" :header-cell-style="rowClass" :default-sort = "{prop: 'rdid', order: 'descending'}" 
    border style="width: 100%" max-height="800" highlight-current-row>
      <el-table-column fixed sortable prop="rdid" width="110" label="日期" align="left">
        <span slot-scope="scope">
          <el-tag effect="dark">{{ rdidFormat(scope.row.rdid) }}</el-tag>
        </span>
      </el-table-column>
      <el-table-column prop="ninetfup" label="9点25" align="left">
        <span slot-scope="scope" :class="(scope.row.ninetfup > 3000) ? 'red':'' ">
          {{ scope.row.ninetfup }}
        </span>
      </el-table-column>
      <el-table-column prop="tenup" label="10点" align="left">
        <span slot-scope="scope" :class="(scope.row.tenup > 3000) ? 'red':'' ">
          {{ scope.row.tenup }}
        </span>
      </el-table-column>
      <el-table-column prop="elevenup" label="11点" align="left">
        <span slot-scope="scope" :class="(scope.row.elevenup > 3000) ? 'red':'' ">
          {{ scope.row.elevenup }}
        </span>
      </el-table-column>
      <el-table-column prop="thirteenup" label="13点" align="left">
        <span slot-scope="scope" :class="(scope.row.thirteenup > 3000) ? 'red':'' ">
          {{ scope.row.thirteenup }}
        </span>
      </el-table-column>
      <el-table-column prop="fourteenup" label="14点" align="left">
        <span slot-scope="scope" :class="(scope.row.fourteenup > 3000) ? 'red':'' ">
          {{ scope.row.fourteenup }}
        </span>
      </el-table-column>
      <el-table-column prop="fourteentheup" label="14点30" align="left">
        <span slot-scope="scope" :class="(scope.row.fourteentheup > 3000) ? 'red':'' ">
          {{ scope.row.fourteentheup }}
        </span>
      </el-table-column>
      <el-table-column prop="fifteenup" label="15点" align="left">
        <span slot-scope="scope" :class="(scope.row.fifteenup > 3000) ? 'red':'' ">
          {{ scope.row.fifteenup }}
        </span>
      </el-table-column>
    </el-table>
    <nav style="text-align: center"> <!-- 分页居中放置-->
      <el-pagination 
      @size-change="handleSizeChange" 
      @current-change="handleCurrentChange" 
      :current-page="pageNum"
      :page-sizes="[10,30,50,100]" 
      :page-size="pageSize" 
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
      </nav>
    
  </div>
  </template>
  
  <script type="text/javascript">
  export default {
    name: "Up",
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
      this.$axios.post('/up/page', {
        pageSize:this.pageSize,
        pageNum:this.pageNum,
        param:{
          
        }
      }).then(res => {
        if (res.code == 200) {
          this.$message({
            message: '操作成功！',
            type: 'success'
          });
          this.tableData = res.data
          this.total=res.total
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
    rowClass({ row, rowIndex}) {
        console.log(rowIndex) //表头行标号为0
        return 'background: gainsboro'
    },
  },
  beforeMount() {
    this.loadPost();
  },
  //设置表头的颜色
  components: {
  }
  }
  </script>
  
  <style lang="less" scoped>

  </style>