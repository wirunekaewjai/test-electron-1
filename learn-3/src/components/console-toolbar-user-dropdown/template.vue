<template>
  <v-menu
    bottom
    rounded
    offset-y
    :close-on-content-click=false
  >
    <template v-slot:activator="{ on }">
      <v-btn
        v-on="on"
        class="px-1"
        large
        text
      >
        <CommonAvatar
          :photo="user.photo"
          :name="user.name"
        />
        <v-icon
          class="ml-2"
        >
          mdi-menu-down
        </v-icon>
      </v-btn>
    </template>
    <v-card width="min-content" >
      <v-list>
        <v-list-item class="px-6" >
          <v-list-item-avatar class="mr-6" >
            <CommonAvatar
              :photo="user.photo"
              :name="user.name"
              :size="40"
            />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>
              {{ user.name }}
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ user.email }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider class="my-3"></v-divider>
        
        <v-list-item>
          <v-btn
            depressed
            block
            rounded
            text
            large
            to="/profile"
          >
            Edit Profile
          </v-btn>
        </v-list-item>

        <v-divider class="my-3"></v-divider>
        
        <v-list-item>
          <v-btn
            @click.prevent="signOut"
            depressed
            block
            rounded
            text
            large
          >
            Sign Out
          </v-btn>
        </v-list-item>
      </v-list>
    </v-card>
  </v-menu>
</template>

<script lang="ts" src="./script.ts" />