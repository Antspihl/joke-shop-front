
<template>
  <v-dialog width="auto">
    <v-card color="accent" class="dialog-card">
      <v-card-title>
        <span>Registreeri kasutaja</span>
      </v-card-title>
      <v-card-text>
        <v-responsive>
          <v-form>
            <v-text-field
              v-model.trim="register.fullName"
              label="Täisnimi"
              required
            />
            <v-text-field
              v-model.trim="register.username"
              label="Kasutajanimi"
              required
              @blur="validation.register.username.$touch()"
            />
            <v-text-field
              v-model.trim="register.email"
              label="E-mail"
              required
              @blur="validation.register.email.$touch()"
            />
            <v-text-field
              v-model.trim="register.password"
              label="Parool"
              required
              persistent-counter
              @blur="validation.register.password.$touch()"
            />
          </v-form>
        </v-responsive>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click="registerUser">
          Registreeri
        </v-btn>
        <v-btn color="error" @click="$emit('closeDialog')">Välju</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import {reactive, ref} from "vue";
import useVuelidate from "@vuelidate/core";
import {email, minLength, required} from "@vuelidate/validators";
import {Register} from "@/molecules/types";
import {useMainStore} from "@/api/MainStore";

const mainStore = useMainStore()

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
const validation = useVuelidate(validations, {register})!;

async function registerUser() {
  await mainStore.registerUser(register.value)
}

</script>
<style scoped>
.dialog-card {
  border-radius: 10px;
  min-width: 25rem;
}
</style>
