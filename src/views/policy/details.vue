<template>
  <div class="app-container">
    <el-backtop></el-backtop>
    <div id="data_list" loading>
      <h2>{{ this.policy.poTitle }}</h2>
      <div class="policy_content"><span v-html="this.policy.poContent"></span></div>
    </div>
  </div>
</template>

<script>
import policyApi from "@/api/policy";
export default {
  data() {
    return {
      policy: {},
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
      policyApi
        .getOnePolicy(id)
        .then((response) => {
          this.policy = response.data;
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
  padding: 10px 54px;
}
</style>