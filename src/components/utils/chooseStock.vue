<template>
    <div>
        <el-button type="success" @click="stockVisible = true">添加自选股</el-button>
        <el-button type="primary" @click="groupVisible = true">新建分组</el-button>
        <el-dialog :visible.sync="stockVisible" width="50%" center :title="tit">
            <el-form ref="form" :model="form" label-width="80px" label-position="right">
                <el-form-item label="股票名称">
                    <el-input v-model="form.stockName"></el-input>
                </el-form-item>
                <el-form-item label="分组">
                    <el-select v-model="form.group" placeholder="请选择分组" style="margin: 10px;">
                        <el-option v-for="(item) in groups" :key="item" :label="item" :value="item"></el-option>
                    </el-select>
                    <el-button type="primary" @click="groupVisible = true">新建分组</el-button>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="addStock">添加自选</el-button>
                    <el-button>取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

        <el-dialog :visible.sync="groupVisible" width="30%" center :title="tit">
            <el-form ref="form" :model="form" label-width="80px" label-position="right">
                <el-form-item label="分组名称">
                    <el-input v-model="form.stockName"></el-input>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input v-model="form.stockName"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="addStock">确认</el-button>
                    <el-button>取消</el-button>
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
                group: '',
            },
            stockVisible: false,
            groupVisible: false,
        }
    },
    methods: {
        addStock() {

        },
        addGroup() {

        }
    },
    created() {
    },
    components: {

    },
}
</script>

<style>

</style>