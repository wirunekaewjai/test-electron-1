<template>
  <button v-on:click.prevent="click" >
    <slot></slot>
  </button>
</template>

<script lang="ts" src="./index.ts" ></script>

<style scoped>
button {
  background-color: transparent;
  border: none;

  text-decoration: underline;
  cursor: pointer;

  padding: 0;
}

button:hover {
  color: cornflowerblue;
}
</style>