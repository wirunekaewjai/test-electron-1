<template>
  <v-sheet
    class="d-flex align-center justify-center"
    color="grey lighten-3"
    width="100%"
    height="100vh"
  >
    <div
      class="px-4 px-sm-6 px-lg-8 py-12"
      style="width: 100%; max-width: 600px"
    >
      <transition
        name="slide-fade"
        appear
      >
        <v-card
          outlined
        >
          <slot></slot>
        </v-card>
      </transition>
    </div>
  </v-sheet>
</template>