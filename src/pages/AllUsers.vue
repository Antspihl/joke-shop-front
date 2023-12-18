<template>
  <v-container v-if="!loadingUsers" class="all-jokes">
    <div class="header-title">
      <h1>Kasutajad</h1>
    </div>
    <UsersTable/>
  </v-container>
</template>
<script setup lang="ts">
import {onMounted, ref} from "vue";
import UsersTable from "@/molecules/UsersTable.vue";
import {useMainStore} from "@/api/MainStore";

const mainStore = useMainStore()
const loadingUsers = ref(false)

onMounted(() => {
  loadingUsers.value = true;
  const pageRequest = {
    limit: 10,
    page: 0,
    sort: 'userId',
    dir: 'ASC'
  }
  mainStore.fetchUsersPage(pageRequest).then(() => loadingUsers.value = false)
});
</script>

<style scoped>
.header-title {
  padding-bottom: 10px;
}
</style>
