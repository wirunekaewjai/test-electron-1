<template>
  <v-avatar
    color="pink"
    :size="size"
  >
    <img
      v-if="src"
      :src="src"
      :alt="name"
    >
    <span
      v-else
      class="white--text body2"
    >
      {{ alt }}  
    </span>
  </v-avatar>
</template>

<script lang="ts" src="./script.ts" />