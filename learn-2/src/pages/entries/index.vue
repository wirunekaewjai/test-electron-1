<template>
  <div>
    <h1>
      # Entries
    </h1>
    <div>
      <Link
        v-bind="{
          page: 'entry',
          props: {
            entryID: '10',
          },
          message: 'Go to Entry',
        }"
      />
    </div>
  </div>
</template>

<script lang="ts" src="./index.ts" ></script>
<style scoped src="./index.css" ></style>