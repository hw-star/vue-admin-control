<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { bestwishe } from "@/utils/bestwishes";
export default {
  name: 'App',
  mounted() {
    bestwishe();
  },
}
</script>
