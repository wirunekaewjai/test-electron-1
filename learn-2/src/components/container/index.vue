<template>
  <main>
    <slot></slot>
  </main>
</template>

<script lang="ts" >
import Vue from 'vue';
export default Vue.extend({ name: 'wk-container' });
</script>

<style scoped>
main {
  padding: 8px;
}

@media screen and (min-width: 768px) {
  main {
    padding: 16px 24px;
  }
}

@media screen and (min-width: 992px) {
  main {
    padding: 24px 32px;
  }
}
</style>