<template>
  <v-col cols="12" sm="6" md="4">
    <v-card color="secondary" class="joke_card">
      <v-card-title class="card_title">{{ joke.setup }}</v-card-title>
      <v-card-subtitle class="card_subtitle">Hind: {{ joke.price }}€</v-card-subtitle>
      <v-card-actions>
        <v-btn class="buy-button" color="primary" @click="$emit('openDialog', joke.id)">
          <span v-if="joke.showPunchline">Vaata</span>
          <span v-else>Osta</span>
        </v-btn>
        <v-rating
          v-model="joke.rating"
          color="primary"
          density="compact"
          :readonly="!joke.showPunchline"/>
      </v-card-actions>
    </v-card>
  </v-col>
</template>

<script setup lang="ts">
import {toRefs} from 'vue';
import {Joke} from "@/molecules/types";

const props = defineProps<{
  joke: Joke;
}>();

const { joke } = toRefs(props);
</script>
<style scoped>
.buy-button {
  padding-left: 10px;
  margin-right: 55px;
}
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

.joke_card {
  max-width: 600px;
}
</style>
