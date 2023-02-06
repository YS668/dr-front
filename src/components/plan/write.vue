<template>
    <div>
        <div style="text-align: center;">
            <DateUtils></DateUtils>
        </div>
        <el-form ref="plan" :model="fromData" label-width="80px">
            <el-form-item :required="required" label="题目">
                <el-col :span="20">
                    <el-input v-model="fromData.topic"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="复盘类型">
                <el-col :span="20">
                    <el-radio-group v-model="fromData.type">
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
                    <el-radio-group v-model="fromData.flag" @click.native="from" @change="to">
                        <el-radio-button label="1">固定格式</el-radio-button>
                        <el-radio-button label="2">全文</el-radio-button>
                    </el-radio-group>
                    <el-tooltip class="item" effect="dark" content="最终只会保存一条复盘记录，请选择好模式" placement="right">
                        <i class="el-icon-question" style="margin-left: 5px"></i>
                    </el-tooltip>

                </el-col>
            </el-form-item>
            <el-form-item label="选择格式" v-if="fromData.flag == 1">
                <el-col :span="20">
                    <el-radio-group v-model="fromData.format" @click.native="from" @change="to">
                        <el-radio-button label="1">指数</el-radio-button>
                        <el-radio-button label="2">板块</el-radio-button>
                        <el-radio-button label="3">计划</el-radio-button>
                        <el-radio-button label="4">反思</el-radio-button>
                    </el-radio-group>
                </el-col>
            </el-form-item>
            <!--富文本编辑器-->
            <el-form-item label="内容:" prop="content">
                <tinymce-editor v-model="fromData.temp"></tinymce-editor>

            </el-form-item>
            <el-form-item>
                <div style="text-align: left;">
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
            required: true,
            fromData: {
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
            if (this.noData() || (this.fromData.topic == null || this.fromData.topic == '')) {
                this.$notify.error({
                    title: '错误',
                    message: '您还没有填写内容/题目，请填写完成再提交',
                    offset: 100
                });
                return
            }
            if (this.fromData.flag == 1) {
                this.fromData.content = "<h3 style=\"font-weight:800; color: black;font-size: 20px;\">指数：</h3>" + this.fromData.i + "<br>" +
                    "<h3 style=\"font-weight:800; color: black;font-size: 20px;\">板块：</h3>" + this.fromData.b + "<br>" +
                    "<h3 style=\"font-weight:800; color: black;font-size: 20px;\">计划：</h3>" + this.fromData.p + "<br>" +
                    "<h3 style=\"font-weight:800; color: black;font-size: 20px;\">反思：</h3>" + this.fromData.f 
            }
            this.$axios.post('/review/plan/save',{
                uid: "1",
                topic: this.fromData.topic,
                type: this.fromData.type,
                flag: this.fromData.flag,
                content: this.fromData.content,
            }).then(res => {
                if (res.code == 200) {
                    //清空表单
                    this.reset()
                    this.$notify.success({
                        title: '成功',
                        message: '已经提交，坚持明天会更好',
                        offset: 100
                    });
                    //跳转页面
                    this.$router.replace("/ReviewPlan")
                } else {
                    this.$notify.error({
                        title: '失败',
                        message: '提交失败请稍后重试',
                        offset: 100
                    });
                }
            })
        },
        //判断内容是否为空,并转移最后一次temp
        noData() {
                //最后一次转移
                if(this.fromData.temp != null && this.fromData.temp != '') {
                this.from();
            }
            //有数据
            if (this.fromData.flag == 2 && (this.fromData.content != null && this.fromData.content != '')) {
                return false;
            }
            //有数据
            if (this.fromData.flag == 1 && ((this.fromData.i != null && this.fromData.i != '')
                || (this.fromData.b != null && this.fromData.b != '')
                || (this.fromData.p != null && this.fromData.p != '')
                || (this.fromData.f != null && this.fromData.f != ''))) {
                return false;
            }
            //无数据
            return true;
        },
        //清空表单
        reset() {
            this.fromData.uid = '',
                this.fromData.topic = '',
                this.fromData.type = '1',
                this.fromData.flag = '1',
                this.fromData.content = '',
                //格式
                this.fromData.format = '1',
                //指数
                this.fromData.i = '',
                //板块
                this.fromData.b = '',
                //计划
                this.fromData.p = '',
                //反思
                this.fromData.f = '',
                //临时值
                this.fromData.temp = ''
        },
        //变化前
        from() {
            if (this.fromData.temp == null || this.fromData.temp == '') {
                return
            } else {
                //全文
                if (this.fromData.flag == 2) {
                    console.log("点击前全文")
                    //转移数据
                    this.fromData.content = this.fromData.temp
                    //固定格式    
                } else {
                    console.log("点击前固定格式")
                    //转移数据
                    //指数
                    if (this.fromData.format == 1) {
                        console.log("点击前指数")
                        this.fromData.i = this.fromData.temp
                    }
                    //板块
                    if (this.fromData.format == 2) {
                        console.log("点击前板块")
                        this.fromData.b = this.fromData.temp
                    }
                    //计划
                    if (this.fromData.format == 3) {
                        console.log("点击前计划")
                        this.fromData.p = this.fromData.temp
                    }
                    //反思
                    if (this.fromData.format == 4) {
                        console.log("点击前反思")
                        this.fromData.f = this.fromData.temp

                    }
                }
                //清空绑定内容
                this.fromData.temp = ''
            }
        },
        //变化后
        to() {
            //全文
            if (this.fromData.flag == 2) {
                console.log("变化后全文")
                //转移数据
                this.fromData.temp = this.fromData.content
                //固定格式    
            } else {
                console.log("变化后固定格式")
                //转移数据
                //指数
                if (this.fromData.format == 1) {
                    console.log("变化后指数")
                    this.fromData.temp = this.fromData.i
                }
                //板块
                if (this.fromData.format == 2) {
                    console.log("变化后板块")
                    this.fromData.temp = this.fromData.b
                }
                //计划
                if (this.fromData.format == 3) {
                    console.log("变化后计划")
                    this.fromData.temp = this.fromData.p
                }
                //反思
                if (this.fromData.format == 4) {
                    console.log("变化后反思")
                    this.fromData.temp = this.fromData.f
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