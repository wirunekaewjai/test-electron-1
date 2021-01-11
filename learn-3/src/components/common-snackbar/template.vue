<template>
  <v-snackbar
    v-model="open"
  >
    {{ message }}
    
    <template v-slot:action="{ attrs }">
      <v-btn
        color="pink"
        text
        v-bind="attrs"
        @click="open = false"
      >
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script lang="ts" src="./script.ts" />
