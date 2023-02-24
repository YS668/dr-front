<template>
    <div>
        <div style="margin-bottom: 5px;">
            <el-input clearable v-model="stockName" placeholder="请输入名称" suffix-icon="el-icon-search" style="width: 200px;"
                @keyup.enter.native="loadPost" max-height="800"></el-input>
            <el-select v-model="groupName" placeholder="选择分组">
                <el-option v-for="(item) in groups" :key="item" :label="item" :value="item"></el-option>
            </el-select>
            <el-button type="warning" @click="restCondition">重置</el-button>
            <el-button type="primary" style="margin-left: 5px;" @click="loadPost">查询</el-button>
            <el-button type="warning" @click="stockDel">删除</el-button>
            <el-button type="primary" @click="changeGroup">换组</el-button>
        </div>
        <el-table v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" ref="multipleTable" @selection-change="handleSelectionChange" :data="tableData"
            :header-cell-style="rowClass" border style="width: 100%" highlight-current-row max-height="700">
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
            <el-table-column prop="groupName" label="分组" align="left">
            </el-table-column>
            <el-table-column prop="note" label="备注">
                <template slot-scope="scope">
                    <el-button size="small" type="success" @click="getNote(scope.row)">查看</el-button>
                </template>
            </el-table-column>
            <el-table-column label="链接" align="left">
                <span slot-scope="scope">
                    <el-link type="primary" :href=scope.row.xueQiuLink target="_blank" style="margin-left: 6px">雪球</el-link>
                    <el-link type="primary" :href=scope.row.taoGuLink target="_blank" style="margin-left: 6px">淘股吧</el-link>
                    <el-link type="primary" :href=scope.row.dongFangLink target="_blank" style="margin-left: 6px">东方财富</el-link>
                    <el-link type="primary" :href=scope.row.tongHLink target="_blank" style="margin-left: 6px">同花顺</el-link>
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
            <chooseStockVue @func="getGroupsAndUser" @addStockSus="loadPost"></chooseStockVue>
        </nav>
        <el-dialog :visible.sync="noteVisible" width="50%" center :title="stockNameTit" style="margin-bottom: 5px;">
            <div style="margin:10px;border:0;padding:0;text-align: center">
                <el-input clearable type="textarea" style="width: 50%;margin: 10px;" maxlength="150" autosize
                    v-model="noteStr" placeholder="暂时无备注，输入内容"></el-input>
                <el-button type="primary" @click="updateNote">确认</el-button>
            </div>
        </el-dialog>
        <el-dialog :visible.sync="groupVisible" width="28%" center title="请选择你要更改的分组并确认">
            <div style="margin:10px;border:0;padding:0;text-align: center">
                <el-select v-model="newGroup" placeholder="选择分组">
                    <el-option v-for="(item) in groups" :key="item" :label="item" :value="item"></el-option>
                </el-select>
                <el-button type="primary" @click="startGroup">确认</el-button>
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
            //选中的
            multipleTable: [],
            tableData: [],
            noteVisible: false,
            groupVisible: false,
            //备注
            noteStr: '',
            //备注对话框标题
            stockNameTit: '',
            //备注对话的股票分组
            noteSrockGroup: '',
            //交换的分组
            newGroup: '',
            //条件
            stockName: '',
            //条件
            groupName: '',
            pageSize: 999,
            pageNum: 1,
            total: 0,
            //用户
            user: '',
            //分时图数组
            gifList: [],
            //分组数组
            groups: [],
            //删除，换组条件
            delOrChange: [],
            loading:true
        }
    },
    methods: {
        //接受子组件的消息
        getGroupsAndUser(val) {
            this.groups = val
        },
        loadPost() {
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
                    this.loading = false
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
        changeOrdel(){
            this.delOrChange = this.multipleTable.map(function (item, index) {
                var temp = {
                    uid: item.uid,
                    stockName: item.stockName,
                    groupName: item.groupName
                }
                return temp
            })
        },
        //换组
        changeGroup() {
            if (this.multipleTable.length == 0) {
                this.$notify.error({
                    title: '失败',
                    message: '请先选择对应的股票',
                    offset: 100
                });
                return
            }
            this.groupVisible = true;
        },
        //确认换组
        startGroup(val) {
            //转换
            this.changeOrdel()
            if (this.newGroup == '') {
                this.$notify.error({
                    title: '失败',
                    message: '请先选择对应的分组',
                    offset: 100
                });
                return
            }
            //转换
            this.delOrChange.forEach(item => item.newGroup = this.newGroup )
            this.$axios.post('/my/stock/change/group', this.delOrChange).then(res => {
                if (res.code == 200) {
                    this.$message({
                        message: '操作成功！',
                        type: 'success'
                    });
                    //清空
                    this.newGroup == ''
                    //关闭对话框
                    this.groupVisible = false;
                    //重新加载
                    this.loadPost();
                } else {
                    this.$message({
                        message: '操作失败！',
                        type: 'error'
                    });
                }
            })
        },
        //删除自选股
        stockDel() {
            if (this.multipleTable.length == 0) {
                this.$notify.error({
                    title: '失败',
                    message: '请先选择对应的股票',
                    offset: 100
                });
                return
            }
            //转换
            this.changeOrdel()
            this.$axios.post('/my/stock/del', this.delOrChange).then(res => {
                if (res.code == 200) {
                    this.$message({
                        message: '操作成功！',
                        type: 'success'
                    });
                } else {
                    this.$message({
                        message: '操作失败！',
                        type: 'error'
                    });
                }
            })
        },
        //备注
        getNote(val) {
            this.noteStr = val.note
            this.noteVisible = true
            this.stockNameTit = val.stockName
            this.noteSrockGroup = val.groupName
        },
        //修改备注
        updateNote() {
            this.$axios.post('/my/stock/update/note', {
                uid: this.user.uid,
                groupName: this.noteSrockGroup,
                stockName: this.stockNameTit,
                note: this.noteStr,
            }).then(res => {
                if (res.code == 200) {
                    this.$message({
                        message: '操作成功！',
                        type: 'success'
                    });
                    //加载数据
                    this.loadPost()
                    //隐藏对话框
                    this.noteVisible = false
                } else {
                    this.$message({
                        message: '操作失败！',
                        type: 'error'
                    });
                }
            })
        },
        //清空条件
        restCondition() {
            this.groupName = ''
            this.stockName = ''
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
        this.user = JSON.parse(sessionStorage.getItem('CurUser'))
        this.loadPost();
        //多次执行定时器
        this.Timer = setInterval(() => {
            this.loadPost()
            //30秒，毫秒为单位    
        }, 1 * 30 * 1000)
    },
    beforeDestroy() {
        //清楚一次性定时器
        clearInterval(this.Timer)
        console.log('清除定时器timeout')
    },
    components: {
        chooseStockVue
    },
}
</script>

<style></style>