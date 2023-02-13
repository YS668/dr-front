<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="12">
                <span>
                    <!--微信-->
                    <img src="https://dr-data.oss-cn-guangzhou.aliyuncs.com/pay/wechat.jpg" />
                </span>
            </el-col>
            <el-col :span="12">
                <span>
                    <!--支付宝-->
                    <img src="https://dr-data.oss-cn-guangzhou.aliyuncs.com/pay/zhifubao.jpg" />
                </span>
            </el-col>
        </el-row>
        
        
    </div>
</template>

<script>


export default {
    name: "Money",
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

img{
    display : block ;
    padding : 1px ;
    background : blueviolet ;
    border : 1px solid black ;
    height: 50%;
    width: 60%;
}

</style>