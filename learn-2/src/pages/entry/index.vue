<template>
  <wk-container>
    <h1>
      # Entry
    </h1>
    <p v-if="loading" >
      กำลังโหลด . . .
    </p>
    <div v-else >
      <div>
        ID: {{ entryID }}
      </div>
      <div>
        Name: 
        <input
          v-model="name"
        />
      </div>
      <div>
        Description:
        <input
          v-model="description"
        />
      </div>
      <div>
        <button
          v-on:click.prevent="save"
          v-bind:disabled="saving"
        >
          <span v-if="saving" >กำลังบันทึก</span>
          <span v-else>บันทึก</span>
        </button>
      </div>
    </div>
    <div>
      <wk-link v-bind="{ page: 'entries' }" >
        Back to Entries
      </wk-link>
    </div>
  </wk-container>
</template>

<script lang="ts" src="./index.ts" ></script>