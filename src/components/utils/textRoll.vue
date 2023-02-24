<template>
    <!-- 跑马灯组件 -->
    <div style="top: 10px;">
        <el-card class="box-card" style="text-align: center;">
            <i class="el-icon-message-solid"></i>
            {{ text.substring(0, 80) }}
        </el-card>
    </div>
</template>
  
<script>
export default {
    name: 'TextRoll',
    props: {
        value: {
            type: String,
            default: ''
        },
    },
    data() {
        return {
            timer: null,
            text: this.value,
        }
    },
    created() {
        //多次执行定时器
        this.Timer = setInterval(() => {
            this.lang()
        }, 500)
    },
    watch: {
        value(newValue) {
            this.text = newValue;
        },
    },
    methods: {
        lang() {
            var start = this.text.slice(0, 1)
            var end = this.text.substring(1)
            this.text = end + start
        }
    },
    beforeDestroy() {
        //清楚定时器
        clearInterval(this.Timer)
        console.log('清除定时器timeout')
    },
}
</script>
<style scoped lang='less'>
</style>
  
  