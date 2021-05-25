<template>
  <div class="app-container">
    <el-backtop></el-backtop>
    <div id="data_list" loading>
      <h2>{{ this.notice.noTitle }}</h2>
      <div class="policy_content"><div v-html="this.notice.noContent"></div></div>
    </div>
  </div>
</template>

<script>
import noticeApi from "@/api/notice";
export default {
  data() {
    return {
      notice: {},
      loading: true,
    };
  },
  created() {
    if (this.$route.params && this.$route.params.id) {
      this.getData(this.$route.params.id);
    }
  },
  methods: {
    getData(id) {
      noticeApi
        .getOneNotice(id)
        .then((response) => {
          this.notice = response.data;
          this.loading = false;
        })
        .catch((error) => {});
    },
  },
};
</script>
<style scoped>
.app-container #data_list h2{
  text-align: center;
}
.app-container #data_list .policy_content{
  padding: 10px 100px;
}
</style>