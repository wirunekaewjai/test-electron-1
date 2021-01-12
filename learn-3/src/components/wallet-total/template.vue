<template>
  <v-progress-circular
    v-if="loading"
    indeterminate
    size="16"
    width="2"
    color="primary"
  >
  </v-progress-circular>
  <span v-else >
    {{ total }}
  </span>
</template>
<script lang="ts" src="./script.ts" />