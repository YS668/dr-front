<template>
    <el-menu 
        background-color=" antiquewhite" 
        ext-color="black" 
        active-text-color="#027aff" 
        style="height: 100%;"
        :collapse="isCollapse" 
        :collapse-transition="false"
        router
    >
        <el-menu-item index="/Home">
            <i class="el-icon-s-opportunity"></i>
            <span slot="title">首页</span>
        </el-menu-item>
        <el-submenu index="1" >
            <template slot="title" :collapse="isCollapse" >
                <i class="el-icon-discover"></i>
                <span slot="title">复盘数据</span>
            </template>
            <!--index标签为页面-->
            <el-menu-item index="/Data">
                <span>总体数据</span>
                <el-tooltip class="item" effect="dark" content="15点10分更新" placement="right">
                    <i class="el-icon-question" style="margin-left: 5px"></i>
                 </el-tooltip>
            </el-menu-item>
            <el-menu-item index="/North">
                <span>北向资金</span>
                <el-tooltip class="item" effect="dark" content="15点10分更新" placement="right">
                    <i class="el-icon-question" style="margin-left: 5px"></i>
                 </el-tooltip>
            </el-menu-item>
            <el-menu-item index="/Up">
                <span>上涨家数</span>
                <el-tooltip class="item" effect="dark" content="15点10分更新" placement="right">
                    <i class="el-icon-question" style="margin-left: 5px"></i>
                 </el-tooltip>
            </el-menu-item>
            <el-menu-item index="/UpLimit">
                <span>涨停股</span>
                <el-tooltip class="item" effect="dark" content="15点10分更新" placement="right">
                    <i class="el-icon-question" style="margin-left: 5px"></i>
                 </el-tooltip>
            </el-menu-item>
            <el-menu-item index="/Hot">
                <span>平台热股</span>
                <el-tooltip class="item" effect="dark" content="每1分钟刷新或自己手动刷新页面" placement="right">
                    <i class="el-icon-question" style="margin-left: 5px"></i>
                 </el-tooltip>
            </el-menu-item>
            <el-menu-item index="/Crawing">
                <span>拥挤度</span>
                <el-tooltip class="item" effect="dark" content="15点10分更新(数据来源于同花顺)" placement="right">
                    <i class="el-icon-question" style="margin-left: 5px"></i>
                 </el-tooltip>
            </el-menu-item>
        </el-submenu>
        <el-submenu index="2">
            <template slot="title" :collapse="isCollapse" >
                <i class="el-icon-medal-1"></i>
                <span slot="title">复盘计划</span>
            </template>
            <!--index标签为页面-->
            <el-menu-item index="/ReviewPlan">我的复盘</el-menu-item>
            <el-menu-item index="/Write">写复盘</el-menu-item>
        </el-submenu>
        <el-menu-item index="/ReviewArticle">
            <i class="el-icon-document-copy"></i>
            <span slot="title">复盘文章</span>
        </el-menu-item>
        <el-menu-item index="/Forum">
            <i class="el-icon-s-custom"></i>
            <span slot="title">讨论区</span>
        </el-menu-item>
        <el-menu-item index="/Notice">
            <i class="el-icon-chat-dot-square"></i>
            <span slot="title">公告</span>
        </el-menu-item>
        <el-menu-item index="/Recomm">
            <i class="el-icon-position"></i>
            <span slot="title">建议</span>
        </el-menu-item>
        <el-menu-item >
            <i class="el-icon-orange"></i>
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
