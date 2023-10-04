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

onMounted(async () => {
  console.log("Mounted")
  await getJokes();
});
}
</script>

<template>
  <h3>{{jokes}}</h3>
  <v-container>
    <v-row>
      <v-col
        v-for="joke in jokes.values()"
        :key="joke.id"
        cols="12"
        sm="6"
        md="4"
      >
        <v-card>
          <v-card-title>
            {{ joke.setup }}
          </v-card-title>
          <v-card-text>
            {{ joke.punchline }}
          </v-card-text>
          <v-card-actions>
            <v-btn
              color="primary"
              text
            >
              Buy
            </v-btn>
            <v-btn
              color="primary"
              text
            >
              {{ joke.price }}€
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>

</style>
