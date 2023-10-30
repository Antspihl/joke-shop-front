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
import axios from "axios";
import JokeCard from "@/molecules/JokeCard.vue";
import JokeDialog from "@/molecules/JokeDialog.vue";

const jokes_url: string = "http://localhost:8080/api/jokes/setups";
// const jokes_url: string = "http://193.40.156.35:8080/api/jokes/setups";
const buy_url: string = "http://localhost:8080/api/jokes/buy/";
const jokes: Ref<Joke[]> = ref<Joke[]>([]);

interface Joke {
  id: number;
  setup: string;
  punchline: string;
  price: number;
  rating: number;
  timesBought: number;
  showDialog: boolean;
  showPunchline?: boolean;
}

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
  try {
    console.log("Buying joke")
    const response = await axios.get(buy_url + id);
    currentDialogJoke.value.punchline = response.data.punchline;
    currentDialogJoke.value.showPunchline = true
  } catch (error) {
    console.error(error);
  }
}

const getJokes = async () => {
  try {
    console.log("Getting jokes")
    const response = await axios.get(jokes_url);
    jokes.value = response.data;
    jokes.value.sort((a: Joke, b: Joke) => a.id - b.id);
  } catch (error) {
    console.error(error);
  }
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
