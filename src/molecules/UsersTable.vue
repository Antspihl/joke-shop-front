<template>
  <v-responsive
      max-width="900"
  >
  <v-text-field
    v-model="search"
    label="Otsi E-posti järgi"
    :clearable="true"
   />
  </v-responsive>
  <VDataTableServer
    :headers="headers"
    :items="mainStore.users"
    :items-per-page="currentPagination.limit"
    :items-length="mainStore.totalUsersCount"
    @update:page="value => { currentPagination.page = value - 1; fetchUser(); }"
    @update:items-per-page="value => { currentPagination.limit = value; fetchUser(); }"
    @update:sort-by="updateSort"
    class="custom-users-table"
  >
    <template v-slot:item.delete="{item}">
      <VIcon @click="openDeleteConfirmation(item)">mdi-delete</VIcon>
    </template>
  </VDataTableServer>
  <UserDeletingConfirmation
      v-model="deleteConfirmation"
      v-if="deleteConfirmation"
      :page-request="currentPagination"
      :user-to-delete="userToDelete"
      @close-dialog="hideDeleteConfirmation"
      @user-deleted="hideDeleteConfirmation"
  />
</template>

<script setup lang="ts">

import {User} from "@/molecules/types";
import {ref, watch} from "vue";
import {useMainStore} from "@/api/MainStore";
import UserDeletingConfirmation from "@/molecules/UserDeletingConfirmation.vue";

const search = ref('')

const mainStore = useMainStore()

const currentPagination = ref({
  email: '',
  page: 0,
  limit: 10,
  sort: 'userId',
  dir: 'ASC'
});
const userToDelete = ref<User>(<User>{})
const deleteConfirmation = ref(false)

watch(search, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    currentPagination.value.page = 0;
    currentPagination.value.email = newValue;
    fetchUser();
  }
});
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

function fetchUser() {
  mainStore.fetchUsersPage(currentPagination.value)
}
function updateSort(sortObject: any) {
  if (sortObject[0]) {
    currentPagination.value.sort = sortObject[0].key;
    currentPagination.value.dir = sortObject[0].order === 'desc' ? 'DESC' : 'ASC';
    fetchUser();
  }
}

function openDeleteConfirmation(user: User) {
  userToDelete.value = user
  deleteConfirmation.value = true
}
function hideDeleteConfirmation() {
  deleteConfirmation.value = false
  userToDelete.value = <User>{}
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
