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
        v-model="isntOppen"
        @click="toggleTheme"
    >
      <template v-slot:prepend>
        <v-icon>mdi-theme-light-dark</v-icon>
      </template>
    </v-switch>

    <v-menu :close-on-content-click="false">
      <template v-slot:activator="{ props }">
        <v-btn icon="mdi-account-circle" v-bind="props">
          :
        </v-btn>
      </template>
      <v-col class="v-dropdown">
        <v-btn
            class="auth_btn"
            @click="openRegisterDialog"
        >
          <h4>Registreeri</h4>
        </v-btn>
        <v-btn
            @click.stop="openLoginDialog"
        >
          <h4>Logi sisse</h4>
        </v-btn>
      </v-col>
    </v-menu>
  </v-toolbar>

  <RegisterDialog
      v-model="showRegisterDialog"
      v-if="showRegisterDialog"
      @closeDialog="closeRegisterDialog"
  />
  <LoginDialog
      v-model="showLoginDialog"
      v-if="showLoginDialog"
      @closeDialog="closeLoginDialog"
  />
</template>

<script lang="ts" setup>
import {ref} from "vue";
import {useTheme} from "vuetify";
import LoginDialog from "@/molecules/LoginDialog.vue";
import RegisterDialog from "@/molecules/RegisterDialog.vue";

const showLoginDialog = ref(false);
const showRegisterDialog = ref(false);

function openLoginDialog() {
  showLoginDialog.value = true;
}
function closeLoginDialog() {
  showLoginDialog.value = false;
}

const openRegisterDialog = () => {
  showRegisterDialog.value = true;
}
const closeRegisterDialog = () => {
  showRegisterDialog.value = false;
}

const pages = ref([
  {name: "Avaleht", path: "/"},
  {name: "Galerii", path: "/jokes"},
  {name: "Saak", path: "/"},
  {name: "Kasutajad", path: "/users"}
]);

const isntOppen = ref(false);
const theme = useTheme()
const toggleTheme = () => {
  if (isntOppen.value) {
    theme.global.name.value = 'oppenheimer'
    isntOppen.value = false
  } else {
    theme.global.name.value = 'barbie'
    isntOppen.value = true
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

.auth_btn {
  margin-top: 10px;
  margin-bottom: 10px;
  margin-right: 10px;
}

.v-dropdown {
  justify-content: end;
  padding: 0;
  width: 130px;
}
</style>
