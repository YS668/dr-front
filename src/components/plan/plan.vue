<!--计划界面-->
<template>
  <div class="page-content">
    <div style="margin-bottom: 5px;">
      <el-input v-model="topic" placeholder="请输入主题" suffix-icon="el-icon-search" style="width: 200px;"
        @keyup.enter.native="loadPost"></el-input>
      <el-button type="primary" style="margin-left: 5px;" @click="loadPost">查询</el-button>
      <el-button type="success" @click="topic = ''">重置</el-button>
      <el-button type="primary" style="margin-left: 5px;" @click="writeVisible = true">新增</el-button>
    </div>
    <el-table :data="tableData" :header-cell-style="rowClass" :default-sort="{ prop: 'rdid', order: 'descending' }"
      border style="width: 100%" highlight-current-row>
      <el-table-column fixed sortable prop="rdid" width="110" label="日期" align="left">
        <span slot-scope="scope">
          <el-tag effect="dark">{{ rdidFormat(scope.row.rdid) }}</el-tag>
        </span>
      </el-table-column>
      <el-table-column prop="topic" label="主题" align="left">
      </el-table-column>
      <!--日周月年-->>
      <el-table-column prop="type" label="类型" align="left">
      </el-table-column>
      <el-table-column prop="flag" label="复盘模式" align="left">
      </el-table-column>
      <el-table-column prop="operate" label="操作">
        <template slot-scope="scope">
          <el-button size="small" type="success" @click="getContent(scope.row.content)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNum"
      :page-sizes="[1, 5, 10, 20, 30]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>

    <el-dialog title="书写复盘" :visible.sync="writeVisible" width="80%" center>
      <el-form ref="plan" :model="plan" label-width="80px">
        <el-form-item label="时间">
          <el-col :span="20">
            202
          </el-col>
        </el-form-item>
        <el-form-item label="主题">
          <el-col :span="20">
            <el-input v-model="plan.topic"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="复盘类型">
          <el-col :span="20">
            <el-radio-group v-model="plan.type">
              <el-radio-button label="1">日复盘</el-radio-button>
              <el-radio-button label="2">周总结</el-radio-button>
              <el-radio-button label="3">月总结</el-radio-button>
              <el-radio-button label="4">年总结</el-radio-button>
            </el-radio-group>
          </el-col>
        </el-form-item>
        <el-form-item label="复盘模式">
          <el-col :span="20">
            <el-radio-group v-model="plan.flag">
              <el-radio-button label="1">固定格式</el-radio-button>
              <el-radio-button label="2">全文</el-radio-button>
            </el-radio-group>
          </el-col>
        </el-form-item>
        <el-form-item label="选择格式" v-if="plan.flag == 1">
          <el-col :span="20">
            <el-radio-group v-model="plan.type">
              <el-radio-button label="指数"></el-radio-button>
              <el-radio-button label="板块"></el-radio-button>
              <el-radio-button label="计划"></el-radio-button>
              <el-radio-button label="反思"></el-radio-button>
            </el-radio-group>
          </el-col>
        </el-form-item>
        <!--富文本编辑器-->
        <el-form-item label="内容:" prop="content">
          <!-- 图片上传组件辅助 -->
          <el-upload 
            class="avatar-uploader" 
            :action="editorOption.serverUrl" 
            name="file" :show-file-list="false"
            :on-success="uploadSuccess" 
            :on-error="uploadError" 
            :before-upload="beforeUpload" 
            style="display: none;">
          </el-upload>
          <quill-editor 
            class="editor" 
            ref="myQuillEditor" 
            v-model.lazy.trim="plan.content" 
            :options="editorOption"
            @blur="onEditorBlur($event)" 
            @focus="onEditorFocus($event)" 
            @ready="onEditorReady($event)"
            @change="onEditorChange($event)" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="writeVisible = false">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script type="text/javascript">
//定义编辑框功能区，具体的可到官网上查看
const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
  [{ 'header': 1 }, { 'header': 2 }],               // custom button values
  [{ 'list': 'ordered' }, { 'list': 'bullet' }],
  [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
  [{ 'direction': 'rtl' }],                         // text direction
  [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
  [{ 'font': [] }],
  [{ 'align': [] }],
  ['link', 'image'],
  ['clean']
]

//提交数据的方法，自己定义吧
//import { shelfVehicle } from "@/api/disassemble"

//从这儿往下5行是引入编辑框相关事宜，上面也有
import { quillEditor } from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
//import "@/config/quill/quill.scss";
export default {
  name: "Plan",
  data() {
    return {
      tableData: [],
      writeVisible: false,
      plan: {
        uid: '',
        topic: '',
        type: '1',
        flag: '2',
        content: ''
      },
      topic: '',
      pageSize: 10,
      pageNum: 1,
      total: 0,
      //富文本配置
      editorOption: {
        placeholder: "请输入相关内容",
        modules: {
          toolbar: {
            container: toolbarOptions,
            handlers: {
              'image': function (value) {
                if (value) {
                  document.querySelector('.avatar-uploader input').click()
                } else {
                  this.quill.format('image', false);
                }
              }
            }
          }
        },
        // 此项配置是选择图片之后的上传路径
        serverUrl: "xxx"
      },
      //加载动画
      loading: "",
       //上传图片
       fileList: [],
        dialogImageUrl: "",
        dialogVisible: false,
        postFile: "",

    }
  },
  methods: {
    loadPost() {
      this.$axios.post('/review/plan/page', {
        pageSize: this.pageSize,
        pageNum: this.pageNum,
        param: {

        }
      }).then(res => {
        if (res.code == 200) {
          this.$message({
            message: '操作成功！',
            type: 'success'
          });
          this.tableData = res.data
          this.total = res.total
        } else {
          this.$message({
            message: '操作失败！',
            type: 'error'
          });
        }
      })
    },
    rdidFormat(rdid) {
      return rdid.substring(0, 4) + "-" + rdid.substring(4, 6) + "-" + rdid.substring(6, 8);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageNum = 1
      this.pageSize = val
      this.loadPost()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pageNum = val
      this.loadPost()
    },
    //设置表头的颜色
    rowClass({ row, rowIndex }) {
      console.log(rowIndex) //表头行标号为0
      return 'background: gainsboro'
    },
    //监听富文本编辑框动向，敌不动我不动敌若动我乱动，还有个上传图片
    onEditorChange({ editor, html, text }) {
      // 此处三项可以自己在控制台打印
      this.quillForm.content = html
    },
    //图片上传前，显示loading动画，element官网上的，可以自行查找
    beforeUpload() {
      this.loading = this.$loading({
        lock: true,
        text: '图片加载中，请稍后！',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
    },
    // 上传成功
    uploadSuccess(res, file) {
      // 获取富文本组件实例
      let quill = this.$refs.myQuillEditor.quill
      if (res.code == 200) {
        // 获取光标所在位置
        let length = quill.getSelection().index;
        // 获取光标所在位置// 获取光标所在位置
        quill.insertEmbed(length, 'image', res.message)
        // 调整光标到最后
        quill.setSelection(length + 1)
      } else {
        this.$message.error(res.message)
      }
      this.loading.close();
    },
    // 上传失败来到这里
    uploadError() {
      this.loading.close();
      this.$message.error(res.message)
    },

    //监听编辑器事件，此处三个事件可以自己根据业务定义
    onEditorBlur(quill) { },
    onEditorFocus(quill) { },
    onEditorReady(quill) { },

    /* 下面是上传图片 */
    //拿到图片对象
    getFile(file, fileList) {
      this.postFile = file.raw
      this.fileList = fileList
    },
    //查看图片预览
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //删除图片
    handleRemove(file, fileList) {
      this.dialogImageUrl = ""
      this.fileList = []
      this.dialogVisible = false
    },
  },
  beforeMount() {
    this.loadPost();
  },
  components: {

  }
}
</script>

<style lang="less" scoped>
.page-content {
    width: 100%;
    height: 100%;
 
    /deep/ .editor {
      margin-top: 15px;
 
      .ql-editor {
        min-height: 300px;
      }
    }
 
    .header {
      padding-bottom: 15px;
      border-bottom: 1px solid #eee;
    }
 
    /deep/ .el-form {
      .el-form-item {
        max-width: 700px;
      }
    }
 
    /* 此处是隐藏上传按钮的样式 */
    /deep/ .disabled .el-upload--picture-card {
      display: none;
    }
  }

</style>