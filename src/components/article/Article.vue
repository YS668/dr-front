<template>
    <!--复盘微信文章-->
    <div>
        <div style="text-align: center;">
            <DateUtils></DateUtils>
        </div>
        <div v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading">
            <el-row :gutter="20">
                <el-col :span="8" v-for="item in WxArticle" :key="item.author">
                    <el-card class="box-card">
                        <div style="background-color: rgb(233, 240, 231);" slot="header" class="clearfix">
                            <span>{{ item.author }}</span>
                        </div>
                        <div v-for="it in item.articleVos" :key="it.title" class="text item">
                            <el-link type="primary" :href=it.link target="_blank" style="margin-left: 6px">
                                {{ it.title + " （更新于：" + it.date + "）" }}
                            </el-link>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
        </div>
        <div v-if="foot" style="text-align: center;font-size: larger;top: 10px;">
            <span><b>注意：(开盘时间除外)每隔一小时刷新一次 上次刷新时间：{{ time }}</b></span>
        </div>
    </div>
</template>

<script>
import DateUtils from "../utils/DateUtils";

export default {
    name: "Atricle",
    data() {
        return {
            WxArticle: [],
            time: '',
            loading: true,
            foot:false
        }
    },
    methods: {
        //加载文章
        loadPost() {
            this.foot = false
            this.$axios.get('/wx/article').then(res => {
                if (res.code == 200) {
                    this.$message({
                        message: '操作成功！',
                        type: 'success'
                    });
                    this.WxArticle = res.data.list;
                    this.time = res.data.time
                    this.loading = false
                    this.foot =true
                } else {
                    this.$message({
                        message: '操作失败！',
                        type: 'error'
                    });
                }
            })
        }
    },
    created() {
        this.loadPost()
    },

    components: {
        DateUtils
    },
}
</script>

<style></style>