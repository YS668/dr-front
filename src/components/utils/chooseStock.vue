<template>
    <div>
        <el-button type="success" @click="stockVisible = true">添加自选股</el-button>
        <el-button type="primary" @click="groupVisible = true">新建分组</el-button>
        <el-dialog :visible.sync="stockVisible" width="50%" center >
            <el-form ref="form" :model="form" label-width="80px" label-position="right">
                <el-form-item label="股票名称">
                    <el-input v-model="form.stockName" placeholder="请输入股票名称"></el-input>
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

        <el-dialog :visible.sync="groupVisible" width="30%" center >
            <el-form ref="form"  label-width="80px" label-position="right">
                <el-form-item label="分组名称">
                    <el-input v-model="addGroupName" placeholder="请输入分组名称"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="addGroup">确认</el-button>
                    <el-button @click="groupVisible = false">取消</el-button>
                </el-form-item>
            </el-form>
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
            addGroupName:'',
            user:'',
            groups: [],
            stockVisible: false,
            groupVisible: false,
        }
    },
    methods: {
        loadUid(){
            this.user = JSON.parse(sessionStorage.getItem('CurUser'))
        },
        loadGroup() {
            this.$axios.get('/stock/group/all/'+this.user.uid).then(res => {
                if (res.code == 200) {
                    this.$message({
                        message: '操作成功！',
                        type: 'success'
                    });
                    console.log(res.data)
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
            this.$axios.post('/my/stock/save',{
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
                } else {
                    this.$message({
                        message: '操作失败！',
                        type: 'error'
                    });
                }
            })
        },
        addGroup() {
            this.$axios.post('/stock/group/save/',{
                uid: this.user.uid,
                groupname: this.addGroupName
            }).then(res => {
                if (res.code == 200) {
                    this.$message({
                        message: '操作成功！',
                        type: 'success'
                    });
                    this.loadGroup()
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
        this.loadUid()
        this.loadGroup();
        //func: 是父组件指定的传数据绑定的函数，this.groups:子组件给父组件传递的数据
        this.$emit('func',this.groups,this.user)
    },
    components: {

    },
}
</script>

<style>

</style>