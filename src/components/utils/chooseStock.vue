<template>
    <div>
        <el-button type="success" @click="stockVisible = true">添加自选股</el-button>
        <el-button type="primary" @click="groupVisible = true">分组管理</el-button>
        <el-dialog :visible.sync="stockVisible" width="50%" center title="添加自选股" >
            <el-form ref="form" :model="form" label-width="80px" label-position="right">
                <el-form-item label="股票名称">
                    <el-input clearable maxlength="20" v-model="form.stockName" placeholder="请输入股票名称"></el-input>
                </el-form-item>
                <el-form-item label="分组">
                    <el-select v-model="form.groupName" placeholder="请选择分组" style="margin: 10px;">
                        <el-option v-for="(item) in groups" :key="item" :label="item" :value="item"></el-option>
                    </el-select>
                    <el-button type="primary" @click="groupVisible = true">新建分组</el-button>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input v-model="form.note" placeholder="请输入备注"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="addStock">添加自选</el-button>
                    <el-button @click="stockVisible = false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

        <el-dialog :visible.sync="groupVisible" width="38%" center  title="分组管理">
                <div style="margin:10px;border:0;padding:0;text-align: center">
                    <el-input clearable v-model="addGroupName"  style="width: 217px;margin: 10px;" placeholder="请输入新建分组名称"></el-input>
                    <el-button type="primary" @click="addGroup">新建</el-button>
                </div>
                <div style="margin:10px;border:0;padding:0;text-align: center">
                    <el-select v-model="delGroupName" placeholder="选择分组"  style="width: 217px;margin: 10px;">
                        <el-option v-for="(item) in groups" :key="item" :label="item" :value="item"></el-option>
                    </el-select>
                    <el-button type="primary" @click="delGroup">删除</el-button>
                </div>
        </el-dialog>
    </div>
</template>

<script>


export default {
    name: "ChooseStock",
    data() {
        return {
            form: {
                stockName: '',
                groupName: '',
                note: '',
            },
            addGroupName: '',
            user: '',
            delGroupName:'',
            groups: [],
            stockVisible: false,
            groupVisible: false,
        }
    },
    methods: {
        loadGroup() {
            this.$axios.get('/stock/group/all/' + this.user.uid).then(res => {
                if (res.code == 200) {
                    this.$message({
                        message: '操作成功！',
                        type: 'success'
                    });
                    this.groups = res.data
                } else {
                    this.$message({
                        message: '操作失败！',
                        type: 'error'
                    });
                }
            })

        },
        addStock() {
            this.$axios.post('/my/stock/save', {
                uid: this.user.uid,
                groupName: this.form.groupName,
                stockname: this.form.stockName,
                note: this.form.note
            }).then(res => {
                if (res.code == 200) {
                    this.$message({
                        message: '操作成功！',
                        type: 'success'
                    });
                    //清空表单
                    this.resetStockDialog()
                    //抛出事件，父组件监听
                    this.$emit('addStockSus');
                    //隐藏组件
                    stockVisible = false
                } else {
                    this.$message({
                        message: '操作失败！',
                        type: 'error'
                    });
                }
            })
        },
        addGroup() {
            this.$axios.post('/stock/group/save/', {
                uid: this.user.uid,
                groupname: this.addGroupName
            }).then(res => {
                if (res.code == 200) {
                    this.$message({
                        message: '操作成功！',
                        type: 'success'
                    });
                    //清空表单
                    this.addGroupName = ''
                    //加载分组
                    this.loadGroup()
                } else {
                    this.$message({
                        message: '操作失败！',
                        type: 'error'
                    });
                }
            })
        },
        delGroup(){
            this.$axios.post('/stock/group/del/'+this.user.uid+'/'+this.delGroupName).then(res => {
                if (res.code == 200) {
                    this.$message({
                        message: '操作成功！',
                        type: 'success'
                    });
                    //清空表单
                    this.delGroupName = ''
                    //加载分组
                    this.loadGroup()
                } else {
                    this.$message({
                        message: '操作失败！',
                        type: 'error'
                    });
                }
            })
        },
        resetStockDialog() {
            this.form.groupName = ''
            this.form.stockName = ''
            this.form.note = ''
        },
    },
    created() {
        this.user = JSON.parse(sessionStorage.getItem('CurUser'))
        this.loadGroup();
    },
    watch: {
        groups: {
            handler(newVal, oldVal) {
                this.groups = newVal
                this.$emit('func', newVal, this.user)
            },
            deep: true
        }
    },
    mounted() {
        //func: 是父组件指定的传数据绑定的函数，this.groups:子组件给父组件传递的数据
        console.log("子组件")
        console.log(this.groups)

    },
    components: {

    },
}
</script>


<style>
</style>