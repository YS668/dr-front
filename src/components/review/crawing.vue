<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="6">
                <div style="text-align: center;">
                    <el-row>
                        <el-col>
                            <h2>主要指数</h2>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <span><a href="https://news.10jqka.com.cn/realtimenews.html"
                                    target="_blank">7*24咨询</a></span>
                        </el-col>
                        <el-col :span="12">
                            <span><a href="http://data.10jqka.com.cn/market/longhu/" target="_blank">同花顺龙虎榜</a></span>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-card class="box-card">
                                <el-table :data="index" border style="width: 100%">
                                    <el-table-column prop="stockName" label="名称">
                                        <span slot-scope="scope">
                                            <a :href=scope.row.xueQiuLink target="_blank" style="margin-left: 6px">{{
                                                scope.row.stockName
                                            }}</a>
                                        </span>
                                    </el-table-column>
                                    <el-table-column prop="trend" label="涨幅">
                                        <span slot-scope="scope"
                                            :class="(scope.row.trend.slice(0, 1) == '-') ? 'green' : 'red'">
                                            {{ scope.row.trend }}
                                        </span>
                                    </el-table-column>
                                    <el-table-column prop="turnover" label="成交额">
                                    </el-table-column>
                                    <el-table-column prop="percentage" label="占比">
                                        <template slot-scope="{}" slot="header">
                                            <span>占比</span>
                                            <el-tooltip class="item" effect="dark" content="占市场总成交的比重"
                                                placement="right">
                                                <i class="el-icon-question" style="margin-left: 5px"></i>
                                            </el-tooltip>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </el-card>
                        </el-col>
                    </el-row>
                </div>
            </el-col>
            <el-col :span="6">
                <div style="text-align: center;">
                    <el-row>
                        <el-col>
                            <h2>成交额前20</h2>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <span><a href="https://www.iwencai.com/unifiedwap/result?w=今日成交额从高到低；"
                                    target="_blank">问财链接</a></span>
                        </el-col>
                        <el-col :span="12">
                            <span><a href="http://data.10jqka.com.cn/market/longhu/" target="_blank">同花顺龙虎榜</a></span>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-card class="box-card">
                                <el-table :data="turnoverSort" border style="width: 100%">
                                    <el-table-column prop="stockName" label="名称">
                                        <span slot-scope="scope">
                                            <a :href=scope.row.tongHLink target="_blank" style="margin-left: 6px">{{
                                                scope.row.stockName
                                            }}</a>
                                        </span>
                                    </el-table-column>
                                    <el-table-column prop="turnover" label="成交额">
                                    </el-table-column>
                                    <el-table-column prop="trend" label="涨幅">
                                        <span slot-scope="scope"
                                            :class="(scope.row.trend.slice(0, 1) == '-') ? 'green' : 'red'">
                                            {{ scope.row.trend }}
                                        </span>
                                    </el-table-column>
                                    <el-table-column prop="nowPrice" label="现价">
                                    </el-table-column>
                                </el-table>
                            </el-card>
                        </el-col>
                    </el-row>
                </div>
            </el-col>
            <el-col :span="12">
                <div style="text-align: center;">
                    <el-row>
                        <el-col :span="24">
                            <h2>板块</h2>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <span><b>概念板块</b></span>
                        </el-col>
                        <el-col :span="12">
                            <span><b>行业板块</b></span>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-card class="box-card">
                                <el-table :data="th_one" border style="width: 100%">
                                    <el-table-column prop="stockName" label="名称">
                                        <span slot-scope="scope">
                                            <a :href=scope.row.xueQiuLink target="_blank" style="margin-left: 6px">{{
                                                scope.row.stockName
                                            }}</a>
                                        </span>
                                    </el-table-column>
                                    <el-table-column prop="trend" label="涨幅">
                                        <span slot-scope="scope"
                                            :class="(scope.row.trend.slice(0, 1) == '-') ? 'green' : 'red'">
                                            {{ scope.row.trend }}
                                        </span>
                                    </el-table-column>
                                    <el-table-column prop="turnover" label="成交额">
                                    </el-table-column>
                                    <el-table-column prop="percentage" label="占比">
                                        <template slot-scope="{}" slot="header">
                                            <span>占比</span>
                                            <el-tooltip class="item" effect="dark" content="占市场总成交的比重"
                                                placement="right">
                                                <i class="el-icon-question" style="margin-left: 5px"></i>
                                            </el-tooltip>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </el-card>
                        </el-col>
                        <el-col :span="12">
                            <el-card class="box-card">
                                <el-table :data="th_tf" border style="width: 100%">
                                    <el-table-column prop="stockName" label="名称">
                                        <span slot-scope="scope">
                                            <a :href=scope.row.xueQiuLink target="_blank" style="margin-left: 6px">{{
                                                scope.row.stockName
                                            }}</a>
                                        </span>
                                    </el-table-column>
                                    <el-table-column prop="trend" label="涨幅">
                                        <span slot-scope="scope"
                                            :class="(scope.row.trend.slice(0, 1) == '-') ? 'green' : 'red'">
                                            {{ scope.row.trend }}
                                        </span>
                                    </el-table-column>
                                    <el-table-column prop="turnover" label="成交额">
                                    </el-table-column>
                                    <el-table-column prop="percentage" label="占比">
                                        <template slot-scope="{}" slot="header">
                                            <span>占比</span>
                                            <el-tooltip class="item" effect="dark" content="占市场总成交的比重"
                                                placement="right">
                                                <i class="el-icon-question" style="margin-left: 5px"></i>
                                            </el-tooltip>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </el-card>
                        </el-col>
                    </el-row>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>


export default {
    name: "Crawing",
    data() {
        return {
            index: [],
            turnoverSort: [],
        }
    },
    methods: {
        getIndex() {
            this.$axios.get('/index/percentage').then(res => {
                if (res.code == 200) {
                    this.$message({
                        message: '刷新主要指数成功！',
                        type: 'success'
                    });
                    console.log(res)
                    this.index = res.data
                } else {
                    this.$message({
                        message: '刷新主要指数失败！',
                        type: 'error'
                    });
                }
            })
        },
        getTurnOverSort() {
            this.$axios.get('/turnover/sort').then(res => {
                if (res.code == 200) {
                    this.$message({
                        message: '刷新成交额成功！',
                        type: 'success'
                    });
                    console.log(res)
                    this.turnoverSort = res.data
                } else {
                    this.$message({
                        message: '刷新成交额失败！',
                        type: 'error'
                    });
                }
            })
        }
    },
    created() {
        this.getIndex()
        this.getTurnOverSort()
    },

    components: {

    },
}
</script>

<style>
.el-row-inline {
    display: flex;
    flex-wrap: wrap;
}

.red {
    color: red;
}

.green {
    color: green;
}
</style>