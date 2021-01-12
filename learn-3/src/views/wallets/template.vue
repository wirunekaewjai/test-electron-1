<template>
  <v-main>
    <ConsoleToolbar>
      <v-toolbar-title>
        Wallets
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
            Wallets
            <DialogCreateWallet />
          </v-card-text>

          <div
            :style="{
              maxHeight: 'calc(100vh - 214px)',
              overflowY: 'auto'
            }"
          >
            <div
              v-for="item in items"
              :key="item.id"
            >
              <v-divider />
              <div class="d-flex jusfify-space-between" >
                <v-card-text >
                  <router-link
                    :to="'/wallets/' + item.id"
                  >
                    {{ item.name }}
                  </router-link>
                  <v-btn
                    class="ml-2"
                    color="red"
                    icon
                    x-small
                    @click.prevent="remove(item.id)"
                  >
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </v-card-text>
                <v-card-text class="text-right" >
                  0
                </v-card-text>
              </div>
            </div>

            <div v-if="!loading && items.length === 0" >
              <v-card-text>
                No data available
              </v-card-text>
            </div>

            <v-skeleton-loader
              v-if="loading"
              type="article"
            />
          </div>

          <!-- <v-simple-table
            fixed-header
            height="calc(100vh - 160px)"
          >
          
            <thead>
              <tr>
                <th class="text-left">
                  Wallets
                </th>
                <th class="text-right" >
                  <DialogCreateWallet />
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="item in items"
                :key="item.name"
              >
                <td colSpan="2">
                  <router-link
                    :to="'/wallets/' + item.id"
                  >
                    {{ item.name }}
                  </router-link>
                </td>
              </tr>
              <tr v-if="loading" >
                <td colSpan="2" style="pointer-events: none;" >
                  <v-skeleton-loader
                    type="article"
                  />
                </td>
              </tr>
              <tr v-if="!loading && items.length === 0 && !more" >
                <td colSpan="2" style="pointer-events: none;" >
                  No data available
                </td>
              </tr>
            </tbody>
          </v-simple-table> -->
          <!-- <v-data-table
            :headers="headers"
            :items="items"
            :items-per-page="items.length"
            :loading="loading"
            hide-default-footer
            hide-default-header
            disabled-pagination
            single-select
          ></v-data-table> -->
        </v-card>
      </div>
    </v-sheet>
  </v-main>
</template>

<script lang="ts" src="./script.ts" />