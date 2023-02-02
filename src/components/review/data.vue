<!--复盘数据-->
<template>
  <div>
    <el-table :data="tableData" :header-cell-style="rowClass" :default-sort="{ prop: 'rdid', order: 'descending' }"
      border style="width: 100%" highlight-current-row>
      <el-table-column fixed sortable prop="rdid" label="日期" width="110" align="left">
        <span slot-scope="scope" >
          <el-tag effect="dark">{{ rdidFormat(scope.row.rdid) }}</el-tag>
        </span>
      </el-table-column>
      <el-table-column prop="historyHigh.length" label="历史新高" align="left">
        <span slot-scope="scope" >
          <a @click="getDetail(scope.row.historyHigh)"  style="text-decoration:underline;">{{ scope.row.historyHigh.length}}</a>
        </span>
      </el-table-column>
      <el-table-column prop="yearHigh" label="一年新高" align="left">
        <span slot-scope="scope" style="color: red;">
          <a @click="getDetail(scope.row.yearHigh)"  style="text-decoration:underline;">{{ scope.row.yearHigh.length}}</a>
        </span>
      </el-table-column>
      <el-table-column prop="yearLow.length" label="一年新低" align="left">
        <span slot-scope="scope">
          <a @click="getDetail(scope.row.yearLow)" style="text-decoration:underline;">{{ scope.row.yearLow.length}}</a>
        </span>
      </el-table-column>
      <el-table-column prop="downLimit" label="跌停" align="left">
        <span slot-scope="scope" style="color: red;">
          <a @click="getDetail(scope.row.downLimit)" style="text-decoration:underline;">{{ scope.row.downLimit.length}}</a>
        </span>
      </el-table-column>
      <el-table-column prop="downFive.length" label="跌幅超5%" align="left">
        <span slot-scope="scope" >
          <a @click="getDetail(scope.row.downFive)" style="text-decoration:underline;">{{ scope.row.downFive.length}}</a>
        </span>
      </el-table-column>
      <el-table-column prop="upLimit" label="涨停" align="left">
        <span slot-scope="scope" style="color: red;">
          <a @click="getDetail(scope.row.upLimit)" style="text-decoration:underline;">{{ scope.row.upLimit.length}}</a>
        </span>
      </el-table-column>
      <el-table-column prop="noOneUp.length" label="非一字涨停" align="left">
        <span slot-scope="scope">
          <a @click="getDetail(scope.row.noOneUp)" style="text-decoration:underline;">{{ scope.row.noOneUp.length}}</a>
        </span>
      </el-table-column>
      <el-table-column prop="upFive.length" label="涨幅超5%" align="left">
        <span slot-scope="scope" >
          <a @click="getDetail(scope.row.upFive)" style="text-decoration:underline;">{{ scope.row.upFive.length}}</a>
        </span>
      </el-table-column>
      <el-table-column prop="upAll" label="上涨家数" align="left">
        <span slot-scope="scope" style="color: red;">
          {{ scope.row.upAll }}
        </span>
      </el-table-column>
      <el-table-column prop="sh_INDEX" label="上证指数" align="left">
      </el-table-column>
      <el-table-column prop="sz_INDEX" label="深证成指" align="center">
      </el-table-column>
      <el-table-column prop="business_INDEX" label="创业板指" align="center">
      </el-table-column>
      <el-table-column prop="turnOver" label="成交额" align="center">
        <span slot-scope="scope" style="color: red;">
          {{ scope.row.turnOver }}
        </span>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNum"
      :page-sizes="[1, 5, 10, 20, 30]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
      <el-dialog :visible.sync="detailVisible" width="80%"
                center title="详情">
      <div style="text-align:center">
        <!--需要弹出的内容部分-->
        <el-table :data="dialog.slice((dialogPageNum-1)*dialogPageSize,dialogPageNum*dialogPageSize)" :header-cell-style="rowClass" border style="width: 100%" highlight-current-row>
          <el-table-column fixed prop="stockCode" label="股票代码" align="left">
          </el-table-column>
          <el-table-column prop="stockName" label="股票名称" align="left">
          </el-table-column>
          <el-table-column  prop="nowPrice" label="现价" align="left">
          </el-table-column>
          <el-table-column  prop="trend" label="涨幅" align="left">
          </el-table-column>
          <el-table-column  prop="turnover" label="成交额" align="left">
          </el-table-column>
          <el-table-column prop="xueQiuLink" label="雪球" align="left">
            <span slot-scope="scope">
              <a :href=scope.row.xueQiuLink target="_blank">跳转</a>
            </span>
          </el-table-column>
        </el-table>
        <el-pagination @size-change="dialogSizeChange" @current-change="dialogCurrentChange" :current-page="dialogPageNum"
         :page-sizes="[5, 10, 20, 30]" :page-size="dialogPageSize" layout="total, sizes, prev, pager, next, jumper"
         :total=dialogTotal>
      </el-pagination>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "Data",
  data() {
    return {
      tableData: [],
      dialog:[],
      dialogPageSize:10,
      dialogPageNum: 1,
      dialogTotal:0,
      pageSize: 10,
      pageNum: 1,
      total: 0,
      detailVisible: false
    }
  },
  methods: {
    loadPost() {
      this.$axios.post('/review/data/page', {
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
    dialogSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.dialogPageNum = 1
      this.dialogPageSize = val
    },
    dialogCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.dialogPageNum = val
    },
    //设置表头的颜色
    rowClass({ row, rowIndex }) {
      console.log(rowIndex) //表头行标号为0
      return 'background: gainsboro'
    },
    getDetail(val) {
      console.log(val);
      this.dialog = val
      this.detailVisible = true
      this.dialogTotal = this.dialog.length
    },
  },
  beforeMount() {
    this.loadPost();
  },
  components: {
  }
}
</script>

<style lang="less" scoped>

</style>