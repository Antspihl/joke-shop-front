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
import {buyJokeWithId, fetchSetups} from "@/api/requestHandler";

const jokes: Ref<Joke[]> = ref<Joke[]>([]);

const currentDialogJoke = ref<Joke>({
  id: 0,
  setup: "",
  punchline: "",
  price: 0,
  rating: 3,
  timesBought: 0,
  showDialog: false,
  showPunchline: false
});

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

const getJokes = async () => {
  jokes.value = await fetchSetups();
  jokes.value.forEach(joke => {
    joke.showPunchline = false;
    joke.showDialog = false;
  })
  console.log("Got jokes", jokes.value);
}

onBeforeMount(() => {
  getJokes();
});
</script>

<style scoped>
.header-title {
  padding-bottom: 10px;
}
</style>
