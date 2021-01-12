<template>
  <v-dialog
    v-model="open"
    persistent
    max-width="320px"
  >
    <template v-slot:activator="{ on, attrs }" >
      <v-btn
        color="primary"
        x-small
        v-bind="attrs"
        v-on="on"
      >
        Create
      </v-btn>
    </template>
    <form @submit.prevent="submit" >
      <v-card>
        <v-card-title>
          <span class="headline">Create Wallet</span>
        </v-card-title>
        <v-divider />
        <v-card-text class="pt-4" >
          <v-text-field
            @blur="blur('name')"
            @input="input('name')"
            :disabled="submitting"
            :error="!!errors.name"
            :error-messages="errors.name"
            :hide-details="!errors.name"
            v-model="values.name"
            label="Name"
            placeholder="Awesome Wallet"
            dense
            outlined
            autofocus
          >
          </v-text-field>
        </v-card-text>
        <v-divider />
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            text
            @click="close"
          >
            Close
          </v-btn>
          <v-btn
            type="submit"
            color="blue darken-1"
            text
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </form>
  </v-dialog>
</template>

<script lang="ts" src="./script.ts" />