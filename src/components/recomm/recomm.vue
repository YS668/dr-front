<!--建议界面-->
<template>
  <div style="text-align: center;">
    <div>
      <DateUtils></DateUtils>
    </div>
    <el-form ref="from" :model="from" label-width="80px">
      <el-form-item :required="true" label="题目">
        <el-col :span="20">
          <el-input clearable  v-model="from.topic"></el-input>
        </el-col>
      </el-form-item>
      <!--富文本编辑器-->
      <el-form-item label="内容:" prop="content">
        <TinymceEditor  v-model="from.content"></TinymceEditor>
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
  
<script type="text/javascript">
import TinymceEditor from '../../components/utils/editor'
import DateUtils from "../utils/DateUtils";


export default {
  name: "Recomm",
  data() {
    return {
      user: {},
      from:{
        content: '',
        topic: ''
      }
      
    }
  },
  methods: {
    save() {
      if (this.from.content == null 
          || this.from.content.length == 0 ) {
        this.$notify.error({
          title: '错误',
          message: '请输入200字数以内的建议再提交，非常感谢您的宝贵建议',
          offset: 100
        });
        return
      }
      if ( this.from.topic != null && this.from.topic.length > 20) {
        this.$notify.error({
          title: '错误',
          message: '题目超过20个字符',
          offset: 100
        });
        return
      }
      if (this.from.content.length > 200) {
        this.$notify.error({
          title: '错误',
          message: '建议内容200字以内，再次感谢您的宝贵建议',
          offset: 100
        });
        return
      }
      this.$axios.post('/recomm/save', {
        uid: this.user.uid,
        topic: this.from.topic,
        content: this.from.content,
      }).then(res => {
        if (res.code == 200) {
          //清空表单
          this.reset()
          this.$notify.success({
            title: '成功',
            message: '已经提交，再次感谢您的宝贵建议',
            offset: 100
          });
        } else {
          this.$notify.error({
            title: '失败',
            message: '非常抱歉，提交失败请稍后重试',
            offset: 100
          });
        }
      })
    },
    reset(){
      this.from.content = ''
      this.from.topic = ''
    }
  },
  created() {
    this.user = JSON.parse(sessionStorage.getItem('CurUser'))
  },
  components: {
    TinymceEditor,
    DateUtils
  }
}
</script>
  
<style lang="less" scoped></style>
  