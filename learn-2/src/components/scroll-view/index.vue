<template>
  <div v-bind:style="{ height }" >
    <slot></slot>
  </div>
</template>

<script lang="ts" src="./index.ts" ></script>
<style scoped>
div {
  overflow-y: auto;
}
</style>