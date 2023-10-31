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
      <template v-for="joke in jokes">
        <v-card class="v_card" color="secondary" variant="elevated">
          <v-row>
            <v-card-title class="card_title">
              {{ joke.setup }}
            </v-card-title>
          </v-row>
          <v-row>
            <v-img
              class="v_image"
              :src="joke.image"
            ></v-img>
            <v-col>
              <v-card-subtitle class="card_subtitle">
                Hind: {{ joke.price }}€
              </v-card-subtitle>
              <v-rating
                v-model="joke.rating"
                color="primary"
                density="compact"
                :readonly="true"/>
            </v-col>
          </v-row>
        </v-card>
      </template>
    </v-container>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const jokes = ref([
  {setup: "Mis oli triikraudade võistluse tulemus?", price: 3, image: "https://picsum.photos/200", rating: 5},
  {setup: "Eestlane, venelane ja sakslane kõnnivad baari", price: 5, image: "https://picsum.photos/200", rating: 4},
  {
    setup: "Mis on need 3 asja, mis mulle kunagi meelde ei tule?",
    price: 10,
    image: "https://picsum.photos/200",
    rating: 3
  },
])
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

.v_image {
  max-width: 120px;
  aspect-ratio: 1.5;
  margin-right: 12px;
  margin-bottom: 20px;
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
.card_title {
  color: white;
  padding-top: 15px;
  padding-left: 22px;
}

.card_subtitle {
  padding-left: 0;
  padding-bottom: 5px;
  color: white;
}

.bottom_div {
  padding-bottom: 100px;
}
</style>
