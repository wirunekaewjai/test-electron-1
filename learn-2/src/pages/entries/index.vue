<template>
  <wk-container>
    <h1>
      # Entries
    </h1>
    <wk-card>
      <wk-scroll-view v-bind="{ height: '300px' }" >
        <table>
          <thead>
            <tr>
              <th class="align-left" >Name</th>
              <th width="160" class="align-right" >CreatedAt</th>
              <th width="160" class="align-right" >UpdatedAt</th>
              <th width="10"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="items.length === 0 && !loading && !more" >
              <td class="align-center" colspan="4" >
                ไม่มีข้อมูล
              </td>
            </tr>
            <tr v-for="item in items" :key="item.id" >
              <td>
                <wk-link
                  v-bind="{
                    page: 'entry',
                    props: {
                      entryID: item.id
                    },
                  }"
                >
                  {{ item.name }}
                </wk-link>
              </td>
              <td class="align-right" >
                {{ new Date(item.createdAt).toLocaleDateString() }}
                <br />
                <small>
                  {{ new Date(item.createdAt).toLocaleTimeString() }}
                </small>
              </td>
              <td class="align-right" >
                {{ new Date(item.updatedAt).toLocaleDateString() }}
                <br />
                <small>
                  {{ new Date(item.updatedAt).toLocaleTimeString() }}
                </small>
              </td>
              <td>
                <button
                  v-if="groups.includes('Admin')"
                  v-on:click.prevent="remove(item.id)"
                >
                  ลบ
                </button>
              </td>
            </tr>
            <tr v-if="loading" >
              <td class="align-center" colspan="4" >
                กำลังโหลด . . .
              </td>
            </tr>
          </tbody>
        </table>
      </wk-scroll-view>
    </wk-card>

    <div v-if="more && !loading" >
      <button v-on:click.prevent="loadMore" >
        Load More
      </button>
    </div>

    <div v-if="!loading && groups.includes('Admin')" >
      <br />
      <form
        v-on:submit.prevent="add"
      >
        <input
          type="text"
          v-model="name"
        />
        <button
          type="submit"
        >
          เพิ่ม
        </button>
      </form>
    </div>

    <hr />
    <button v-on:click.prevent="signOut" >
      Sign Out
    </button>
  </wk-container>
</template>

<script lang="ts" src="./index.ts" ></script>
<style scoped>
table {
  border-collapse: collapse;
  border-color: transparent;

  width: 100%;
}

thead > tr > th {
  background-color: #ccc;
  position: sticky;
  top: 0;
}

tbody > tr:not(:last-child),
tbody > tr:first-child {
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: #d9d9d9;
}

tbody > tr:hover {
  background-color: rgba(0,0,0, 0.08);
}

th, td {
  padding: 12px 16px;
}

th.align-center, td.align-center {
  text-align: center;
}

th.align-left, td.align-left {
  text-align: left;
}

th.align-right, td.align-right {
  text-align: right;
}

</style>