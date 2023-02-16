<!--计划界面-->
<template>
  <div class="page-content">
    <div style="margin-bottom: 5px;">
      <el-input v-model="topic" placeholder="请输入主题" suffix-icon="el-icon-search" style="width: 200px;"
        @keyup.enter.native="loadPost" max-height="800"></el-input>
      <el-button type="primary" style="margin-left: 5px;" @click="loadPost">查询</el-button>
      <el-button type="success" @click="topic = ''">重置</el-button>
    </div>
    <el-table :data="tableData" :header-cell-style="rowClass" 
      border style="width: 100%" highlight-current-row>
      <el-table-column fixed  prop="rdid" width="110" label="日期" align="left">
        <span slot-scope="scope">
          <el-tag effect="dark">{{ rdidFormat(scope.row.rdid) }}</el-tag>
        </span>
      </el-table-column>
      <el-table-column prop="topic" label="主题" align="left">
      </el-table-column>
      <!--日周月年-->>
      <el-table-column prop="type" label="类型" align="left">
        <span slot-scope="scope">
          {{ getType(scope.row.type) }}
        </span>
      </el-table-column>
      <el-table-column prop="flag" label="复盘模式" align="left">
        <span slot-scope="scope">
          {{ getFlag(scope.row.flag) }}
        </span>
      </el-table-column>
      <el-table-column prop="operate" label="操作">
        <template slot-scope="scope">
          <el-button size="small" type="success"
            @click="getContent(scope.row.content, scope.row.type, scope.row.rdid)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <nav style="text-align: center"> <!-- 分页居中放置-->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNum"
        :page-sizes="[10, 20, 30]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </nav>

    <el-dialog :visible.sync="dialogVisible" width="50%" center :title="tit">
      <div v-html="strHtml" class="ql-editor">
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/javascript">


export default {
  name: "Plan",
  data() {
    return {
      dialogVisible: false,
      strHtml: '',
      tableData: [],
      topic: '',
      pageSize: 10,
      pageNum: 1,
      total: 0,
      tit: '',
    }
  },
  methods: {
    loadPost() {
      this.$axios.post('/review/plan/page', {
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
    },
    //查看复盘内容
    getContent(val, type, rdid) {
      this.strHtml = val
      this.dialogVisible = true
      this.tit = rdid + this.getType(type)
    },
    //复盘类型
    getType(val) {
      if (val == 1) {
        return "日复盘"
      }
      if (val == 2) {
        return "周复盘"
      }
      if (val == 3) {
        return "月总结"
      }
      if (val == 4) {
        return "年总结"
      }
    },
    //复盘模式
    getFlag(val) {
      if (val == 1) {
        return "固定格式"
      }
      if (val == 2) {
        return "全文"
      }
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

</style>