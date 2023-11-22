<template>
  <v-container class="all-jokes">
    <div class="header-title">
      <h1>Kasutajad</h1>
    </div>
    <UsersTable v-if="!loadingUsers" :users="users"/>
  </v-container>
</template>
<script setup lang="ts">
import {computed, onMounted, ref} from "vue";
import UsersTable from "@/molecules/UsersTable.vue";
import {useMainStore} from "@/api/MainStore";

const mainStore = useMainStore()
const loadingUsers = ref(false)

const users = computed(() => mainStore.getUsers)

onMounted(() => {
  loadingUsers.value = true;
  mainStore.fetchUsers().then(() => loadingUsers.value = false)
});
</script>

<style scoped>
.header-title {
  padding-bottom: 10px;
}
</style>
