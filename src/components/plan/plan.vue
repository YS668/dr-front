<!--计划界面-->
<template>
  <div>
    <div style="margin-bottom: 5px;">
      <el-input v-model="topic" placeholder="请输入主题" suffix-icon="el-icon-search" style="width: 200px;"
        @keyup.enter.native="loadPost"></el-input>
      <el-button type="primary" style="margin-left: 5px;" @click="loadPost">查询</el-button>
      <el-button type="success" @click="topic = ''">重置</el-button>
      <el-button type="primary" style="margin-left: 5px;" @click="writeVisible = true">新增</el-button>
    </div>
    <el-table :data="tableData" :header-cell-style="rowClass" :default-sort="{ prop: 'rdid', order: 'descending' }"
      border style="width: 100%" highlight-current-row>
      <el-table-column fixed sortable prop="rdid" width="110" label="日期" align="left">
        <span slot-scope="scope">
          <el-tag effect="dark">{{ rdidFormat(scope.row.rdid) }}</el-tag>
        </span>
      </el-table-column>
      <el-table-column prop="topic" label="主题" align="left">
      </el-table-column>
      <!--日周月年-->>
      <el-table-column prop="type" label="类型" align="left">
      </el-table-column>
      <el-table-column prop="flag" label="复盘模式" align="left">
      </el-table-column>
      <el-table-column prop="operate" label="操作">
        <template slot-scope="scope">
          <el-button size="small" type="success" @click="getContent(scope.row.content)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNum"
      :page-sizes="[1, 5, 10, 20, 30]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>

    <el-dialog title="书写复盘" :visible.sync="writeVisible" width="80%" center>
      <el-form ref="plan" :model="plan" label-width="80px">
        <el-form-item label="时间">
          <el-col :span="20">
            202
          </el-col>
        </el-form-item>
        <el-form-item label="主题">
          <el-col :span="20">
            <el-input v-model="plan.topic"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="复盘类型">
          <el-col :span="20">
            <el-radio-group v-model="plan.type">
              <el-radio-button label="1">日复盘</el-radio-button>
              <el-radio-button label="2">周总结</el-radio-button>
              <el-radio-button label="3">月总结</el-radio-button>
              <el-radio-button label="4">年总结</el-radio-button>
            </el-radio-group>
          </el-col>
        </el-form-item>
        <el-form-item label="复盘模式">
          <el-col :span="20">
            <el-radio-group v-model="plan.flag">
              <el-radio-button label="1">固定格式</el-radio-button>
              <el-radio-button label="2">全文</el-radio-button>
            </el-radio-group>
          </el-col>
        </el-form-item>
        <el-form-item label="选择格式" v-if="plan.flag==1">
          <el-col :span="20">
            <el-radio-group v-model="plan.type">
              <el-radio-button label="指数"></el-radio-button>
              <el-radio-button label="板块"></el-radio-button>
              <el-radio-button label="计划"></el-radio-button>
              <el-radio-button label="反思"></el-radio-button>
            </el-radio-group>
          </el-col>
        </el-form-item>
        <!--富文本编辑器-->
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="writeVisible = false">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "Plan",
  data() {
    return {
      tableData: [],
      writeVisible: false,
      plan: {
        uid: '',
        topic: '',
        type: '1',
        flag: '2',
        content: ''
      },
      topic: '',
      pageSize: 10,
      pageNum: 1,
      total: 0,
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