<template>
  <v-dialog width="auto">
    <v-card color="accent" class="dialog-card">
      <v-card-title>
        <span>Logi sisse</span>
      </v-card-title>
      <v-card-text>
          <div>
              <v-text-field
                      class="mb-4"
                      v-model="login.username"
                      label="Kasutajanimi"
                      hide-details="auto"
                      required
                      @blur="validation.login.username.$touch()"
                      @input="validation.login.username.$touch()"
            />
            <v-text-field
              v-model="login.password"
              label="Parool"
              hide-details="auto"
              required
              @blur="validation.login.password.$touch()"
              @input="validation.login.password.$touch()"
            />
          </div>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click="loginUser">Logi sisse</v-btn>
        <v-btn color="error" @click="$emit('closeDialog')">Välju</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import {minLength, required} from "@vuelidate/validators";
import {Login} from "@/molecules/types";
import {reactive, ref} from "vue";
import useVuelidate from "@vuelidate/core";
import {useMainStore} from "@/api/MainStore";

const mainStore = useMainStore()

const validations = reactive({
  login: {
    username: {required},
    password: {
      required: required,
      minLength: minLength(8)
    }
  }
})

const login = ref<Login>(<Login>{});

const validation = useVuelidate(validations, {login})!;

async function loginUser(user: Login) {
  await mainStore.login(user)
}
</script>
<style scoped>
.dialog-card {
  border-radius: 10px;
  min-width: 25rem;
}
</style>
