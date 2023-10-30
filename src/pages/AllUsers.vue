<template>
  <v-container class="all-jokes">
    <div class="header-title">
      <h1>Kasutajad</h1>
    </div>
    <v-row>
      <UserCard
        v-for="user in users"
        :key="user.userId"
        :user="user"
      />
    </v-row>
  </v-container>
</template>
<script setup lang="ts">
import {onMounted, Ref, ref} from "vue";
import axios from "axios";
import UserCard from "@/molecules/UserCard.vue";

// const users_url: string = "http://localhost:8080/api/users/all";
const users_url: string = "http://193.40.156.35:8080/api/users/all";
const users: Ref<User[]> = ref<User[]>([]);

interface User {
  userId: number;
  username: string;
  fullName: string;
  email: string;
  isAdmin: string;
}

const getUsers = async () => {
  try {
    console.log("Getting users")
    const response = await axios.get(users_url);
    users.value = response.data;
    users.value.sort((a: User, b: User) => a.userId - b.userId);
  } catch (error) {
    console.error(error);
  }
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
