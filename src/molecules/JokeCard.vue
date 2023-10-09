<template>
  <v-col cols="12" sm="6" md="4">
    <v-card color="secondary">
      <v-card-title class="card-title">{{ joke.setup }}</v-card-title>
      <v-card-subtitle class="card-subtitle">Hind: {{ joke.price }}€</v-card-subtitle>
      <v-card-actions>
        <v-btn color="primary" class="action-btn" @click="$emit('openDialog', joke.id)">
          <span v-if="joke.showPunchline">Vaata</span>
          <span v-else>Osta</span>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-col>
</template>

<script setup lang="ts">
import {defineProps, toRefs} from 'vue';
interface Joke {
  id: number;
  setup: string;
  punchline: string;
  price: number;
  timesBought: number;
  showPunchline?: boolean;
}

const props = defineProps<{
  joke: Joke;
}>();

const { joke } = toRefs(props);
</script>
<style scoped>

.card_title {
  color: white;
  padding-top: 15px;
  padding-left: 22px;
}

.card_subtitle {
  padding-left: 22px;
  padding-bottom: 5px;
  color: white;
}

.v_btn {
  margin-left: 4px;
  margin-bottom: 5px;
  color: white;
}

.joke_card {
  min-width: 400px;
}
</style>
