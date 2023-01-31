<template>
  <el-table
    :data="tableData"
    style="width: 100%">
        <el-table-column fixed prop="createTime" label="日期" align="left">
		    <span slot-scope="scope" style="color: black;">
                {{dateFormat('YYYY-mm-dd',scope.row.createTime)}}
            </span>
       </el-table-column>
        <el-table-column  prop="historyHigh" label="历史新高" align="left">
        </el-table-column>
        <el-table-column prop="yearHigh" label="一年新高" align="left">
            <span slot-scope="scope" style="color: red;">
                {{scope.row.yearHigh}}
            </span>
        </el-table-column>
        <el-table-column prop="yearLow" label="一年新低" align="left">
        </el-table-column>
        <el-table-column prop="downLimit"  label="跌停" align="left">
            <span slot-scope="scope" style="color: red;">
                {{scope.row.downLimit}}
            </span>
        </el-table-column>
        <el-table-column prop="downFive" label="跌幅超5%" align="left">
        </el-table-column>
        <el-table-column prop="upLimit" label="涨停" align="left">
            <span slot-scope="scope" style="color: red;">
                {{scope.row.upLimit}}
            </span>
        </el-table-column>
        <el-table-column prop="noOneUp" label="非一字涨停" align="left">
        </el-table-column>
        <el-table-column prop="upFive" label="涨幅超5%" align="left">
        </el-table-column>
        <el-table-column prop="upAll" label="上涨家数" align="left">
            <span slot-scope="scope" style="color: red;">
                {{scope.row.upAll}}
            </span>
        </el-table-column>
        <el-table-column prop="shIndex" label="上证指数" align="left">
        </el-table-column>
        <el-table-column prop="businessIndex" label="创业板指" align="center">
        </el-table-column>
        <el-table-column prop="turnOveer" label="成交额" align="center">
            <span slot-scope="scope" style="color: red;">
                {{scope.row.turnOveer}}
            </span>
        </el-table-column>
    </el-table>
</template>

<script type="text/javascript">
export default {
    name: "Main",
    data() {
        return {
            tableData:[]
        }
    },
    methods: {
        loadPost() {
            this.$axios.get('/review/all').then(res => {
                 if(res.code == 200){
                    this.$message({
                            message: '操作成功！',
                            type: 'success'
                        });
                    this.tableData = res.data
                 }else{
                    this.$message({
                            message: '操作失败！',
                            type: 'error'
                        });
                 }
            })
        },
        //日期格式转换
        dateFormat(fmt, date) {
			let ret="";
			date=new Date(date);
			const opt = {
			    'Y+': date.getFullYear().toString(), // 年
			    'm+': (date.getMonth() + 1).toString(), // 月
			    'd+': date.getDate().toString(), // 日
			    'H+': date.getHours().toString(), // 时
			    'M+': date.getMinutes().toString(), // 分
			    'S+': date.getSeconds().toString() // 秒
			    // 有其他格式化字符需求可以继续添加，必须转化成字符串
			    }
			    for (let k in opt) {
			        ret = new RegExp('(' + k + ')').exec(fmt)
			        if (ret) {
			            fmt = fmt.replace(
			            ret[1],
			            ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, '0')
			            )
			        }
			    }
			 return fmt
		}
    },
    beforeMount() {
        this.loadPost();
    },
    components: {
    }
}
</script>

<style lang="less" scoped>

</style>
