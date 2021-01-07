<template>
  <div id="app">
    <PageEntries v-if="page === 'entries'" v-bind="{ ...props }" />
    <PageEntry v-if="page === 'entry'" v-bind="{ ...props }" />
  </div>
</template>

<script lang="ts" src="./index.ts" ></script>
<style src="./index.css" ></style>