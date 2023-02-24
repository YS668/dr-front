<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="12">
                <div style="text-align: center;">
                    <el-row>
                        <el-col :span="24">
                            <h2>雪球</h2>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <span><b>1小时内热度最高</b></span>
                        </el-col>
                        <el-col :span="12">
                            <span><b>24小时内热度最高</b></span>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-card class="box-card">
                                <el-table v-loading="loading" element-loading-text="拼命加载中"
                                    element-loading-spinner="el-icon-loading" :data="xq_one" border style="width: 100%">
                                    <el-table-column prop="stockName" label="名称">
                                        <span slot-scope="scope">
                                            <el-link type="primary" :href=scope.row.xueQiuLink target="_blank"
                                                style="margin-left: 6px">{{ scope.row.stockName }}</el-link>
                                        </span>
                                    </el-table-column>
                                    <el-table-column prop="nowPrice" label="现价">
                                    </el-table-column>
                                    <el-table-column prop="trend" label="涨跌">
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
                                <el-table v-loading="loading" element-loading-text="拼命加载中"
                                    element-loading-spinner="el-icon-loading" :data="xq_tf" border style="width: 100%">
                                    <el-table-column prop="stockName" label="名称">
                                        <span slot-scope="scope">
                                            <el-link type="primary" :href=scope.row.xueQiuLink target="_blank"
                                                style="margin-left: 6px">{{ scope.row.stockName }}</el-link>
                                        </span>
                                    </el-table-column>
                                    <el-table-column prop="nowPrice" label="现价">
                                    </el-table-column>
                                    <el-table-column prop="trend" label="涨跌">
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
            <el-col :span="12">
                <div style="text-align: center;">
                    <el-row>
                        <el-col :span="24">
                            <h2>同花顺</h2>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <span><b>1小时内热度最高</b></span>
                        </el-col>
                        <el-col :span="12">
                            <span><b>24小时内热度最高</b></span>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-card class="box-card">
                                <el-table v-loading="loading" element-loading-text="拼命加载中"
                                    element-loading-spinner="el-icon-loading" :data="th_one" border style="width: 100%">
                                    <el-table-column prop="stockName" label="名称">
                                        <span slot-scope="scope">
                                            <el-link type="primary" :href=scope.row.tongHLink target="_blank"
                                                style="margin-left: 6px">{{ scope.row.stockName }}</el-link>
                                        </span>
                                    </el-table-column>
                                    <el-table-column prop="nowPrice" label="现价">
                                    </el-table-column>
                                    <el-table-column prop="trend" label="涨跌">
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
                                <el-table v-loading="loading" element-loading-text="拼命加载中"
                                    element-loading-spinner="el-icon-loading" :data="th_tf" border style="width: 100%">
                                    <el-table-column prop="stockName" label="名称">
                                        <span slot-scope="scope">
                                            <el-link type="primary" :href=scope.row.tongHLink target="_blank"
                                                style="margin-left: 6px">{{ scope.row.stockName }}</el-link>
                                        </span>
                                    </el-table-column>
                                    <el-table-column prop="nowPrice" label="现价">
                                    </el-table-column>
                                    <el-table-column prop="trend" label="涨跌">
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
        <el-row :gutter="20">
            <el-col :span="12">
                <div style="text-align: center;">
                    <el-row>
                        <el-col :span="24">
                            <h2>东方财富</h2>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <span><b>人气榜</b></span>
                        </el-col>
                        <el-col :span="12">
                            <span><b>飙升榜</b></span>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-card class="box-card">
                                <el-table v-loading="loading" element-loading-text="拼命加载中"
                                    element-loading-spinner="el-icon-loading" :data="df_rq" border style="width: 100%">
                                    <el-table-column prop="stockName" label="名称">
                                        <span slot-scope="scope">
                                            <el-link type="primary" :href=scope.row.dongFangLink target="_blank"
                                                style="margin-left: 6px">{{ scope.row.stockName }}</el-link>
                                        </span>
                                    </el-table-column>
                                    <el-table-column prop="nowPrice" label="现价">
                                    </el-table-column>
                                    <el-table-column prop="trend" label="涨跌">
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
                                <el-table v-loading="loading" element-loading-text="拼命加载中"
                                    element-loading-spinner="el-icon-loading" :data="df_up" border style="width: 100%">
                                    <el-table-column prop="stockName" label="名称">
                                        <span slot-scope="scope">
                                            <el-link type="primary" :href=scope.row.dongFangLink target="_blank"
                                                style="margin-left: 6px">{{ scope.row.stockName }}</el-link>
                                        </span>
                                    </el-table-column>
                                    <el-table-column prop="nowPrice" label="现价">
                                    </el-table-column>
                                    <el-table-column prop="trend" label="涨跌">
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
            <el-col :span="12">
                <div style="text-align: center;">
                    <el-row>
                        <el-col :span="24">
                            <h2>淘股吧</h2>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <span><b>前10名</b></span>
                        </el-col>
                        <el-col :span="12">
                            <span><b>11-20名</b></span>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-card class="box-card">
                                <el-table v-loading="loading" element-loading-text="拼命加载中"
                                    element-loading-spinner="el-icon-loading" :data="tg_sh" border style="width: 100%">
                                    <el-table-column prop="stockName" label="名称">
                                        <span slot-scope="scope">
                                            <el-link type="primary" :href=scope.row.taoGuLink target="_blank"
                                                style="margin-left: 6px">{{ scope.row.stockName }}</el-link>
                                        </span>
                                    </el-table-column>
                                    <el-table-column prop="nowPrice" label="现价">
                                    </el-table-column>
                                    <el-table-column prop="trend" label="涨跌">
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
                                <el-table v-loading="loading" element-loading-text="拼命加载中"
                                    element-loading-spinner="el-icon-loading" :data="tg_sz" border style="width: 100%">
                                    <el-table-column prop="stockName" label="名称">
                                        <span slot-scope="scope">
                                            <el-link type="primary" :href=scope.row.taoGuLink target="_blank"
                                                style="margin-left: 6px">{{ scope.row.stockName }}</el-link>
                                        </span>
                                    </el-table-column>
                                    <el-table-column prop="nowPrice" label="现价">
                                    </el-table-column>
                                    <el-table-column prop="trend" label="涨跌">
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
    name: "Hot",
    data() {
        return {
            //淘股吧深市
            tg_sz: [],
            //淘股吧沪市
            tg_sh: [],
            //同花顺1小时内
            th_one: [],
            //同花顺24小时内
            th_tf: [],
            //雪球1小时内
            xq_one: [],
            //雪球24小时内
            xq_tf: [],
            //东方财富飙升榜
            df_up: [],
            //东方财富人气榜
            df_rq: [],
            loading: true
        }
    },
    methods: {
        hotTask() {
            console.log("获取热股")
            this.$axios.get('/hot').then(res => {
                if (res.code == 200) {
                    this.$message({
                        message: '刷新热股榜成功！',
                        type: 'success'
                    });
                    console.log(res)
                    //淘股吧深市
                    this.tg_sz = res.data.tg_sz
                    //淘股吧沪市
                    this.tg_sh = res.data.tg_sh
                    //同花顺1小时内
                    this.th_one = res.data.th_one
                    //同花顺24小时内
                    this.th_tf = res.data.th_tf
                    //雪球1小时内
                    this.xq_one = res.data.xq_one
                    //雪球24小时内
                    this.xq_tf = res.data.xq_tf
                    //东方财富飙升榜
                    this.df_up = res.data.df_up
                    //东方财富人气榜
                    this.df_rq = res.data.df_rq
                    this.loading = false
                } else {
                    this.$message({
                        message: '刷新热股榜失败！',
                        type: 'error'
                    });
                }
            })
        },
    },
    created() {
        //一次性执行定时器
        this.OneTimer = setTimeout(() => {
            this.hotTask()
        }, 500)
        //多次执行定时器
        this.Timer = setInterval(() => {
            this.hotTask()
        }, 1 * 60 * 1000)
    },
    beforeDestroy() {
        //清楚一次性定时器
        clearTimeout(this.OneTimer)
        clearInterval(this.Timer)
        console.log('清除定时器timeout')
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
</style>