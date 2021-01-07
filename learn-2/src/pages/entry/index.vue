<template>
  <div>
    <h1>
      # Entry
    </h1>
    <div>
      <Link
        v-bind="{
          page: 'entries',
          message: 'Back to Entries',
        }"
      />
    </div>
  </div>
</template>

<script lang="ts" src="./index.ts" ></script>
<style scoped src="./index.css" ></style>