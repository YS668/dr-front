<template>
    <div>
        <div style="text-align: center;">
            <DateUtils></DateUtils>
        </div>
        <el-form ref="plan" :model="plan" label-width="80px">
            <el-form-item :required="required" label="题目">
                <el-col :span="20">
                    <el-input v-model="plan.topic"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="复盘类型">
                <el-col :span="20">
                    <el-radio-group v-model="plan.type">
                        <el-radio-button label="1">日复盘</el-radio-button>
                        <el-radio-button label="2">周总结</el-radio-button>
                        <el-radio-button label="3">月总结</el-radio-button>
                        <el-radio-button label="4">年总结</el-radio-button>
                    </el-radio-group>
                </el-col>
            </el-form-item>
            <el-form-item label="复盘模式">
                <el-col :span="20">
                    <!--click 还没有更新到data change已经更新到了-->
                    <el-radio-group v-model="plan.flag" @click.native="from" @change="to">
                        <el-radio-button label="1">固定格式</el-radio-button>
                        <el-radio-button label="2">全文</el-radio-button>
                    </el-radio-group>
                    <el-tooltip class="item" effect="dark" content="最终只会保存一条复盘记录，请选择好模式" placement="right">
                        <i class="el-icon-question" style="margin-left: 5px"></i>
                    </el-tooltip>

                </el-col>
            </el-form-item>
            <el-form-item label="选择格式" v-if="plan.flag == 1">
                <el-col :span="20">
                    <el-radio-group v-model="plan.format" @click.native="from" @change="to">
                        <el-radio-button label="1">指数</el-radio-button>
                        <el-radio-button label="2">板块</el-radio-button>
                        <el-radio-button label="3">计划</el-radio-button>
                        <el-radio-button label="4">反思</el-radio-button>
                    </el-radio-group>
                </el-col>
            </el-form-item>
            <!--富文本编辑器-->
            <el-form-item label="内容:" prop="content">
                <tinymce-editor v-model="plan.temp"></tinymce-editor>

            </el-form-item>
            <el-form-item>
                <div style="text-align: center;">
                    <el-button type="primary" @click="save">确 定</el-button>
                    <el-button>取 消</el-button>
                </div>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import TinymceEditor from '../../components/Editor/Index'
import DateUtils from "../utils/DateUtils";

export default {
    name: "Write",
    data() {
        return {
            required:true,
            plan: {
                uid: '',
                topic: '',
                type: '1',
                flag: '1',
                content: '',
                //格式
                format: '1',
                //指数
                i: '',
                //板块
                b: '',
                //计划
                p: '',
                //反思
                f: '',
                //临时值
                temp: ''

            }
        }
    },
    methods: {
        //注意判断temp是否为空
        save() {
            if (this.noData() || (this.plan.topic == null || this.plan.topic == '')) {
                this.$notify.error({
                    title: '错误',
                    message: '您还没有填写内容/题目，请填写完成再提交',
                    offset: 100
                });
                return
            }
            if (this.plan.flag == 1) {
                this.plan.content = "指数：" + this.plan.i + "\n" +
                    "板块：" + this.plan.b + "\n" +
                    "计划：" + this.plan.p + "\n" +
                    "反思：" + this.plan.f + "\n"
            }
            console.log(this.plan.content)
            //清空表单
            this.reset()
            //跳转页面
            this.$notify.success({
                    title: '成功',
                    message: '已经提交，坚持明天会更好',
                    offset: 100
                });
            this.$router.replace("/ReviewPlan")
        },
        //判断内容是否为空,并转移最后一次temp
        noData(){
            //最后一次转移
            if (this.plan.temp != null && this.plan.temp != '') {
                this.from();
            }
            //有数据
            if (this.plan.flag == 2 && (this.plan.content != null && this.plan.content != '')) {
                return false;
            }
            //有数据
            if (this.plan.flag == 1 && ((this.plan.i != null && this.plan.i != '')
                || (this.plan.b != null && this.plan.b != '')
                || (this.plan.p != null && this.plan.p != '')
                || (this.plan.f != null && this.plan.f != ''))) {
                return false;
            }
            //无数据
            return true;
        },
        //清空表单
        reset() {
            this.plan.uid = '',
                this.plan.topic = '',
                this.plan.type = '1',
                this.plan.flag = '1',
                this.plan.content = '',
                //格式
                this.plan.format = '1',
                //指数
                this.plan.i = '',
                //板块
                this.plan.b = '',
                //计划
                this.plan.p = '',
                //反思
                this.plan.f = '',
                //临时值
                this.plan.temp = ''
        },
        //变化前
        from() {
            if (this.plan.temp == null || this.plan.temp == '') {
                return
            } else {
                //全文
                if (this.plan.flag == 2) {
                    console.log("点击前全文")
                    //转移数据
                    this.plan.content = this.plan.temp
                    //固定格式    
                } else {
                    console.log("点击前固定格式")
                    //转移数据
                    //指数
                    if (this.plan.format == 1) {
                        console.log("点击前指数")
                        this.plan.i = this.plan.temp
                    }
                    //板块
                    if (this.plan.format == 2) {
                        console.log("点击前板块")
                        this.plan.b = this.plan.temp
                    }
                    //计划
                    if (this.plan.format == 3) {
                        console.log("点击前计划")
                        this.plan.p = this.plan.temp
                    }
                    //反思
                    if (this.plan.format == 4) {
                        console.log("点击前反思")
                        this.plan.f = this.plan.temp

                    }
                }
                //清空绑定内容
                this.plan.temp = ''
            }
        },
        //变化后
        to() {
            //全文
            if (this.plan.flag == 2) {
                console.log("变化后全文")
                //转移数据
                this.plan.temp = this.plan.content
                //固定格式    
            } else {
                console.log("变化后固定格式")
                //转移数据
                //指数
                if (this.plan.format == 1) {
                    console.log("变化后指数")
                    this.plan.temp = this.plan.i
                }
                //板块
                if (this.plan.format == 2) {
                    console.log("变化后板块")
                    this.plan.temp = this.plan.b
                }
                //计划
                if (this.plan.format == 3) {
                    console.log("变化后计划")
                    this.plan.temp = this.plan.p
                }
                //反思
                if (this.plan.format == 4) {
                    console.log("变化后反思")
                    this.plan.temp = this.plan.f
                }
            }
        },
    },
    components: {
        TinymceEditor,
        DateUtils
    }
}
</script>

<style>

</style>