<template>
  <v-container class="all-jokes">
    <div class="header-title">
      <h1>Kasutajad</h1>
    </div>
    <v-row>
      <v-table>
        <thead>
        <tr>
          <th>ID</th>
          <th>Kasutajanimi</th>
          <th>Täisnimi</th>
          <th>Email</th>
          <th>Admin</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="user in users" :key="user.userId">
          <td>{{ user.userId }}</td>
          <td>{{ user.username }}</td>
          <td>{{ user.fullName }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.isAdmin }}</td>
          <td>{{ // user.isAdmin ? 'Jah' : 'Ei' }}</td>
        </tr>
        </tbody>
      </v-table>
    </v-row>
  </v-container>
</template>
<script setup lang="ts">
import {computed, onMounted, Ref, ref} from "vue";
import axios from "axios";
import JokeCard from "@/molecules/JokeCard.vue";
import JokeDialog from "@/molecules/JokeDialog.vue";

const users_url: string = "http://localhost:8080/api/users/getAll";
const users: Ref<User[]> = ref<User[]>([]);

interface User {
  userId: number;
  username: string;
  fullName: string;
  email: string;
  isAdmin: boolean;
}

const getUsers = async () => {
  try {
    console.log("Getting jokes")
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
