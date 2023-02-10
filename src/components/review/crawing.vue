<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="8">
                <div style="text-align: center;">
                    <el-row>
                        <el-col >
                            <h2>主要指数</h2>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <span><a href="https://news.10jqka.com.cn/realtimenews.html" target="_blank">7*24咨询</a></span>
                        </el-col>
                        <el-col :span="12">
                            <span><a href="http://data.10jqka.com.cn/market/longhu/" target="_blank">同花顺龙虎榜</a></span>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-card class="box-card">
                                <el-table :data="xq_one" border style="width: 100%">
                                    <el-table-column prop="stockName" label="名称" >
                                        <span slot-scope="scope">
                                            <a :href=scope.row.xueQiuLink target="_blank"
                                                style="margin-left: 6px">{{scope.row.stockName}}</a>
                                        </span>
                                    </el-table-column>
                                    <el-table-column prop="trend" label="涨幅" >
                                    </el-table-column>
                                    <el-table-column prop="nowPrice" label="成交额" >
                                    </el-table-column>
                                    <el-table-column prop="trend" label="占比" >
                                        <span slot-scope="scope"
                                            :class="(scope.row.trend.slice(0, 1) == '-') ? 'green' : 'red'">
                                            {{ scope.row.trend }}
                                        </span>
                                    </el-table-column>
                                </el-table>
                            </el-card>
                        </el-col>
                    </el-row>
                </div>
            </el-col>
            <el-col :span="16">
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
                                    <el-table-column prop="stockName" label="名称" >
                                        <span slot-scope="scope">
                                            <a :href=scope.row.tongHLink target="_blank"
                                                style="margin-left: 6px">{{scope.row.stockName}}</a>
                                        </span>
                                    </el-table-column>
                                    <el-table-column prop="trend" label="涨幅" >
                                    </el-table-column>
                                    <el-table-column prop="nowPrice" label="成交额" >
                                    </el-table-column>
                                    <el-table-column prop="trend" label="占比" >
                                        <span slot-scope="scope"
                                            :class="(scope.row.trend.slice(0, 1) == '-') ? 'green' : 'red'">
                                            {{ scope.row.trend }}
                                        </span>
                                    </el-table-column>
                                </el-table>
                            </el-card>
                        </el-col>
                        <el-col :span="12">
                            <el-card class="box-card">
                                <el-table :data="th_tf" border style="width: 100%">
                                    <el-table-column prop="stockName" label="名称" >
                                        <span slot-scope="scope">
                                            <a :href=scope.row.tongHLink target="_blank"
                                                style="margin-left: 6px">{{scope.row.stockName}}</a>
                                        </span>
                                    </el-table-column>
                                    <el-table-column prop="trend" label="涨幅" >
                                    </el-table-column>
                                    <el-table-column prop="nowPrice" label="成交额" >
                                    </el-table-column>
                                    <el-table-column prop="trend" label="占比" >
                                        <span slot-scope="scope"
                                            :class="(scope.row.trend.slice(0, 1) == '-') ? 'green' : 'red'">
                                            {{ scope.row.trend }}
                                        </span>
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
            
        }
    },
    created() {
    },

    components: {

    },
}
</script>

<style>

</style>