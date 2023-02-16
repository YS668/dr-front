<template>
    <div>
        <div style="margin-bottom: 5px;">
            <el-input v-model="stockName" placeholder="请输入名称" suffix-icon="el-icon-search" style="width: 200px;"
                @keyup.enter.native="loadPost" max-height="800"></el-input>
            <el-select v-model="groupName" placeholder="选择分组">
                <el-option v-for="(item) in groups" :key="item" :label="item" :value="item"></el-option>
            </el-select>
            <el-button type="warning" @click="restCondition">重置</el-button>
            <el-button type="primary" style="margin-left: 5px;" @click="loadPost">查询</el-button>
            <el-button type="warning" @click="del">删除</el-button>
            <el-button type="primary" @click="changeGroup">换组</el-button>
        </div>
        <el-table ref="multipleTable" @selection-change="handleSelectionChange" :data="tableData"
            :header-cell-style="rowClass" border style="width: 100%" highlight-current-row max-height="800">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column fixed prop="stockName" width="110" label="名称" align="left">
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
                            scope.row.stockName
                        }}</el-button>
                    </el-popover>
                </span>
            </el-table-column>
            <el-table-column prop="trend" label="涨幅" align="left">
                <span slot-scope="scope" :class="(scope.row.trend.slice(0, 1) == '-') ? 'green' : 'red'">
                    {{ scope.row.trend }}
                </span>
            </el-table-column>
            <el-table-column prop="nowPrice" label="现价" align="left">
            </el-table-column>
            <el-table-column prop="turnover" label="成交额" align="left">
            </el-table-column>
            <el-table-column sortable prop="rdid" label="自选时间" align="left">
                <span slot-scope="scope">
                    <el-tag effect="dark">{{ rdidFormat(scope.row.rdid) }}</el-tag>
                </span>
            </el-table-column>
            <el-table-column sortable prop="groupName" label="分组" align="left">
            </el-table-column>
            <el-table-column prop="note" label="备注">
                <template slot-scope="scope">
                    <el-button size="small" type="success"
                        @click="getNote(scope.row.note, scope.row.stockName)">查看</el-button>
                </template>
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
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNum"
            :page-sizes="[999, 30, 10]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination>
        </nav>
        <nav style="text-align: center"> <!-- 分页居中放置-->
            <chooseStockVue @func="getGroupsAndUser"></chooseStockVue>
        </nav>
        <el-dialog :visible.sync="dialogVisible" width="50%" center :title="tit">
            <div v-html="strHtml" class="ql-editor">
            </div>
        </el-dialog>
    </div>
</template>

<script>
import chooseStockVue from '../utils/chooseStock'

export default {
    name: "MyChoose",
    data() {
        return {
            multipleTable: [],
            tableData: [],
            dialogVisible: false,
            strHtml: '',
            tit: '',
            stockName: '',
            groupName: '',
            pageSize: 999,
            pageNum: 1,
            total: 0,
            user: '',
            gifList: [],
            groups: ['北京', '上海'],
        }
    },
    methods: {
        //接受子组件的消息
        getGroupsAndUser(val, val2) {
            this.groups = val
            this.user = val2
            console.log(val2)
        },
        loadPost() {
            console.log(this.user)
            this.$axios.post('/my/stock/page', {
                pageSize: this.pageSize,
                pageNum: this.pageNum,
                param: {
                    uid: this.user.uid,
                    groupName: this.groupName,
                    stockName: this.stockName,
                }
            }).then(res => {
                if (res.code == 200) {
                    this.$message({
                        message: '操作成功！',
                        type: 'success'
                    });
                    this.tableData = res.data
                } else {
                    this.$message({
                        message: '操作失败！',
                        type: 'error'
                    });
                }
            })
        },
        //表格多选
        handleSelectionChange(val) {
            this.multipleTable = val
            console.log(this.multipleTable)
        },
        //换组
        changeGroup() {

        },
        //删除
        del() {

        },
        //备注
        getNote(val, val2) {
            this.strHtml = val
            this.dialogVisible = true
            this.tit = val2
        },
        //清空条件
        restCondition() {
            this.group = ''
            this.name = ''
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
        //K线图
        setGifList(val) {
            //先清空数组
            this.gifList.length = 0
            this.gifList.push("http://image.sinajs.cn/newchart/min/n/" + val.slice(0, 2).toLowerCase() + val.slice(2) + ".gif")
            this.gifList.push("http://image.sinajs.cn/newchart/daily/n/" + val.slice(0, 2).toLowerCase() + val.slice(2) + ".gif")
            this.gifList.push("http://image.sinajs.cn/newchart/weekly/n/" + val.slice(0, 2).toLowerCase() + val.slice(2) + ".gif")
            this.gifList.push("http://image.sinajs.cn/newchart/monthly/n/" + val.slice(0, 2).toLowerCase() + val.slice(2) + ".gif")
        },
        //设置表头的颜色
        rowClass({ row, rowIndex }) {
            console.log(rowIndex) //表头行标号为0
            return 'background: gainsboro'
        },
        rdidFormat(rdid) {
            return rdid.substring(0, 4) + "-" + rdid.substring(4, 6) + "-" + rdid.substring(6, 8);
        },
    },
    mounted() {
        this.loadPost();
    },
    components: {
        chooseStockVue
    },
}
</script>

<style>

</style>