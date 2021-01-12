<template>
  <v-app v-if="status === 'authenticating' || status === 'ready'" >
    <router-view />
    <!-- <v-skeleton-loader
      v-else
      type="article"
    /> -->
    <CommonSnackbar />
  </v-app>
</template>

<script lang="ts" src="./app.ts" />
