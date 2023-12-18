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
          v-model="rating.currentRating.ratingValue"
          color="primary"
          density="compact"
          :readonly="!joke.showPunchline"
          @update:model-value="updateRatingValue"
        />
      </v-card-actions>
    </v-card>
  </v-col>
</template>

<script setup lang="ts">
import {reactive} from 'vue';
import {Joke, Rating} from "@/molecules/types";
import {useMainStore} from "@/api/MainStore";

const mainStore = useMainStore()

const props = defineProps<{
  joke: Joke;
}>();

const rating = reactive({
  currentRating: {
    jokeId: props.joke.id,
    ratingValue: props.joke.rating
  } as Rating
})
function updateRatingValue(value: number | string) {
  console.log(value)
  rating.currentRating.ratingValue = value

  mainStore.addRating(rating.currentRating)
}
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
