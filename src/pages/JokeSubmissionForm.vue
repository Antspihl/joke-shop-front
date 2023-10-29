<template>
  <v-container class="title-container">
    <span class="header">Lisa oma nali siin</span>
  </v-container>
  <v-container class="form-container">
    <form class="my-form" @submit.prevent="handleSubmit">
      <div v-for="(label, key) in formFields" :key="key" class="form-group">
        <label :for="key">{{ label }}</label>
        <input v-if="key !== 'isOriginal'" v-model="formData[key]" :id="key" class="form-control" :required="true" />
        <input v-else type="checkbox" v-model="formData[key]" id="isOriginal" style="margin-left: 10px"/>
      </div>
      <v-btn :disabled="loading" type="submit" class="btn-primary">Lisa</v-btn>
    </form>
  </v-container>
  <v-snackbar v-model="snackbar.show" :color="snackbar.color" :timeout="snackbar.timeout" close-on-content-click>
    {{ snackbar.message }}
  </v-snackbar>
</template>

<script setup lang="ts">

import { ref } from "vue";
import Form from "vform";
import axios from "axios";

const backendUrl = "http://localhost:8080/api/jokes/add"

const formFields = {
  setup: "Setup",
  punchline: "Punchline",
  price: "Hind",
  isOriginal: "Kas nali on originaal?",
}

const formData = ref(new Form({
  setup: "",
  punchline: "",
  price: "",
  isOriginal: false,
}))

const snackbar = ref({
  show: false,
  message: "",
  color: "success",
  timeout: 3000,
})

const loading = ref(false)

const handleSubmit = async () => {
  loading.value = true
  console.log(formData.value)
  try {
    await axios.post(backendUrl, formData.value.data(), {
      headers: {
        "Content-Type": "application/json",
      },
    });
    showSnackbar("Joke added successfully", "#FFFCF5");
  } catch (error) {
    console.error("Error submitting form:", error);
    showSnackbar("Error adding joke", "#D7D3AE");
  } finally {
    loading.value = false
    formData.value.clear()
    formData.value.reset()
  }
};const showSnackbar = (message: string, color: string) => {
  snackbar.value = {
    show: true,
    message,
    color,
    timeout: 8000,
  };
};

</script>

<style scoped>
.header {
  text-underline-offset: 15px;
  text-decoration: underline;
}
.title-container {
  color: white;
  font-size: 35px;
  margin-left: 100px;
}
.form-container {
  display: flex;
  justify-content: center;
}
.my-form {
  max-width: 400px;
  margin: 0 auto;
  color: white;
  font-size: 20px;
}

.form-group {
  margin-bottom: 20px;
}

.form-control {
  width: 100%;
  padding: 10px;
  color: white;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.btn-primary {
  background-color: #C49859;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}
</style>
