<!--涨停界面-->
<template>
  <div>
    <el-table :data="tableData.slice((pageNum - 1) * pageSize, pageNum * pageSize)" :header-cell-style="rowClass"
      :default-sort="{ prop: 'day', order: 'descending' }" border style="width: 100%" max-height="800"
      highlight-current-row>
      <el-table-column fixed prop="rdid" width="110" label="日期" align="left">
        <span slot-scope="scope">
          <el-tag effect="dark">{{ rdidFormat(scope.row.rdid) }}</el-tag>
        </span>
      </el-table-column>
      <el-table-column prop="stockCode" label="股票代码" width="130" align="left">
        <span slot-scope="scope">
          <el-popover placement="right" width="400" trigger="hover" @show="setGifList(scope.row.stockCode)">
            <div class="block">
              <el-carousel trigger="click" :loop=Boolean.false>
                <el-carousel-item v-for="item in gifList" :key="item">
                  <img style="height:100%;width:100%;" :src=item />
                </el-carousel-item>
              </el-carousel>
            </div>
            <el-button slot="reference">{{
              scope.row.stockCode
            }}</el-button>
          </el-popover>
        </span>
      </el-table-column>
      <el-table-column prop="stockName" label="股票名称"  align="left">
      </el-table-column>
      <el-table-column prop="trend" label="涨跌" align="left">
      </el-table-column>
      <el-table-column prop="nowPrice" label="现价" align="left">
      </el-table-column>
      <el-table-column sortable prop="day" label="连续涨停天数" align="left">
      </el-table-column>
      <el-table-column prop="dayNum" label="几天几板" align="left">
      </el-table-column>
      <el-table-column sortable prop="reason" label="涨停原因类别" align="left">
      </el-table-column>
      <el-table-column prop="openNum" label="涨停开板次数" align="left">
      </el-table-column>
      <el-table-column prop="firstUp" label="首次涨停时间" align="left">
      </el-table-column>
      <el-table-column prop="lastUp" label="最终涨停时间" align="left">
      </el-table-column>
      <el-table-column prop="upValue" label="涨停封单额" align="left">
      </el-table-column>
      <el-table-column prop="turnover" label="成交额" align="left">
      </el-table-column>
      <el-table-column prop="value" label="" align="left">
        <template slot-scope="{}" slot="header">
          <span>市值</span>
          <el-tooltip class="item" effect="dark" content="a股市值(不含限售股)" placement="right">
            <i class="el-icon-question" style="margin-left: 5px"></i>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="upType" label="涨停类型" align="left">
      </el-table-column>
      <el-table-column label="链接" align="left">
        <span slot-scope="scope">
          <a :href=scope.row.xueQiuLink target="_blank" style="margin-left: 6px">雪球</a>
          <a :href=scope.row.taoGuLink target="_blank" style="margin-left: 6px">淘股吧</a>
          <a :href=scope.row.dongFangLink target="_blank" style="margin-left: 6px">东方财富</a>
          <a :href=scope.row.tongHLink target="_blank" style="margin-left: 6px">同花顺</a>
        </span>
      </el-table-column>

    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNum"
      :page-sizes="[999, 100, 50, 30]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "UpLimit",
  data() {
    return {
      tableData: [],
      pageSize: 999,
      pageNum: 1,
      total: 0,
      gifList: []
    }
  },
  methods: {
    loadPost() {
      this.$axios.get('/up/limit').then(res => {
        if (res.code == 200) {
          this.$message({
            message: '操作成功！',
            type: 'success'
          });
          this.tableData = res.data
          this.total = res.data.length
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
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pageNum = val
    },
    //设置表头的颜色
    rowClass({ row, rowIndex }) {
      console.log(rowIndex) //表头行标号为0
      return 'background: gainsboro'
    },
    //K线图
    setGifList(val) {
      //先清空数组
      this.gifList.length = 0
      this.gifList.push("http://image.sinajs.cn/newchart/min/n/" + val.slice(0, 2).toLowerCase() + val.slice(2) + ".gif")
      this.gifList.push("http://image.sinajs.cn/newchart/daily/n/" + val.slice(0, 2).toLowerCase() + val.slice(2) + ".gif")
      this.gifList.push("http://image.sinajs.cn/newchart/weekly/n/" + val.slice(0, 2).toLowerCase() + val.slice(2) + ".gif")
      this.gifList.push("http://image.sinajs.cn/newchart/monthly/n/" + val.slice(0, 2).toLowerCase() + val.slice(2) + ".gif")
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