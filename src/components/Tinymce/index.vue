<template>
  <div class="tinymce-editor">
    <editor :id="editorId" v-model="editorValue" :init="editorInit" />
    <div v-html="editorValue"></div>
  </div>
</template>

<script>
/*
使用npm库
// 引入tinymce主件
import tinymce from 'tinymce/tinymce'
// 引入tinymce-vue组件
import Editor from '@tinymce/tinymce-vue'
import 'tinymce/icons/default/icons'
// 必须引入主体才能汉化和显示
import 'tinymce/themes/silver'
// 引入富文本编辑器主题的js和css
import 'tinymce/themes/silver/theme.min'
import 'tinymce/skins/ui/oxide/skin.min.css'
// 扩展插件
import 'tinymce/plugins/image'
import 'tinymce/plugins/link'
import 'tinymce/plugins/code'
import 'tinymce/plugins/table'
import 'tinymce/plugins/lists'
import 'tinymce/plugins/wordcount' // 字数统计插件
import 'tinymce/plugins/media' // 插入视频插件
import 'tinymce/plugins/template' // 模板插件
import 'tinymce/plugins/fullscreen'
import 'tinymce/plugins/paste'
import 'tinymce/plugins/preview'
import 'tinymce/plugins/contextmenu'
import 'tinymce/plugins/textcolor'
*/

/*
使用public本地库
*/
// 引入tinymce主件
import tinymce from '../../../public/tinymce/tinymce'
// 引入tinymce-vue组件
import Editor from '@tinymce/tinymce-vue'
// 必须引入主体才能汉化和显示
import '../../../public/tinymce/themes/silver'
import '../../../public/tinymce/icons/default/icons'
// 引入富文本编辑器主题的js和css
import '../../../public/tinymce/themes/silver/theme.min'
import '../../../public/tinymce/skins/ui/oxide/skin.min.css'
// 扩展插件
import '../../../public/tinymce/plugins/image'
import '../../../public/tinymce/plugins/link'
import '../../../public/tinymce/plugins/code'
import '../../../public/tinymce/plugins/table'
import '../../../public/tinymce/plugins/lists'
import '../../../public/tinymce/plugins/wordcount' // 字数统计插件
import '../../../public/tinymce/plugins/media' // 插入视频插件
import '../../../public/tinymce/plugins/template' // 模板插件
import '../../../public/tinymce/plugins/fullscreen'
import '../../../public/tinymce/plugins/paste'
import '../../../public/tinymce/plugins/preview'
import '../../../public/tinymce/plugins/contextmenu'
import '../../../public/tinymce/plugins/textcolor'

export default {
  name: 'Tinymce',
  components: {
    Editor,
  },
  props: {
    height: {
      type: Number,
      default: 500,
    },
    id: {
      type: String,
      default: 'tinymceEditor',
    },
    value: {
      type: String,
      default: '',
    },
    // plugins: {
    //   type: [String, Array],
    //   default:
    //     'link lists image code table wordcount media fullscreen preview paste contextmenu textcolor',
    // },
    plugins: {
      type: [String, Array],
      default:
        'link lists image code table wordcount media fullscreen preview paste',
    },
    toolbar: {
      type: [String, Array],
      default:
        'fontselect | bold italic underline strikethrough | link unlink image | undo redo | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent blockquote | code | removeformat',
    },
  },
  data() {
    return {
      editorInit: {
        language_url: '../../../admin/tinymce/langs/zh_CN.js',
        language: 'zh_CN',
        skin_url: '../../../public/tinymce/skins/ui/oxide',
        content_css: '../../../public/tinymce/skins/content/default/content.css',
        height: this.height,
        content_style: '* { padding:0; margin:0; } img {max-width:100% !important }',
        plugin_preview_width: 375, // 预览宽度
        plugin_preview_height: 668,
        lineheight_val:
          '1 1.1 1.2 1.3 1.35 1.4 1.5 1.55 1.6 1.75 1.8 1.9 1.95 2 2.1 2.2 2.3 2.4 2.5 2.6 2.7 2.8 3 3.1 3.2 3.3 3.4 4 5',
        fontsize_formats: '8pt 10pt 11pt 12pt 13pt 14pt 15pt 16pt 17pt 18pt 24pt 36pt',
        font_formats:
          "微软雅黑='微软雅黑';宋体='宋体';黑体='黑体';仿宋='仿宋';楷体='楷体';隶书='隶书';幼圆='幼圆';Andale Mono=andale mono,times;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;Comic Sans MS=comic sans ms,sans-serif;Courier New=courier new,courier;Georgia=georgia,palatino;Helvetica=helvetica;Impact=impact,chicago;Symbol=symbol;Tahoma=tahoma,arial,helvetica,sans-serif;Terminal=terminal,monaco;Times New Roman=times new roman,times;Trebuchet MS=trebuchet ms,geneva;Verdana=verdana,geneva;Webdings=webdings;Wingdings=wingdings",
        plugins: this.plugins,
        powerpaste_word_import: 'merge',
        toolbar: this.toolbar,
        paste_data_images: true,
        statusbar: true, // 底部的状态栏
        menubar: true, // 最上方的菜单
        branding: false, // 水印“Powered by TinyMCE”
        convert_urls: false,//去除URL转换
        images_upload_handler: (blobInfo, success, failure) => {
          this.$emit('handleImgUpload', blobInfo, success, failure)
        },
      },
      editorId: this.id,
      newValue: '',
    }
  },
  watch: {
    newValue(newValue) {
      this.$emit('input', newValue)
    },
  },
  mounted() {
    tinymce.init({})
  },
  beforeDestroy() {
    this.clear()
    tinymce.remove()
  },
  computed: {
    editorValue: {
      get() {
        return this.value
      },
      set(val) {
        this.newValue = val
      },
    },
  },
  methods: {
    // https://github.com/tinymce/tinymce-vue => All available events
    clear() {
      this.editorValue = ''
    },
  },
}
</script>

<style lang="less" scoped>
</style>