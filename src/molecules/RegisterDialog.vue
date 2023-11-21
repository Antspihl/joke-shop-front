<script setup lang="ts">
import {defineProps, toRefs} from 'vue';
import {Register} from "@/molecules/types";
import {useVuelidate} from "@vuelidate/core";
import RegisterDialog from "@/molecules/RegisterDialog.vue";




const props = defineProps<{
  register: Register;
}>();

const {register} = toRefs(props);

const registerValidation = useVuelidate(registerRules, register)
const registerUser = (username: string, password: string, email: string) => {
  registerValidation.value.$touch();
  console.log("Registering user" + username + password + email);

}

</script>

<template>
  <v-dialog v-model="register.showDialog" width="auto">
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
