<template>
  <v-container>
    <div  class="header-title">
      <h1>Naudi oma nalju</h1>
    </div>
    <v-row>
      <JokeCard
        v-for="joke in mainStore.userJokes"
        :key="joke.id"
        :joke="joke"/>
    </v-row>
  </v-container>
</template>
<script setup lang="ts">

import JokeCard from "@/molecules/JokeCard.vue";
import {useMainStore} from "@/api/MainStore";
import {onBeforeMount, ref} from "vue";

const mainStore = useMainStore()
const loadingJokes = ref(false)

onBeforeMount(() => {
  loadingJokes.value = true
  mainStore.fetchUserJokes().then(() => loadingJokes.value = false)
})
</script>

<style scoped>

</style>
