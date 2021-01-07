<template>
  <wk-container>
    <h1>
      # Sign In
    </h1>
    
    <form v-on:submit.prevent="submit" >
      <fieldset>
        <label>
          Username: 
        </label>
        <input
          type="text"
          name="username"
          v-model="username"
        />
      </fieldset>

      <fieldset>
        <label>
          Password: 
        </label>
        <input
          type="password"
          name="password"
          v-model="password"
        />
      </fieldset>

      <button
        type="submit"
        v-bind:disabled="submitting"
      >
        <span v-if="submitting" >กำลังเข้าสู่ระบบ</span>
        <span v-else>เข้าสู่ระบบ</span>
      </button>
    </form>
  </wk-container>
</template>

<script lang="ts" src="./index.ts" ></script>