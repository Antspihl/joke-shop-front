<template>
  <v-toolbar :elevation="8" color="primary">
    <v-toolbar-title>
      <v-row>
        <v-img
          class="mr-3"
          max-width="120"
          :aspect-ratio="1.5"
          src='/Asendus_logo.png'
        ></v-img>
        <ul>
          <template v-for="page in pages">
            <v-btn class="mt-5" color="white" variant="text">
              <router-link class="text-white text-decoration-none" to={{page.path}} v-slot="{href, route, navigate}">
                {{ page.name }}
              </router-link>
            </v-btn>
          </template>
        </ul>
      </v-row>
    </v-toolbar-title>

    <v-card
      class="mr-4 my-10"
      v-if="userIsLoggedIn"
    >
      <v-card-subtitle>
        <v-btn>
          <v-icon>mdi-account</v-icon>
          {{ username }}
        </v-btn>
      </v-card-subtitle>
    </v-card>
    <v-btn v-if="userIsLoggedIn" @Click="logout" >Logi välja</v-btn>

    <v-btn
      v-else
      class="px-5"
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
