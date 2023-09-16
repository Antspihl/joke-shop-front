<template>
  <v-toolbar :elevation="8" color="primary">
    <v-toolbar-title>
      <v-row>
        <v-img
          class="v_image"
          src='/Asendus_logo.png'
        ></v-img>
        <ul>
          <template v-for="page in pages">
            <v-btn class="v_link">
              <router-link class="text-white text-decoration-none" :to=page.path v-slot="{href, route, navigate}">
                {{ page.name }}
              </router-link>
            </v-btn>
          </template>
        </ul>
      </v-row>
    </v-toolbar-title>

    <v-card
      class="user_card"
      v-if="userIsLoggedIn"
    >
      <v-card-subtitle>
        <v-btn>
          <v-icon>mdi-account</v-icon>
          {{ username }}
        </v-btn>
      </v-card-subtitle>
    </v-card>
    <v-btn v-if="userIsLoggedIn" @Click="logout">Logi välja</v-btn>

    <v-btn
      v-else
      class="login"
      @Click="login"
    >Logi sisse
    </v-btn>
  </v-toolbar>
</template>

<script lang="ts" setup>
import {ref} from "vue";

const userIsLoggedIn = ref(false);
const username = ref("Ilmar");
const pages = ref([
  {name: "Avaleht", path: "/"},
  {name: "Galerii", path: "/"},
  {name: "Saak", path: "/"},
  {name: "Meist", path: "/"}]);

const logout = () => {
  userIsLoggedIn.value = false;
}
const login = () => {
  userIsLoggedIn.value = true;
}
</script>

<style scoped>
.v_image {
  max-width: 120px;
  aspect-ratio: 1.5;
  margin-right: 12px;
}

.v_link {
  margin-top: 20px;
  color: white;
  text-decoration: none;
}

.user_card {
  margin-right: 20px;
  margin-top: 40px;
  margin-bottom: 40px;
}

.login {
  padding-left: 20px;
  padding-right: 20px;
}
</style>
