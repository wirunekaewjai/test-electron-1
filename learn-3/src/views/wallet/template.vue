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
        {{ name }}
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
            Transactions
            <DialogCreateTransaction
              :walletID="id"
            />
          </v-card-text>

          <div
            :style="{
              maxHeight: 'calc(100vh - 214px)',
              overflowY: 'auto'
            }"
          >
            <div
              v-for="item in transactions"
              :key="item.id"
            >
              <v-divider />
              <div class="d-flex justify-space-between" >
                <v-card-text>
                  {{ item.message }}
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
                <v-card-text
                  class="text-right"
                  :class="item.amount > 0 ? 'teal--text' : 'red--text'"
                >
                  {{ item.amount }}
                </v-card-text>
              </div>
            </div>

            <div v-if="!loading && transactions.length === 0 && !more" >
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
                  Transactions
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="item in transactions"
                :key="item.name"
              >
                <td>
                  eiei
                </td>
              </tr>
              <tr v-if="loading" >
                <td style="pointer-events: none;" >
                  <v-skeleton-loader
                    type="article"
                  />
                </td>
              </tr>
              <tr v-if="!loading && transactions.length === 0" >
                <td style="pointer-events: none;" >
                  No data available
                </td>
              </tr>
            </tbody>
          </v-simple-table> -->
        </v-card>
      </div>
    </v-sheet>
  </v-main>
</template>

<script lang="ts" src="./script.ts" />