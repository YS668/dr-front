<template>
    <div style="text-align: center;background-color: #f1f1f3;height: 100%;padding: 0px;margin: 0px;">
        <h1 style="font-size: 50px;">{{ '欢迎你！' + user.username }}</h1>
        <el-descriptions title="个人中心" :column="2" size="40" border>
            <el-descriptions-item>
                <template slot="label">
                    <i class="el-icon-s-custom"></i>
                    账号
                </template>
                {{ user.no }}
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">
                    <i class="el-icon-mobile-phone"></i>
                    电话
                </template>
                {{ user.phone }}
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">
                    <i class="el-icon-message"></i>
                    邮箱
                </template>
                {{ user.mail }}
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">
                    <i class="el-icon-tickets"></i>
                    角色
                </template>
                <el-tag type="success" disable-transitions>
                    {{ user.roleId == 0 ? "超级管理员" : (user.roleId == 1 ? "管理员" : "用户") }}
                </el-tag>

            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">
                    <i class="el-icon-tickets"></i>
                    今日语录
                </template>
                <p id="hitokoto">
                    <a id="hitokoto_text">:D 获取中...</a>
                </p>
            </el-descriptions-item>
        </el-descriptions>
        <DateUtils></DateUtils>
    </div>
</template>

<script>
import DateUtils from "./utils/DateUtils";
export default {
    name: "Home",
    components: { DateUtils },
    data() {
        return {
            user: {}
        }
    },
    computed: {

    },
    methods: {
        getText() {
            //爬取语录
            fetch('https://v1.hitokoto.cn?c=c&c=d&c=e&c=f&c=g&c=h&c=f&c=i&&c=j&c=l')
                .then(response => response.json())
                .then(data => {
                    const hitokoto = document.querySelector('#hitokoto_text')
                    hitokoto.innerText = data.hitokoto + "   ---" + data.from + "(作者：" + data.creator + ")"
                })
                .catch(console.error)
        }
    },
    created() {
        console.log(11)
        this.user = JSON.parse(sessionStorage.getItem('CurUser'))
        this.getText()
    }
}
</script>

<style scoped>
.el-descriptions {
    width: 90%;

    margin: 0 auto;
    text-align: center;
}
</style>