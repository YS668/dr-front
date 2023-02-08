<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="12">
                <div >
                    <el-table :data="xueQiuTable" style="width: 100%">
                        <el-table-column label="雪球">
                            <template slot-scope="{}" slot="header" style="text-align: center;">
                                雪球
                            </template>
                            <el-table-column prop="name" label="1小时内" width="120">
                                <template slot-scope="{}" slot="header">1小时内
                                </template>
                            </el-table-column>
                            <el-table-column prop="name" label="24小时内" width="120">
                            </el-table-column>
                        </el-table-column>
                    </el-table>

                </div>
            </el-col>
            <el-col :span="12">
                <div >
                    东方财富
                </div>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="12">
                <div >
                    同花顺
                </div>
            </el-col>
            <el-col :span="12">
                <div >
                    淘股吧
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
            xueQiuTimer: null,
            TongHuaTimer: null,
            DongFangTimer: null,
            TaoGuTimer: null,
            xueQiuOneTimer: null,
            TongHuaOneTimer: null,
            DongFangOneTimer: null,
            TaoGuOneTimer: null,
            xueQiuTable: [],
            TongHuaTable: [],
            DongFangTable: [],
            TaoGuTable: [],
        }
    },
    methods: {
        getXueQiu() {
            console.log("获取雪球热股")
            //fetch post请求
            fetch("https://stock.xueqiu.com/v5/stock/hot_stock/list.json?size=8&_type=10&type=20", {
                method: 'get',
                headers: {
                    'Cookie': 'device_id=34cff051773e8c372c1bcd3d177c0c13; s=bt12lj4g4l; bid=55f98a025015352661adabaed55fe6c2_lc43l8ar; Hm_lvt_1db88642e346389874251b5a1eded6e3=1675253209,1675253477,1675299587,1675386828; snbim_minify=true; xq_a_token=06c970814873215375f1cd02e4c8e64b740f6704; xqat=06c970814873215375f1cd02e4c8e64b740f6704; xq_r_token=9546eea976a2e2f78e2667bb2221518d5306c5b6; xq_id_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1aWQiOi0xLCJpc3MiOiJ1YyIsImV4cCI6MTY3NzM3MDg0NiwiY3RtIjoxNjc1NzY4MTQ0Nzg1LCJjaWQiOiJkOWQwbjRBWnVwIn0.YTmROb47LZSFJ5c3stxIF_ar0bVCsNmKZ0yOZyoAwPaGFlqK6J2EpmH_BMjs2fmrTDLJaLthmwYtj_cysm47fY7sMF6jRAgrh5Ze58NqThDYzXwWuek7IvrgCGfh8WWgjNzNCWGt5EDsbmySoJg1hI9kSakSl2rzUbcfhMDS-H16t52XcwdGRU_WBun8Tih82pzgGsHB1-6DMHQtweVSpgKf8vrDtv1GBDVUXE2tCgtm1k5dEoZldXLUciqjnRB5OP0cbxOmFTfUMKVWZT1DZAtMkQyr-9O2IEqvxgetIHOmydTWFHh0sBMazOQJ5-m6zpWzZw_EGBD68Syd8ZxAXg; u=571675768192753; Hm_lpvt_1db88642e346389874251b5a1eded6e3=1675768216',
                    'Host': 'stock.xueqiu.com',
                    'origin': 'https://xueqiu.com',
                    'referer': 'https://xueqiu.com/'
                },
                mode:'no-cors'
            }).then(function (response) {
                //json是返回的response提供的一个方法,会把返回的json字符串反序列化成对象,也被包装成一个Promise了
                console.log(response.json())
                return response.json();

            })
        },
        getTongHu() {
            console.log("获取同花顺热股")
        },
        getDongFang() {
            console.log("获取东方财富热股")
        },
        getTaoGu() {
            console.log("获取淘股吧热股")
        },
    },
    created() {
        //一次性执行定时器
        this.xueQiuOneTimer = setTimeout(() => {
            this.getXueQiu()
        }, 500)
        this.TongHuaOneTimer = setTimeout(() => {
            this.getTongHu()
        }, 500)
        this.DongFangOneTimer = setTimeout(() => {
            this.getDongFang()
        }, 500)
        this.TaoGuOneTimer = setTimeout(() => {
            this.getTaoGu()
        }, 500)
        //多次执行定时器
        this.xueQiuTimer = setInterval(() => {
            this.getXueQiu()
        }, 5 * 60 * 1000)
        this.TongHuaTimer = setInterval(() => {
            this.getTongHu()
        }, 5 * 60 * 1000)
        this.DongFangTimer = setInterval(() => {
            this.getDongFang()
        }, 5 * 60 * 1000)
        this.TaoGuTimer = setInterval(() => {
            this.getTaoGu()
        }, 5 * 60 * 1000)
    },
    beforeDestroy() {
        //清楚一次性定时器
        clearTimeout(this.xueQiuOneTimer)
        clearTimeout(this.TongHuaOneTimer)
        clearTimeout(this.DongFangOneTimer)
        clearTimeout(this.TaoGuOneTimer)
        //清除多次执行定时器
        clearInterval(this.xueQiuTimer)
        clearInterval(this.TongHuaTimer)
        clearInterval(this.DongFangTimer)
        clearInterval(this.TaoGuTimer)
        console.log('清除定时器timeout')
    },
    components: {

    },
}
</script>

<style>

</style>