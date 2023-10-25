<!--<script>-->
<!--export default {-->
<!--  data: () => ({-->
<!--    headers: [-->
<!--      [-->
<!--        {-->
<!--          title: 'Kasutajad',-->
<!--          align: 'start',-->
<!--          sortable: false,-->
<!--          key: 'name',-->
<!--          rowspan: 2,-->
<!--        }-->
<!--      ],-->
<!--      [-->
<!--        {title: 'ID', align: 'end', key: 'userId'},-->
<!--        {title: 'Username', align: 'end', key: 'username'},-->
<!--        {title: 'Full name', align: 'end', key: 'fullName'},-->
<!--        {title: 'Email', align: 'end', key: 'email'},-->
<!--        {title: 'Admin', align: 'end', key: 'isAdmin'},-->
<!--      ]-->
<!--    ]-->
<!--  })-->
<!--};-->
<!--</script>-->

<template>
  <v-data-table
    :headers="headers"
    :items="users"
    item-value="name"
    class="elevation-1"
  >
    <template v-slot:column.name="{ column }">
      {{ column.title.toUpperCase() }}
    </template>
  </v-data-table>
</template>
<script setup lang="ts">
import {computed, onMounted, Ref, ref} from "vue";
import axios from "axios";

const users_url: string = "http://localhost:8080/api/users/all";
// const users_url: string = "http://193.40.156.35:8080/api/users/all"; seda saab hetkel kasutada, ei pea backi toole paneme enda masinas
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
