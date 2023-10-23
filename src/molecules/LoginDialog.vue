<script setup lang="ts">
import {defineProps, toRefs} from 'vue';

interface Login {
  username: string;
  password: string;
  showDialog: boolean;
}

const props = defineProps<{
  login: Login;
}>();

const {login} = toRefs(props);

</script>

<template>
  <v-dialog v-model="login.showDialog" width="auto">
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
        <v-btn color="primary" @click="$emit('logUserIn', login.username, login.password)">Logi sisse</v-btn>
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
