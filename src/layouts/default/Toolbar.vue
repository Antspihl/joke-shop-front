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

    <v-switch
      class="theme_switch"
      v-model="isOppen"
      @click="toggleTheme"
    >
      <template v-slot:prepend>
        <v-icon>mdi-theme-light-dark</v-icon>
      </template>
    </v-switch>

    <v-card
      class="user_card"
      color="secondary"
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
import {useTheme} from "vuetify";

const isOppen = ref(false);
const theme = useTheme()

const userIsLoggedIn = ref(false);
const username = ref("Ilmar");
const pages = ref([
  {name: "Avaleht", path: "/"},
  {name: "Galerii", path: "/"},
  {name: "Saak", path: "/"},
  {name: "Meist", path: "/"}
]);

const logout = () => {
  userIsLoggedIn.value = false;
}
const login = () => {
  userIsLoggedIn.value = true;
}

const toggleTheme = () => {
  if (isOppen.value) {
    theme.global.name.value = 'barbie'
    isOppen.value = false
  } else {
    theme.global.name.value = 'oppenheimer'
    isOppen.value = true
  }
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

.theme_switch {
  max-width: 80px;
  margin-top: 40px;
  margin-bottom: 20px;
  margin-right: 10px;
}

.login {
  padding-left: 20px;
  padding-right: 20px;
}
</style>
