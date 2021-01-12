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
          <span class="headline">Create Transaction</span>
        </v-card-title>
        <v-divider />
        <v-card-text class="pt-4" >
          <v-text-field
            @blur="blur('amount')"
            @input="input('amount')"
            :disabled="submitting"
            :error="!!errors.amount"
            :error-messages="errors.amount"
            :hide-details="!errors.amount"
            v-model="values.amount"
            type="number"
            label="Amount*"
            placeholder="+20"
            dense
            outlined
            autofocus
            required
          >
          </v-text-field>
        </v-card-text>
        <v-card-text>
          <v-text-field
            @blur="blur('message')"
            @input="input('message')"
            :disabled="submitting"
            :error="!!errors.message"
            :error-messages="errors.message"
            :hide-details="!errors.message"
            v-model="values.message"
            label="Message"
            placeholder="Daily Income"
            dense
            outlined
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