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
            <v-btn v-if="showToolBarButton(page)" class="v_link" :to="page.path">
                {{ page.name }}
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
        <span v-if="userLoggedIn">{{mainStore.user.username}}</span>
        <v-icon class="mr-6 ml-3" v-bind="props">mdi-account-circle</v-icon>
      </template>
      <v-col class="v-dropdown">
        <v-btn
          v-if="!userLoggedIn"
            class="auth_btn"
            @click="openRegisterDialog"
        >
          <h4>Registreeri</h4>
        </v-btn>
        <v-btn
          v-if="!userLoggedIn"
            @click="openLoginDialog"
        >
          <h4>Logi sisse</h4>
        </v-btn>
        <v-btn
          v-if="userLoggedIn"
          @click="logOut"
        >
          <h4>Logi välja</h4>
        </v-btn>
      </v-col>
    </v-menu>
  </v-toolbar>

  <RegisterDialog
      v-model="showRegisterDialog"
      v-if="showRegisterDialog"
      @closeDialog="closeRegisterDialog"
      @close-dialog-and-log-in="closeRegisterDialogAndOpenLogin"
  />
  <LoginDialog
      v-model="showLoginDialog"
      v-if="showLoginDialog"
      @closeDialog="closeLoginDialog"
      @closeDialogLoggedIn="closeModalLoggedIn"
  />
</template>

<script lang="ts" setup>
import {onBeforeMount, ref} from "vue";
import {useTheme} from "vuetify";
import LoginDialog from "@/molecules/LoginDialog.vue";
import RegisterDialog from "@/molecules/RegisterDialog.vue";
import {useMainStore} from "@/api/MainStore";
import {Page} from "@/molecules/types";
import {useRouter} from "vue-router";

const mainStore = useMainStore()
const router = useRouter()

const showLoginDialog = ref(false);
const showRegisterDialog = ref(false);
const userLoggedIn = ref(localStorage.getItem('user') ?? false)


function showToolBarButton(page: Page) {
  if (page.name == "Minu naljad" && !userLoggedIn.value) {
    return false
  }
  return !(page.name == "Kasutajad" && !mainStore.user.isAdmin);


}
function openLoginDialog() {
  showLoginDialog.value = true;
}
function closeLoginDialog() {
  showLoginDialog.value = false;
}

function openRegisterDialog() {
  showRegisterDialog.value = true;
}
function closeRegisterDialog() {
  showRegisterDialog.value = false;
}
function closeModalLoggedIn() {
  showLoginDialog.value = false;
}

function logOut() {
  localStorage.removeItem('user')
  router.push('/home').then(() => {
    window.location.reload()
  })
}
function closeRegisterDialogAndOpenLogin() {
  showRegisterDialog.value = false;
  showLoginDialog.value = true;
}
const pages = ref([
  {name: "Avaleht", path: "/home"},
  {name: "Galerii", path: "/jokes"},
  {name: "Minu naljad", path: "/userJokes"},
  {name: "Kasutajad", path: "/users"}
]);

const isntOppen = ref(false);
const theme = useTheme()

function toggleTheme() {
  if (isntOppen.value) {
    theme.global.name.value = 'oppenheimer'
    isntOppen.value = false
  } else {
    theme.global.name.value = 'barbie'
    isntOppen.value = true
  }
}

onBeforeMount(() => {
  mainStore.fetchUser()
})
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
