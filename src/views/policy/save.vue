<template>
  <div class="app-container">
    <tinymce
      id="editor"
      ref="editor"
      v-model="content"
      :height="realHeight"
      @handleImgUpload="imgUpload"
    ></tinymce>
  </div>
</template>

<script>
import Tinymce from "@/components/Tinymce";
export default {
  data() {
    return {
      content: "", //富文本的内容
    };
  },
  computed: {
    realHeight() {
      return (
        (window.innerHeight ||
          document.documentElement.clientHeight ||
          document.body.clientHeight) - 200
      );
    },
  },
  components: {
    Tinymce,
  },
  created() {},
  methods: {
    async imgUpload(blobInfo, success, failure) {
      const formData = new FormData();
      formData.append("file", blobInfo.blob());
      try {
        const res = await uploadFile(formData);
        success(res.img_path_list[0]);
      } catch (e) {
        failure("上传失败:" + e);
      }
    },
  },
};
</script>
