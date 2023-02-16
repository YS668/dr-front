<!--复盘数据-->
<template>
  <div>
    <el-table :data="tableData" :header-cell-style="rowClass" :default-sort="{ prop: 'rdid', order: 'descending' }"
      border style="width: 100%" max-height="800" highlight-current-row>
      <el-table-column fixed sortable prop="rdid" label="日期" width="110" align="left">
        <span slot-scope="scope">
          <el-tag effect="dark">{{ rdidFormat(scope.row.rdid) }}</el-tag>
        </span>
      </el-table-column>
      <el-table-column prop="historyHigh.length" label="历史新高" align="left">
        <template slot-scope="{}" slot="header">
          <span>历史新高</span>
          <el-tooltip class="item" effect="dark" content="问财：今日创历史新高，非ST，非4和8开头" placement="right">
            <i class="el-icon-question" style="margin-left: 5px"></i>
          </el-tooltip>
        </template>
        <span slot-scope="scope" :class="(scope.row.historyHigh.length > 10) ? 'red' : ''">
          <a @click="getDetail(scope.row.historyHigh)" style="text-decoration:underline;">{{
            scope.row.historyHigh.length
          }}</a>
        </span>
      </el-table-column>
      <el-table-column prop="yearHigh" label="一年新高" align="left">
        <template slot-scope="{}" slot="header">
          <span>一年新高</span>
          <el-tooltip class="item" effect="dark" content="问财：今日创一年新高，非ST，非4和8开头" placement="right">
            <i class="el-icon-question" style="margin-left: 5px"></i>
          </el-tooltip>
        </template>
        <span slot-scope="scope">
          <a @click="getDetail(scope.row.yearHigh)" :class="(scope.row.yearHigh.length > 70) ? 'red' : ''"
            style="text-decoration:underline;">{{
              scope.row.yearHigh.length
            }}</a>
        </span>
      </el-table-column>
      <el-table-column prop="yearLow.length" label="一年新低" align="left">
        <template slot-scope="{}" slot="header">
          <span>一年新低</span>
          <el-tooltip class="item" effect="dark" content="问财：今日创一年新低，非ST，非4和8开头" placement="right">
            <i class="el-icon-question" style="margin-left: 5px"></i>
          </el-tooltip>
        </template>
        <span slot-scope="scope">
          <a @click="getDetail(scope.row.yearLow)" style="text-decoration:underline;">{{ scope.row.yearLow.length }}</a>
        </span>
      </el-table-column>
      <el-table-column prop="downLimit" label="跌停" align="left">
        <template slot-scope="{}" slot="header">
          <span>跌停</span>
          <el-tooltip class="item" effect="dark" content="问财：今日跌停，非ST，非4和8开头" placement="right">
            <i class="el-icon-question" style="margin-left: 5px"></i>
          </el-tooltip>
        </template>
        <span slot-scope="scope" :class="(scope.row.downLimit.length > 5) ? 'red' : ''">
          <a @click="getDetail(scope.row.downLimit)" style="text-decoration:underline;">{{
            scope.row.downLimit.length
          }}</a>
        </span>
      </el-table-column>
      <el-table-column prop="downFive.length" label="跌幅超5%" align="left">
        <template slot-scope="{}" slot="header">
          <span>跌幅超5%</span>
          <el-tooltip class="item" effect="dark" content="问财：今日跌幅大于5%，非ST，非4和8开头" placement="right">
            <i class="el-icon-question" style="margin-left: 5px"></i>
          </el-tooltip>
        </template>
        <span slot-scope="scope">
          <a @click="getDetail(scope.row.downFive)" style="text-decoration:underline;">{{
            scope.row.downFive.length
          }}</a>
        </span>
      </el-table-column>
      <el-table-column prop="upLimit" label="涨停" align="left">
        <template slot-scope="{}" slot="header">
          <span>涨停</span>
          <el-tooltip class="item" effect="dark" content="问财：今日涨停，非ST，非4和8开头" placement="right">
            <i class="el-icon-question" style="margin-left: 5px"></i>
          </el-tooltip>
        </template>
        <span slot-scope="scope" :class="(scope.row.upLimit.length > 80) ? 'red' : ''">
          <a @click="getDetail(scope.row.upLimit)" style="text-decoration:underline;">{{ scope.row.upLimit.length }}</a>
        </span>
      </el-table-column>
      <el-table-column prop="noOneUp.length" label="非一字涨停" align="left">
        <template slot-scope="{}" slot="header">
          <span>非一字涨停</span>
          <el-tooltip class="item" effect="dark" content="问财：今日非一字涨停，非ST，非4和8开头" placement="right">
            <i class="el-icon-question" style="margin-left: 5px"></i>
          </el-tooltip>
        </template>
        <span slot-scope="scope" :class="(scope.row.noOneUp.length > 70) ? 'red' : ''">
          <a @click="getDetail(scope.row.noOneUp)" style="text-decoration:underline;">{{ scope.row.noOneUp.length }}</a>
        </span>
      </el-table-column>
      <el-table-column prop="upFive.length" label="涨幅超5%" align="left">
        <template slot-scope="{}" slot="header">
          <span>涨幅超5%</span>
          <el-tooltip class="item" effect="dark" content="问财：今日涨幅大于5%，非ST，非4和8开头" placement="right">
            <i class="el-icon-question" style="margin-left: 5px"></i>
          </el-tooltip>
        </template>
        <span slot-scope="scope" :class="(scope.row.upFive.length > 300) ? 'red' : ''">
          <a @click="getDetail(scope.row.upFive)" style="text-decoration:underline;">{{ scope.row.upFive.length }}</a>
        </span>
      </el-table-column>
      <el-table-column prop="upAll" label="上涨家数" align="left">
        <template slot-scope="{}" slot="header">
          <span>上涨家数%</span>
          <el-tooltip class="item" effect="dark" content="收盘时上涨家数" placement="right">
            <i class="el-icon-question" style="margin-left: 5px"></i>
          </el-tooltip>
        </template>
        <span slot-scope="scope" :class="(scope.row.upAll > 3000) ? 'red' : ''">
          {{ scope.row.upAll }}
        </span>
      </el-table-column>
      <el-table-column prop="sh_INDEX" label="上证指数" align="left">
        <template slot-scope="{}" slot="header">
          <a href="https://xueqiu.com/S/SH000001" target="_blank">上证指数</a>
        </template>
        <span slot-scope="scope" :class="(scope.row.sh_INDEX.slice(0, 1) == '-') ? 'green' : 'red'">
          {{ scope.row.sh_INDEX }}
        </span>
      </el-table-column>
      <el-table-column prop="sz_INDEX" label="深证成指" align="center">
        <template slot-scope="{}" slot="header">
          <a href="https://xueqiu.com/S/SZ399001" target="_blank">深证成指</a>
        </template>
        <span slot-scope="scope" :class="(scope.row.sz_INDEX.slice(0, 1) == '-') ? 'green' : 'red'">
          {{ scope.row.sz_INDEX }}
        </span>
      </el-table-column>
      <el-table-column prop="business_INDEX" label="创业板指" align="center">
        <template slot-scope="{}" slot="header">
          <a href="https://xueqiu.com/S/SZ399006" target="_blank">创业板指</a>
        </template>
        <span slot-scope="scope" :class="(scope.row.business_INDEX.slice(0, 1) == '-') ? 'green' : 'red'">
          {{ scope.row.business_INDEX }}
        </span>
      </el-table-column>
      <el-table-column prop="turnOver" label="成交额" align="center">
        <span slot-scope="scope"
          :class="(scope.row.turnOver.slice(0, 1) == '9' || scope.row.turnOver.slice(0, 1) == '1') ? 'red' : ''">
          {{ scope.row.turnOver }}
        </span>
      </el-table-column>
    </el-table>
    <nav style="text-align: center"> <!-- 分页居中放置-->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNum"
        :page-sizes="[10, 30, 50, 100]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </nav>

    <el-dialog :visible.sync="detailVisible" width="80%" center title="详情">
      <div style="text-align:center">
        <!--需要弹出的内容部分-->
        <el-table :data="dialog.slice((dialogPageNum - 1) * dialogPageSize, dialogPageNum * dialogPageSize)"
          :header-cell-style="rowClass" border style="width: 100%" max-height="600" highlight-current-row>
          <el-table-column fixed prop="stockCode" label="股票代码" align="left">
            <span slot-scope="scope">
              <el-popover placement="right" width="400" trigger="hover" @show="setGifList(scope.row.stockCode)">
                <div class="block">
                  <el-carousel trigger="click" :interval="0">
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
          <el-table-column prop="stockName" label="股票名称" align="left">
          </el-table-column>
          <el-table-column prop="nowPrice" label="现价" align="left">
          </el-table-column>
          <el-table-column prop="trend" label="涨幅" align="left">
            <span slot-scope="scope" :class="(scope.row.trend.slice(0, 1) == '-') ? 'green' : 'red'">
              {{ scope.row.trend }}
            </span>
          </el-table-column>
          <el-table-column prop="turnover" label="成交额" align="left">
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
        <nav style="text-align: center"> <!-- 分页居中放置-->
          <el-pagination @size-change="dialogSizeChange" @current-change="dialogCurrentChange"
            :current-page="dialogPageNum" :page-sizes="[10, 30, 50, 100]" :page-size="dialogPageSize"
            layout="total, sizes, prev, pager, next, jumper" :total=dialogTotal>
          </el-pagination>
        </nav>

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
      dialog: [],
      dialogPageSize: 10,
      dialogPageNum: 1,
      dialogTotal: 0,
      pageSize: 10,
      pageNum: 1,
      total: 0,
      detailVisible: false,
      gifList: [],
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
    //弹出框
    getDetail(val) {
      console.log(val);
      this.dialog = val
      this.detailVisible = true
      this.dialogTotal = this.dialog.length
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
.el-carousel__item {
  width: 100%;
}
</style>