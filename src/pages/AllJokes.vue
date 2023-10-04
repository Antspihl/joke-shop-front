<script setup lang="ts">
import {onMounted, ref} from "vue";
import axios from "axios";

const jokes_url = "http://localhost:8080/api/jokes/all";
const jokes = ref<Joke[]>([]);

interface Joke {
  id: number;
  setup: string;
  punchline: string;
  price: number;
  timesBought: number;
}

const getJokes = async() => {
  try {
    console.log("Getting jokes")
    const response = await axios.get(jokes_url);
    jokes.value = response.data;
  } catch (error) {
    console.error(error);
}
}
onMounted(() => {
  console.log("Mounted")
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
            >
              Osta
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
</style>
