<template>
    <div>
        <Editor id="tinymce" v-model="content" :init="init" :disabled="disabled"></Editor>
    </div>
</template>

<script>
import tinymce from "tinymce";
import Editor from "@tinymce/tinymce-vue"; import 'tinymce/themes/silver/theme';
import "tinymce/themes/silver/theme";
//import "tinymce/plugins/image";
//import "tinymce/plugins/link";
import "tinymce/plugins/code";
import "tinymce/plugins/table";
import "tinymce/plugins/lists";
import "tinymce/plugins/wordcount";


export default {
    name: "Index",
    props: {
        value: {
            type: String,
            default: ""
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            init: {
                language_url: '/tinymce/langs/zh_CN.js', // 语言包位置，因为放在public下所以可以省略public
                selector: "#tinymce", //tinymce的id
                language: "zh_CN", //语言类型
                skin_url: '/tinymce/skins/ui/oxide',
                height: 380, //编辑器高度
                width: 1000, //宽度
                menubar: '', //菜单栏
                browser_spellcheck: true, // 拼写检查
                // elementpath: false, //禁用编辑器底部的状态栏
                // statusbar: false, // 隐藏编辑器底部的状态栏
                paste_data_images: true, // 允许粘贴图像
                // menubar: false, //最顶部文字信息
                plugins: "  code table lists wordcount",
                //plugins: "image link code table lists wordcount",
                content_css: '',
                branding: false, //是否禁用“Powered by TinyMCE”
                toolbar: "fontselect fontsizeselect  lineheight forecolor backcolor bold italic underline strikethrough | alignleft aligncenter alignright alignjustify |  quicklink h1 h2 h3 blockquote table numlist bullist preview fullscreen", //工具栏
                //toolbar: "fontselect fontsizeselect link lineheight forecolor backcolor bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | image quicklink h2 h3 blockquote table numlist bullist preview fullscreen", //工具栏
                fontsize_formats: "12px 14px 16px 18px 24px 36px 48px 56px 72px",
                font_formats: "微软雅黑=Microsoft YaHei,Helvetica Neue,PingFang SC,sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun,serif;仿宋体=FangSong,serif;黑体=SimHei,sans-serif;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;",
                setup: function (editor) {
                    editor.on('init', function (e) {
                        this.getBody().style.fontSize = '14px';
                    });
                },
            },
            content: this.value,
        }
    },
    methods: {
    },
    created() {
        tinymce.init({});
    },
    watch: {
        value(newValue) {
            this.content = newValue;
        },
        content(newValue) {
            this.$emit("input", newValue);
        },
    },
    components: {
        Editor
    },
}
</script>

<style>

</style>