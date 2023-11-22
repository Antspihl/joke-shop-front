<script setup lang="ts">
import {minLength, required} from "@vuelidate/validators";
import {Login} from "@/molecules/types";
import {ref} from "vue";
import {useVuelidate} from "@vuelidate/core";

const loginRules = {
  username: {
    required: required,
    minLength: minLength(3)
  },
  password: {
    required: required,
    minLength: minLength(8)
  }
}
console.log('dialog')

const login = ref<Login>({
  username: "",
  password: "",
});

const validation = useVuelidate(loginRules, login);

</script>

<template>
  <v-dialog width="auto">
    <v-card color="accent" class="dialog-card">
      <v-card-title>
        <span>Logi sisse</span>
      </v-card-title>
      <v-card-text>
        <v-responsive>
          <v-form>
            <v-text-field
                v-model="login.username"
                label="Kasutajanimi"
                required
            ></v-text-field>
            <v-text-field
                v-model="login.password"
                label="Parool"
                required
            ></v-text-field>
          </v-form>
        </v-responsive>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click="">Logi sisse</v-btn>
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
