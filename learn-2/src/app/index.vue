<template>
  <div id="app">
    <PageSignIn
      v-if="state === 'authentication'"
      v-bind="{
        page,
        props,
      }"
    />
    <PageEntries
      v-if="state === 'ready' && page === 'entries'"
      v-bind="{ ...props }"
    />
    <PageEntry
      v-if="state === 'ready' && page === 'entry'"
      v-bind="{ ...props }"
    />
  </div>
</template>

<script lang="ts" src="./index.ts" ></script>
<style>
body {
  font-family: sans-serif;

  background-color: white;
  margin: 0;
}
</style>