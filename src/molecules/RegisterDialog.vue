<script setup lang="ts">
import {ref} from "vue";
import {useVuelidate} from "@vuelidate/core";
import {email, minLength, required} from "@vuelidate/validators";
import {Register} from "@/molecules/types";

const registerRules = {
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
const register = ref<Register>({
  username: "",
  password: "",
  email: "",
  fullName: "",
});
const validation = useVuelidate(registerRules, register);

</script>

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
              v-model="register.fullName"
              label="Täisnimi"
              required
            ></v-text-field>
            <v-text-field
                v-model="register.username"
                label="Kasutajanimi"
                required
            ></v-text-field>
            <v-text-field
                v-model="register.email"
                label="E-mail"
                required
            ></v-text-field>
            <v-text-field
                v-model="register.password"
                label="Parool"
                required
                persistent-counter
            ></v-text-field>
          </v-form>
        </v-responsive>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click="$emit('registerUser', register.username, register.password, register.email)">
          Registreeri
        </v-btn>
        <v-btn color="error" @click="$emit('closeDialog')">Välju</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.dialog-card {
  border-radius: 10px;
  min-width: 25rem;
}
</style>
