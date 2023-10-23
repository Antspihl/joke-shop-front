<template>
  <v-dialog v-model="joke.showDialog" width="auto">
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
        <v-btn color="primary" @click="$emit('buyJoke', joke.id)" v-if="!joke.showPunchline">Osta</v-btn>
        <v-btn color="error" @click="$emit('closeDialog')">Välju</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import {defineProps, toRefs} from 'vue';
interface Joke {
  id: number;
  setup: string;
  punchline: string;
  price: number;
  timesBought: number;
  showDialog: boolean;
  showPunchline?: boolean;
}

const props = defineProps<{
  joke: Joke;
}>();

const { joke } = toRefs(props);
</script>
