<template>
  <div>
    home

    <br />
    <v-btn @click.prevent="signOut" >
      Sign Out
    </v-btn>

    <br />
    <br />

    <v-btn @click.prevent="setLight" >
      Light
    </v-btn>
    <v-btn @click.prevent="setDark" >
      Dark
    </v-btn>
  </div>
</template>

<script lang="ts" src="./script.ts" />