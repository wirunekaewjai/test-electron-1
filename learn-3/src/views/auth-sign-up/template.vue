<template>
  <Layout>
    <v-card-title>
      Sign Up
    </v-card-title>
    <v-card-subtitle>
      Expense Application
    </v-card-subtitle>
    <v-divider />
    <v-card-text>
      <form
        @submit.prevent="submit"
      >
        <v-row>
          <v-col>
            <v-text-field
              @blur="blur('name')"
              @input="input('name')"
              :disabled="submitting"
              :error="!!errors.name"
              :error-messages="errors.name"
              :hide-details="!errors.name"
              v-model="values.name"
              label="Name"
              dense
              outlined
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              @blur="blur('email')"
              @input="input('email')"
              :disabled="submitting"
              :error="!!errors.email"
              :error-messages="errors.email"
              :hide-details="!errors.email"
              v-model="values.email"
              label="Email Address"
              placeholder="awesome@email.com"
              dense
              outlined
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              @click:append="passwordVisible = !passwordVisible"
              @blur="blur('password')"
              @input="input('password')"
              :append-icon="passwordVisible ? 'mdi-eye' : 'mdi-eye-off'"
              :type="passwordVisible ? 'text' : 'password'"
              :disabled="submitting"
              :error="!!errors.password"
              :error-messages="errors.password"
              :hide-details="!errors.password"
              v-model="values.password"
              label="Password"
              dense
              outlined
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col></v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-btn
              :loading="submitting"
              type="submit"
              color="primary"
              block
            >
              Register
            </v-btn>
          </v-col>
        </v-row>
      </form>
    </v-card-text>
    <v-divider/>
    <router-link :to="{ path: '/sign-in', query: $route.query }" >
      <v-btn
        :disabled="submitting"
        color="primary"
        text
        block
      >
        Back to Sign In
      </v-btn>
    </router-link>
  </Layout>
</template>

<script lang="ts" src="./script.ts" />