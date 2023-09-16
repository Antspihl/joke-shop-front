<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="welcoming_text">
        <h2>Midagi naljadest siia. Võiks RNG sõnum olla</h2>
      </v-col>
    </v-row>
    <v-btn class="shop_btn" color="primary">
      <router-link class="text-white text-decoration-none" to="/" v-slot="{href, route, navigate}">
        Avasta nalju
      </router-link>
    </v-btn>
  </v-container>
  <div class="bottom_div">
    <h2 class="title">Müügi hitid</h2>

    <template v-for="joke in jokes">
      <v-card class="v_card" color="secondary">
        <v-row>
          <v-card-title>
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
              dense
              half-increments
              hover
              readonly
              size="15"
            ></v-rating>
          </v-col>
        </v-row>
      </v-card>
    </template>
  </div>
</template>

<script lang="ts" setup>
import {ref} from "vue";

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
.welcoming_text {
  font-size: 2em;
  text-align: center;
  margin-top: 75px;
}

.shop_btn {
  margin-top: 50px;
  margin-left: 40%;
}

.v_image {
  max-width: 120px;
  aspect-ratio: 1.5;
  margin-right: 12px;
  margin-bottom: 20px;
}

.v_card {
  max-width: 500px;
  margin-top: 5px;
  margin-bottom: 5px;
}

.title {
  text-align: left;
  margin-bottom: 10px;
  margin-top: 50px;
}

.card_subtitle {
  padding-left: 0;
}

.bottom_div {
  padding-bottom: 100px;
}
</style>
