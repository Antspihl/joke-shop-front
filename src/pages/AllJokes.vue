<script setup lang="ts">
import {onMounted, Ref, ref} from "vue";
import axios from "axios";

const jokes_url: string = "http://localhost:8080/api/jokes/all";
const jokes: Ref<Joke[]> = ref<Joke[]>([]);

interface Joke {
  id: number;
  setup: string;
  punchline: string;
  price: number;
  timesBought: number;
  showDialog?: boolean;
  showPunchline?: boolean;
}

const currentJoke = ref<Joke>({
  id: 0,
  setup: "",
  punchline: "",
  price: 0,
  timesBought: 0,
  showDialog: false,
  showPunchline: false
});

const openDialog = (id: number) => {
  setCurrentJokeById(id);
  currentJoke.value.showDialog = true;
}

const closeDialog = () => {
  currentJoke.value.showDialog = false;
}

const setCurrentJokeById = (id: number) => {
  currentJoke.value = jokes.value.find(joke => joke.id === id)!;
}

const buyJoke = async (id: number) => {
  currentJoke.value.showPunchline = true
}

const getJokes = async () => {
  try {
    console.log("Getting jokes")
    const response = await axios.get(jokes_url);
    jokes.value = response.data;
  } catch (error) {
    console.error(error);
  }
}

onMounted(() => {
  getJokes();
});
</script>

<template>
  <v-container>
    <h1 class="h1">Müügil olevad naljad</h1>
    <v-row>
      <v-col
        v-for="joke in jokes.values()"
        :key="joke.id"
        cols="12"
        sm="6"
        md="4"
      >
        <v-card color="secondary">
          <v-card-title class="card_title">
            {{ joke.setup }}
          </v-card-title>
          <v-card-subtitle class="card_subtitle">
            Hind: {{ joke.price }}€
          </v-card-subtitle>
          <v-card-actions>
            <v-btn
              color="primary"
              class="v_btn"
              @click="openDialog(joke.id)"
            >
              <span v-if="joke.showPunchline">Vaata</span>
              <span v-else>Osta</span>

              <v-dialog
                v-model="joke.showDialog"
                width="auto"
              >
                <v-card
                  color="accent"
                  class="joke_card"
                >
                  <v-card-text>{{ currentJoke.setup }}</v-card-text>
                  <v-card-text v-if="currentJoke.showPunchline">{{ joke.punchline }}</v-card-text>
                  <v-card-text v-else>Soovid osta selle nalja lööklauset? Hind: {{ joke.price }}€</v-card-text>
                  <v-card-actions>
                    <v-btn color="primary"
                           class="v_btn"
                           @click="buyJoke(joke.id)"
                           v-if="!currentJoke.showPunchline">
                      Osta
                    </v-btn>
                    <v-btn color="error" @click="closeDialog">Välju</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.h1 {
  padding-bottom: 1rem;
  color: white;
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

.v_btn {
  margin-left: 4px;
  margin-bottom: 5px;
  color: white;
}

.joke_card {
  min-width: 400px;
}
</style>
