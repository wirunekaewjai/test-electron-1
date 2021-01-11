<template>
  <v-app>
    <router-view v-if="ready" />
    <v-skeleton-loader
      v-else
      type="article"
    />
  </v-app>
</template>

<script lang="ts" src="./app.ts" />
