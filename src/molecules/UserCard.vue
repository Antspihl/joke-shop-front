<template>
  <v-col cols="12" sm="6" md="6">
    <v-card color="secondary">
      <v-card-title class="card-title"> {{ user.fullName }} </v-card-title>
      <v-card-text>
        <div class="user-card-column">
          <div class="user-card-header">User ID</div>
          <div class="user-card-values">{{ user.userId }}
          </div>
        </div>
        <div class="user-card-column">
          <div class="user-card-header">Username</div>
          <div class="user-card-values">{{ user.username }}</div>
        </div>
        <div class="user-card-column">
          <div class="user-card-header">Email</div>
          <div class="user-card-values">{{ user.email }}</div>
        </div>
        <div class="user-card-column">
          <div class="user-card-header">Admin</div>
          <div class="user-card-values">{{ user.isAdmin === "true" ? "yes" : "no"}}</div>
        </div>
      </v-card-text>
    </v-card>
  </v-col>
</template>

<script setup lang="ts">
import {defineProps, toRefs} from 'vue';
interface User {
  userId: number;
  username: string;
  fullName: string;
  email: string;
  isAdmin: string;
}

const props = defineProps<{
  user: User;
}>();

const { user } = toRefs(props);
</script>
<style scoped>

.card_title {
  color: white;
  padding-top: 15px;
  padding-left: 22px;
}

.user-card-header {
  color: white;
  font-size: 0.675rem;
  //background-color: grey;
}

.user-card-values {
  //background-color: #677474;
}

.v_btn {
  margin-left: 4px;
  margin-bottom: 5px;
  color: white;
}

.user-card-column {
  width: 25%;
  float: left;
  margin-bottom: 0.5rem;
  //background-color: grey;
}
</style>
