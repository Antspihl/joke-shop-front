<template>
  <v-container class="all-jokes">
    <div class="header-title">
      <h1>Müügil olevad naljad</h1>
    </div>
    <v-row>
      <JokeCard
        v-for="joke in jokes"
        :key="joke.id"
        :joke="joke"
        @openDialog="openDialog"
      />
    </v-row>
    <JokeDialog
      v-if="showDialog"
      :joke="currentDialogJoke"
      @closeDialog="closeDialog"
      @buyJoke="buyJoke"
    />
  </v-container>
</template>
<script setup lang="ts">
import {computed, onBeforeMount, Ref, ref} from "vue";
import JokeCard from "@/molecules/JokeCard.vue";
import JokeDialog from "@/molecules/JokeDialog.vue";
import {Joke} from "@/molecules/types";
import {buyJokeWithId} from "@/api/requestHandler";
import {useMainStore} from "@/api/MainStore";

const mainStore = useMainStore()
const loadingJokes = ref(false)
const jokes = computed(() => mainStore.getJokes)

const currentDialogJoke = ref<Joke>(<Joke>{});

const showDialog = computed(() => {
  return currentDialogJoke.value.showDialog;
})

const openDialog = (id: number) => {
  setCurrentJokeById(id);
  currentDialogJoke.value.showDialog = true;

}

const closeDialog = () => {
  currentDialogJoke.value.showDialog = false;
}

const setCurrentJokeById = (id: number) => {
  currentDialogJoke.value = jokes.value.find(joke => joke.id === id)!;
}

const buyJoke = async (id: number) => {
  const response = await buyJokeWithId(id);
  currentDialogJoke.value.punchline = response.punchline;
  currentDialogJoke.value.showPunchline = true
}

onBeforeMount(() => {
  loadingJokes.value = true;
  mainStore.fetchSetups().then(() => loadingJokes.value = false)
});
</script>

<style scoped>
.header-title {
  padding-bottom: 10px;
}
</style>
