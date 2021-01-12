<template>
  <v-main>
    <slot name="toolbar" ></slot>
    
    <div
      class="d-flex flex-grow-1 flex-shrink-1"
      style="height: 100%;"
    >
      <transition
        name="slide-fade"
        mode="out-in"
        appear
      >
        <slot></slot>
      </transition>
    </div>
    <ConsoleDrawerTemporary />
  </v-main>
</template>

<script lang="ts" src="./script.ts" />