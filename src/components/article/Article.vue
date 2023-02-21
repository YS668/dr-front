<template><!--复盘微信文章-->
    <div>
        <div style="text-align: center;">
            <DateUtils></DateUtils>
        </div>
        <el-row :gutter="20">
          <el-col :span="8" v-for="item in WxArticle" :key="item.author">
            <el-card  class="box-card" >
                    <div  style="background-color: rgb(233, 240, 231);" slot="header" class="clearfix">
                        <span>{{ item.author }}</span>
                    </div>
                    <div v-for="it in item.articleVos" :key="it.title" class="text item">
                        <el-link type="primary" 
                            :href=it.link  target="_blank" 
                            style="margin-left: 6px">
                            {{ it.title }}
                        </el-link>
                    </div>
                </el-card>
          </el-col>
        </el-row>
        <div style="text-align: center;font-size: larger;top: 10px;">
            <span><b>注意：每隔一小时刷新一次</b></span>
        </div>
    </div>
</template>

<script>
import DateUtils from "../utils/DateUtils";

export default {
    name: "Atricle",
    data() {
        return {
            WxArticle:[],
            //开始请求的时间
            startTime:0
        }
    },
    methods: {
        //加载文章
        loadPost(){
            //设计一小时缓存
            if(this.startTime != 0){
                console.log(this.startTime)
                var temp = new Date().getTime()/1000 - this.startTime
                if(temp < 3600){
                    return;
                }
            }
            console.log("1111")
            this.$axios.get('/wx/article',{
                Headers:{
                    'Cache-Control':'max-age=3600'
                }
            }).then(res => {
                if (res.code == 200) {
                    this.$message({
                        message: '操作成功！',
                        type: 'success'
                    });
                    this.WxArticle = res.data;
                    console.log(this.WxArticle)
                    //重新计算时间
                    this.startTime = new Date().getTime()/1000 
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

<style>


</style>