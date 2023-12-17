<template>
  <v-dialog>
    <v-container class="form-container">
    <v-card color="accent" class="dialog-card">
      <v-card-title class="mb-2">
        <span>Logi sisse</span>
      </v-card-title>
      <v-card-text>
          <form class="login-form" @submit.prevent="loginUser">
            <CustomInput
                label="Kasutajanimi"
                v-model:value="login.username"
                id="username"
                @blur="validation.login.username.$touch()"
                :error="validation.login.username.$error"
                errorMessage="Kasutajanimi puudub"
                autocomplete="username"
            />

            <CustomInput
                label="Parool"
                v-model:value="login.password"
                type="password"
                id="password"
                @blur="validation.login.password.$touch()"
                :error="validation.login.password.$error"
                errorMessage="Ebasobiv parool"
                autocomplete="current-password"
            />
            <v-btn class="mr-14" color="primary" type="submit">Logi sisse</v-btn>
            <v-btn color="error" @click="$emit('closeDialog')">Välju</v-btn>
          </form>
      </v-card-text>
    </v-card>
    </v-container>
  </v-dialog>
</template>

<script setup lang="ts">
import {minLength, required} from "@vuelidate/validators";
import Form from "vform";
import {Login} from "@/molecules/types";
import {reactive, ref} from "vue";
import {useVuelidate} from "@vuelidate/core";
import {useMainStore} from "@/api/MainStore";
import CustomInput from "@/molecules/CustomInput.vue";

const mainStore = useMainStore()
const emit = defineEmits(['closeDialog', 'closeDialogLoggedIn'])

const validations = reactive({
  login: {
    username: {required},
    password: {
      required: required,
      minLength: minLength(8)
    }
  }
})

const login = ref(<Login>{});

const validation = useVuelidate(validations, {login})!;

async function loginUser() {
  if(!validation.value.$invalid) {
    try {
      await mainStore.login(login.value)
      emit('closeDialogLoggedIn')
      window.location.reload();
    } catch (error) {
      console.error("Login failed", error);
    }
  }
}
</script>
<style scoped>
.dialog-card {
  border-radius: 10px;
  min-width: 22rem;
}
.form-container {
  display: flex;
  justify-content: center;
}
.login-form {
  max-width: 255px;
  font-size: 20px;
}
</style>
