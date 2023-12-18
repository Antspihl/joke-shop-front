<template>
  <v-dialog v-model="joke.showDialog" width="auto">
    <v-container class="joke-dialog-container">
    <v-card color="accent" class="dialog-card">
      <v-card-text>{{ joke.setup }}</v-card-text>
      <v-card-text v-if="joke.showPunchline">{{ joke.punchline }}</v-card-text>
      <v-card-text v-else>
        Soovid osta selle nalja lööklauset?
        <br>
        <br>
        Hind: {{ joke.price }}€
      </v-card-text>
      <v-card-actions>
        <v-tooltip
          :open-on-hover="true"
          location="bottom"
          text="Nalja ostmiseks, pead olema sisse logitud."
          :disabled="userLoggedIn !== false"
        >
          <template v-slot:activator="{ props: tooltip }">
            <v-btn
              color="primary"
              @click="$emit('buyJoke', joke.id)"
              v-if="!joke.showPunchline"
              v-bind="mergeProps(tooltip)"
            >
              Osta
            </v-btn>
          </template>
        </v-tooltip>
        <v-btn color="error" @click="$emit('closeDialog')">Välju</v-btn>
      </v-card-actions>
    </v-card>
    </v-container>
  </v-dialog>
</template>

<script setup lang="ts">
import {ref, toRefs} from 'vue';
import {Joke} from "@/molecules/types";
import {mergeProps} from "vue";

const userLoggedIn = ref(localStorage.getItem('user') ?? false)

const props = defineProps<{
  joke: Joke;
}>();

const {joke} = toRefs(props);
</script>
<style scoped>
.joke-dialog-container {
  min-width: 400px;
}
</style>
