<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="12">
                <div style="height:50%;width:50%;">
                    <el-table :data="tableData" style="width: 100%">
                        <el-table-column  label="雪球">
                            <template slot-scope="{}" slot="header" style="text-align: center;">
                                雪球
                                </template>
                            <el-table-column prop="name" label="1小时内" width="120">
                                <template slot-scope="{}" slot="header">1小时内
                                </template>
                            </el-table-column>
                            <el-table-column prop="name" label="24小时内" width="120">
                            </el-table-column>
                        </el-table-column>
                    </el-table>

                </div>
            </el-col>
            <el-col :span="12">
                <div style="height:50%;width:50%;">
                    东方财富
                </div>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="12">
                <div style="height:50%;width:50%;">
                    同花顺
                </div>
            </el-col>
            <el-col :span="12">
                <div style="height:50%;width:50%;">
                    淘股吧
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>


export default {
    name: "Hot",
    data() {
        return {

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