<template>
  <v-container>
    <div class="welcoming-container">
    <v-row>
      <v-col cols="12" class="welcoming_text">
        <span>Midagi naljadest siia. Võiks RNG sõnum olla</span>
      </v-col>
    </v-row>
    <v-btn class="shop_btn" color="accent" to="/jokes">Avasta nalju</v-btn>
    </div>
  </v-container>
    <v-container class="bottom_div">
    <span class="title">Müügi hitid</span>
      <v-btn class="add-button" color="primary" prepend-icon="mdi-plus" to="/addJoke">Lisa oma nali</v-btn>
        <JokeCard
          class = "v_card"
          v-for="joke in jokes"
          :key="joke.id"
          :joke="joke"
          @openDialog="openDialog"
        />
        <JokeDialog
          v-if="showDialog"
          :joke="currentDialogJoke"
          @closeDialog="closeDialog"
          @buyJoke="buyJoke"
        />
    </v-container>
</template>

<script lang="ts" setup>
import {computed, onBeforeMount, Ref, ref} from "vue";
import axios from "axios";
import JokeDialog from "@/molecules/JokeDialog.vue";
import JokeCard from "@/molecules/JokeCard.vue";

const buy_url: string = "http://193.40.156.35:8080/api/jokes/buy/";
const top3_url: string = "http://193.40.156.35:8080/api/jokes/top3";
const jokes: Ref<Joke[]> = ref<Joke[]>([]);

interface Joke {
  id: number;
  setup: string;
  punchline: string;
  price: number;
  rating: number;
  timesBought: number;
  showDialog: boolean;
  showPunchline: boolean;
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

const getTop3Jokes = async() => {
  try {
    console.log("Getting top3 jokes")
    const response = await axios.get(top3_url);
    jokes.value = response.data;
    jokes.value.forEach(joke => {
      joke.showPunchline = false;
      joke.showDialog = false;
    })
  } catch (error) {
    console.error(error);
  }
}

onBeforeMount(() => {
  getTop3Jokes();
});
</script>

<style scoped>
.welcoming-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 50px;
  margin-top: 75px;
}
.welcoming_text {
  font-size: 2em;
  color: white;
}

.shop_btn {
  margin-top: 30px;
  max-width: 150px;
}

.add-button {
  margin-left: 10px;
}

.v_card {
  max-width: 500px;
  margin-top: 15px;
  margin-bottom: 5px;
  outline-color: purple;
}

.title {
  font-size: 45px;
  color: white;
  text-underline-offset: 15px;
  text-decoration: underline;
  text-align: left;
  margin-right: 97px;
}

.bottom_div {
  padding-bottom: 100px;
}
</style>
