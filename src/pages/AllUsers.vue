<template>
  <v-container class="all-jokes">
    <div class="header-title">
      <h1>Kasutajad</h1>
    </div>
    <UsersTable :users="users"/>
  </v-container>
</template>
<script setup lang="ts">
import {onMounted, Ref, ref} from "vue";
import {User} from "@/molecules/types";
import UsersTable from "@/molecules/UsersTable.vue";
import {fetchUsers} from "@/api/requestHandler";
import {useMainStore} from "@/api/MainStore";

const users: Ref<User[]> = ref<User[]>([]);

const getUsers = async () => {
  // users.value = await fetchUsers()
  users.value = await useMainStore().fetchUsers()
  console.log("Got users", users.value)
  users.value.sort((a: User, b: User) => a.userId - b.userId);
}

onMounted(() => {
  getUsers();
});
</script>

<style scoped>
.header-title {
  padding-bottom: 10px;
}
</style>
