<template>
  <div>
    home

    <br />
    <v-btn @click.prevent="signOut" >
      Sign Out
    </v-btn>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Auth } from '@aws-amplify/auth';

export default Vue.extend({
  name: 'view-home',
  methods: {
    async signOut () {
      await Auth.signOut();
    },
  },
});
</script>