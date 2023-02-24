<!--公告界面-->
<template>
  <div>
    <div style="text-align: center;">
      <DateUtils></DateUtils>
    </div>
    <div v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" v-for="item in notice" :key="item.topic" style="margin-top: 20px;">
      <textRoll  :value="item.content" @click.native="show(item)"></textRoll>
    </div>
    <el-dialog  :visible.sync="dialogVisible" width="30%" center  :title="tit" >
      <span>{{ str }}</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
  
<script type="text/javascript">
import DateUtils from "../utils/DateUtils";
import textRoll from '../utils/textRoll';

export default {
  name: "Notice",
  data() {
    return {
      notice: [
        {
          topic: '1',
          content: '1发哈设计开发你回去设计开发首府拉萨就发生了发起设立开发商的发哈十六分爱上了开发阿斯弗时代发哈设计开发你回去设计开发首府拉萨就发生了发起设立开发商的发哈十六分爱上了开发阿斯弗时代',
        },
        {
          topic: '2',
          content: '2发哈设计开发你回去设计开发首府拉萨就发生了发起设立开发商的发哈十六分爱上了开发阿斯弗时代发哈设计开发你回去设计开发首府拉萨就发生了发起设立开发商的发哈十六分爱上了开发阿斯弗时代',
        },
        {
          topic: '3',
          content: '3发哈设计开发你回去设计开发首府拉萨就发生了发起设立开发商的发哈十六分爱上了开发阿斯弗时代发哈设计开发你回去设计开发首府拉萨就发生了发起设立开发商的发哈十六分爱上了开发阿斯弗时代',
        },
        {
          topic: '4',
          content: '4发哈设计开发你回去设计开发首府拉萨就发生了发起设立开发商的发哈十六分爱上了开发阿斯弗时代发哈设计开发你回去设计开发首府拉萨就发生了发起设立开发商的发哈十六分爱上了开发阿斯弗时代',
        },
        {
          topic: '5',
          content: '5发哈设计开发你回去设计开发首府拉萨就发生了发起设立开发商的发哈十六分爱上了开发阿斯弗时代发哈设计开发你回去设计开发首府拉萨就发生了发起设立开发商的发哈十六分爱上了开发阿斯弗时代',
        },
        {
          topic: '6',
          content: '6发哈设计开发你回去设计开发首府拉萨就发生了发起设立开发商的发哈十六分爱上了开发阿斯弗时代发哈设计开发你回去设计开发首府拉萨就发生了发起设立开发商的发哈十六分爱上了开发阿斯弗时代',
        },
      ],
      loading: true,
      dialogVisible:false,
      tit:'',
      str:''
    }
  },
  methods: {
    //加载公告
    loadPost() {
      this.$axios.get('').then(res => {
        if (res.code == 200) {
          this.$message({
            message: '操作成功！',
            type: 'success'
          });
          this.loading = false
        } else {
          this.$message({
            message: '操作失败！',
            type: 'error'
          });
        }
      })
    },
    show(val) {
      this.tit = val.topic
      this.str = val.content
      this.dialogVisible = true
    }
  },
  created() {
    this.loadPost()
  },
  components: {
    DateUtils,
    textRoll
  },

}
</script>
  
<style lang="less" scoped></style>
  