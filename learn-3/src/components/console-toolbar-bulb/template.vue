<template>
  <v-btn
    @click="toggle"
    icon
  >
    <v-icon v-if="$vuetify.theme.dark" >
      mdi-lightbulb-on-outline
    </v-icon>
    <v-icon v-else >
      mdi-lightbulb-on
    </v-icon>
  </v-btn>
</template>

<script lang="ts" src="./script.ts" />