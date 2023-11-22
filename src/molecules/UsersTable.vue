<template>
  <v-responsive
      max-width="900"
  >
  <v-text-field
    v-model="search"
    label="Otsi"
    :clearable="true"
   />
  </v-responsive>
  <VDataTable
    :headers="headers"
    :items="users"
    :search="search"
    class="custom-users-table"
  >
    <template v-slot:item.delete="{item}">
      <VIcon @click="deleteItem(item)">mdi-delete</VIcon>
    </template>
  </VDataTable>
</template>

<script setup lang="ts">

import {User} from "@/molecules/types";
import {VDataTable} from "vuetify/labs/VDataTable";
import {ref} from "vue";

const search = ref('')

const props = defineProps<{
  users: User[];
}>();

const headers = ref([
  {
    key: 'userId',
    title: 'ID',
    value: 'userId',
    sortable: true,
  },
  { key: 'username', title: 'Kasutajanimi', value: 'username', sortable: true, },
  { key: 'email', title: 'E-post', value: 'email', sortable: true, },
  { key: 'delete', title: '', sortable: false,}
]);

function deleteItem(item: any) {
  console.log(item)
  ///TODO: adminid võiksid saada usereid kustutada

}
</script>

<style>
.custom-users-table {
  max-width: 900px !important;
  padding: 8px !important;
}
.v-data-table-footer {
  border-top: thin solid #D7D3Ae !important;
  padding: 4px !important;
}
.v-data-table__td {
  border-bottom: thin solid #D7D3Ae !important;
}
.v-data-table__th {
  color: white !important;
}
</style>