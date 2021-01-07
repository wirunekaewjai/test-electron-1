<template>
  <div>
    <slot></slot>
  </div>
</template>

<script lang="ts" >
import Vue from 'vue';
export default Vue.extend({ name: 'wk-card' });
</script>

<style scoped>
div {
  border-width: 1px;
  border-style: solid;
  border-color: #d9d9d9;
  border-radius: 8px;

  overflow: hidden;
}
</style>