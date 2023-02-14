<template>
    <div>
        <div style="margin-bottom: 5px;">
            <el-input v-model="name" placeholder="请输入名称" suffix-icon="el-icon-search" style="width: 200px;"
                @keyup.enter.native="loadPost" max-height="800"></el-input>
            <el-select v-model="group" placeholder="选择分组">
                <el-option v-for="(item) in groups" :key="item" :label="item" :value="item"></el-option>
            </el-select>
            <el-button type="primary" style="margin-left: 5px;" @click="loadPost">查询</el-button>
            <el-button type="success" @click="restCondition">重置</el-button>

        </div>
        <el-table :data="tableData" :header-cell-style="rowClass" border style="width: 100%" highlight-current-row>
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
                            scope.row.stockCode
                        }}</el-button>
                    </el-popover>
                </span>
            </el-table-column>
            <el-table-column prop="trend" label="涨幅" align="left">
            </el-table-column>
            <!--日周月年-->>
            <el-table-column prop="nowPrice" label="现价" align="left">
            </el-table-column>
            <el-table-column prop="turnover" label="成交额" align="left">
            </el-table-column>
            <el-table-column sortable prop="rdid" label="自选时间" align="left">
            </el-table-column>
            <el-table-column sortable prop="rdid" label="分组" align="left">
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
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNum"
            :page-sizes="[10, 20, 30]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination>
        <el-dialog :visible.sync="dialogVisible" width="50%" center :title="tit">
            <div v-html="strHtml" class="ql-editor">
            </div>
        </el-dialog>
    </div>
</template>

<script>


export default {
    name: "MyChoose",
    data() {
        return {
            tableData: [],
            dialogVisible: false,
            strHtml: '',
            tit: '',
            name: '',
            group: '',
            pageSize: 10,
            pageNum: 1,
            total: 0,
            gifList: [],
            groups: ['北京', '上海'],
        }
    },
    methods: {
        loadPost() {

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
    created() {
    },
    components: {

    },
}
</script>

<style>

</style>