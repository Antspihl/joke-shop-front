<template>
  <v-container v-if="!loadingTop3Jokes" >
    <div class="welcoming-container">
    <v-row>
      <v-col v-if="!loadingRandomJoke" cols="12" class="welcoming_text">
        <span>{{mainStore.randomJoke}}</span>
      </v-col>
    </v-row>
    <v-btn class="shop_btn" color="accent" to="/jokes">Avasta nalju</v-btn>
    </div>
  </v-container>
    <v-container v-if="!loadingTop3Jokes" class="bottom_div">
    <span class="title">Müügi hitid</span>
      <v-btn color="primary" prepend-icon="mdi-plus" to="/addJoke">Lisa oma nali</v-btn>
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
import {computed, onBeforeMount, ref} from "vue";
import JokeDialog from "@/molecules/JokeDialog.vue";
import JokeCard from "@/molecules/JokeCard.vue";
import {Joke} from "@/molecules/types";
import {useMainStore} from "@/api/MainStore";

const mainStore = useMainStore()
const loadingTop3Jokes = ref(false)
const jokes = computed(() => mainStore.getTop3)
const userLoggedIn = ref(localStorage.getItem('user') ?? false)
const loadingRandomJoke = ref(false)

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

function openDialog(id: number) {
  setCurrentJokeById(id);
  currentDialogJoke.value.showDialog = true;
}

function closeDialog() {
  currentDialogJoke.value.showDialog = false;
}

function setCurrentJokeById(id: number) {
  currentDialogJoke.value = jokes.value.find(joke => joke.id === id)!;
}

async function buyJoke(id: number) {
  if (userLoggedIn.value === false) {
    return
  }
  const response = await mainStore.buyJokeWithId(id);
  currentDialogJoke.value.punchline = response.punchline;
  currentDialogJoke.value.showPunchline = true
}

onBeforeMount(() => {
  loadingRandomJoke.value = true;
  mainStore.randomJoke().then(() => loadingRandomJoke.value = false);
  loadingTop3Jokes.value = true;
  mainStore.fetchTop3Setups().then(() => loadingTop3Jokes.value = false);
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
