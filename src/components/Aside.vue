<template>
    <el-menu 
        background-color=" antiquewhite" 
        ext-color="black" 
        active-text-color="#ffd04b" 
        style="height: 100%;"
        default-active="/Home" 
        :collapse="isCollapse" 
        :collapse-transition="false"
        router=""
    >
        <el-menu-item index="/Home">
            <i class="el-icon-s-home"></i>
            <span slot="title">首页</span>
        </el-menu-item>
        <el-submenu >
            <template slot="title" :collapse="isCollapse" >
                <i class="el-icon-message"></i>
                <span slot="title">复盘数据</span>
            </template>
            <!--index标签为页面-->
            <el-menu-item index="/AllData">总体数据</el-menu-item>
            <el-menu-item index="/north">北向资金</el-menu-item>
            <el-menu-item index="/upAll">上涨家数</el-menu-item>
            <el-menu-item index="/upLimit">涨停</el-menu-item>
            <el-menu-item index="/downLimit">跌停</el-menu-item>
        </el-submenu>
        <el-menu-item index="/reviewPlan">
            <i class="el-icon-s-home"></i>
            <span slot="title">复盘计划</span>
        </el-menu-item>
        <el-menu-item index="/reviewArticle">
            <i class="el-icon-s-home"></i>
            <span slot="title">复盘文章</span>
        </el-menu-item>
        <el-menu-item index="/talk">
            <i class="el-icon-s-home"></i>
            <span slot="title">讨论区</span>
        </el-menu-item>
        <el-menu-item index="/propose">
            <i class="el-icon-s-home"></i>
            <span slot="title">建议与反馈</span>
        </el-menu-item>
        <el-menu-item index="/future">
            <i class="el-icon-s-home"></i>
            <span slot="title">敬请期待</span>
        </el-menu-item>
    </el-menu>
</template>

<script type="text/javascript">
export default {
    name: "Aside",
    data() {
        return {

        }
    },
    components: {
    },
    //接受父组件传过来的值
    props: {
        isCollapse: Boolean
    }
}
</script>

<style lang="less" scoped>

</style>
