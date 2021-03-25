<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { bestwishe } from "@/assets/js/bestwishes";
export default {
  name: 'App',
  mounted() {
    bestwishe();
  },
}
</script>
<style>
@import "../src/assets/css/index.css";
</style>
