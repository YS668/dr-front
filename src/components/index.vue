<template>
    <el-container style="height: 100%; border: 1px solid #eee">
        <el-aside :width="aside_witdh" style="background-color: rgb(238, 241, 246); height: 100vh">
            <Aside :isCollapse="isCollapse"></Aside>
        </el-aside>

        <el-container style="height: 100%">
            <el-header
                style="text-align: right; font-size: 12px; height: 100%; border-bottom: rgba(168,168,168,0.3) 1px solid;">
                <!--
                    接收子组件消息
                    @+对应名字
                -->
                <Header @doCollapse="doCollapse" :icon="icon"></Header>
            </el-header>

            <el-main style="height: 100%">
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>

</template>

<script type="text/javascript">
import Aside from './Aside.vue';
import Header from './Header.vue';


export default {
    name: "index",
    data() {
        return {
            isCollapse: false,
            aside_witdh: '200px',
            icon: 'el-icon-s-fold'
        }
    },
    methods: {
        doCollapse() {
            console.log("111")
            //取反值
            this.isCollapse = !this.isCollapse
            console.log(this.isCollapse)
            if (!this.isCollapse) {// 展开
                this.aside_witdh = '200px'
                this.icon = 'el-icon-s-fold'
            } else {//关起、关闭、收起
                this.aside_witdh = '64px'
                this.icon = 'el-icon-s-unfold'
            }
        }
    },
    components: {
        Aside,
        Header,
    }
}
</script>

<style lang="less" scoped>
.el-header {
    //background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
}

.el-main {
    pad: 5px;
}

.el-aside {
    color: #333;
    height: 100%;
}
</style>
