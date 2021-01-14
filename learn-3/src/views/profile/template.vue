<template>
  <v-main>
    <ConsoleToolbar>
      <v-btn
        to="/"
        icon
      >
        <v-icon>
          mdi-arrow-left
        </v-icon>
      </v-btn>
      <v-toolbar-title>
        Edit Profile
      </v-toolbar-title>
      <v-spacer />
      <ConsoleToolbarBulb />
      <ConsoleToolbarUserDropdown />
    </ConsoleToolbar>

    <v-sheet
      :color="$vuetify.theme.dark ? 'black' : 'grey lighten-3'"
      class="d-flex align-start justify-center"
      width="100%"
      height="100%"
    >
      <div
        class="px-4 px-sm-6 px-lg-8 py-12"
        style="width: 100%; max-width: 600px"
      >
        <v-card
          style="overflow: hidden;"
          outlined
        >
          <v-card-text class="d-flex justify-space-between" >
            Avatar
          </v-card-text>
          <v-divider></v-divider>
          <v-card-text>
            <v-file-input
              :rules="rules"
              v-model="file"
              accept="image/png, image/jpeg"
              prepend-icon="mdi-camera"
              placeholder="image.jpg, image.png"
              hide-details
              dense
              outlined
            >
            </v-file-input>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-text>
            <v-btn
              @click.prevent="upload"
              :disabled="!file"
              color="primary"
            >
              Upload
            </v-btn>
          </v-card-text>
        </v-card>
      </div>
    </v-sheet>
  </v-main>
</template>

<script lang="ts" src="./script.ts" />