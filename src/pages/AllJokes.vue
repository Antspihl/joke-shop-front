<template>
  <v-container class="all-jokes">
    <div v-if="!userJokes" class="header-title">
      <h1>Müügil olevad naljad</h1>
    </div>
    <div v-if="userJokes" class="header-title">
      <h1 class="mb-4">Naudi oma nalju</h1>
      <NoBoughtJokesToast v-if="jokes.length == 0"/>
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
import {computed, ref} from "vue";
import JokeCard from "@/molecules/JokeCard.vue";
import JokeDialog from "@/molecules/JokeDialog.vue";
import {Joke} from "@/molecules/types";
import {useMainStore} from "@/api/MainStore";
import NoBoughtJokesToast from "@/molecules/NoBoughtJokesToast.vue";

const mainStore = useMainStore()
const userLoggedIn = localStorage.getItem('user') ?? false

const props = defineProps<{
  jokes: Joke[]
  userJokes: boolean
}>()

const currentDialogJoke = ref<Joke>(<Joke>{});

const showDialog = computed(() => {
  return currentDialogJoke.value.showDialog;
})

function openDialog(id: number) {
  setCurrentJokeById(id);
  currentDialogJoke.value.showDialog = true;
}

function closeDialog() {
  currentDialogJoke.value.showDialog = false;
}

function setCurrentJokeById(id: number) {
  currentDialogJoke.value = props.jokes.find(joke => joke.id === id)!;
}

async function buyJoke(id: number) {
  if (userLoggedIn === false) {
    return
  }
  const response = await mainStore.buyJokeWithId(id);
  currentDialogJoke.value.punchline = response.punchline;
  currentDialogJoke.value.showPunchline = true
}
</script>

<style scoped>
.header-title {
  padding-bottom: 10px;
}
</style>
