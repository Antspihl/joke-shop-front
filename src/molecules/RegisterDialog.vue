
<template>
  <v-dialog width="auto">
    <v-container class="form-container">
    <v-card color="accent" class="dialog-card">
      <v-card-title>
        <span>Registreeri kasutaja</span>
      </v-card-title>
      <v-card-text>
        <form class="register-form" @submit.prevent="registerUser">
          <CustomInput
            label="Täisnimi"
            v-model:value="register.fullName"
            id="fullName"
            autocomplete="full-name"
          />
          <CustomInput
            label="Kasutajanimi"
            v-model:value="register.username"
            id="username"
            @blur="validation.register.username.$touch()"
            :error="validation.register.username.$error"
            error-message="Kasutajanimi puudub"
            autocomplete="username"
          />
          <CustomInput
           label="E-mail"
           v-model:value="register.email"
           id="email"
           @blur="validation.register.email.$touch()"
           :error="validation.register.email.$error"
           error-message="Ebasobiv E-mail"
           autocomplete="email"
          />
          <CustomInput
              label="Parool"
              v-model:value="register.password"
              type="password"
              id="password"
              @blur="validation.register.password.$touch()"
              :error="validation.register.password.$error"
              error-message="Ebasobiv parool"
              autocomplete="new-password"
          />
          <CustomInput
              label="Korda parooli"
              v-model:value="secondPassword"
              type="password"
              id="secondPassword"
              @blur="validateSecondPassword"
              :error="validateSecondPassword()"
              error-message="Paroolid ei klapi"
              autocomplete="new-password"
          />
          <v-btn class="mr-10" color="primary" type="submit">
            Registreeri
          </v-btn>
          <v-btn color="error" @click="$emit('closeDialog')">Välju</v-btn>
        </form>
      </v-card-text>
    </v-card>
    </v-container>
  </v-dialog>
</template>

<script setup lang="ts">
import {reactive, ref} from "vue";
import useVuelidate from "@vuelidate/core";
import {email, minLength, required} from "@vuelidate/validators";
import {Register} from "@/molecules/types";
import {useMainStore} from "@/api/MainStore";
import Form from "vform";
import CustomInput from "@/molecules/CustomInput.vue";

const mainStore = useMainStore()
const emit = defineEmits(['closeDialog', 'closeDialogAndLogIn'])

const validations = reactive({
    register: {
        username: {
            required: required,
            minLength: minLength(3)
        },
        password: {
            required: required,
            minLength: minLength(8)
        },
        email: {
            required: required,
            email: email
        }
    }
})
const register = ref<Register>(<Register>{});
const secondPassword = ref('')
const validation = useVuelidate(validations, {register})!;

async function registerUser() {
  if(!validation.value.$invalid) {
    await mainStore.registerUser(register.value)
    emit('closeDialogAndLogIn')
  }
}
function validateSecondPassword() {
  return (secondPassword.value.length > 0)
      ? register.value.password !== secondPassword.value
      : false
}

</script>
<style scoped>
.dialog-card {
  border-radius: 10px;
  min-width: 22rem;
}
.register-form {
  max-width: 255px;
  font-size: 20px;
}
.form-container {
  display: flex;
  justify-content: center;
}
</style>
