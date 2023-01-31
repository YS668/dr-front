<template>
  <div style="display: flex; height: 60px">
    <div style="margin-top: 8px;">
        <i class="el-icon-s-fold" style="font-size: 20px;cursor: pointer;" @click="collapse"></i>
    </div>
    <div style="flex: 1;text-align: center;font-size: 34px;">
        <span>易复天天欢迎你</span>
    </div>
    <el-dropdown>
          <span>王小虎</span>
          <i class="el-icon-arrow-down" style="margin-left: 5px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="toUser">个人中心</el-dropdown-item>
            <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        
  </div>
</template>

<script type="text/javascript">
export default {
  name: "Headers",
  data() {
    return {

    }
  },
  methods: {
    toUser(){

    },
    logout(){

    },
    collapse(){
        //传递给父组件
        this.$emit("doCollapse")
    }
  },
  components: {
  }
}
</script>

<style lang="less" scoped>
</style>
