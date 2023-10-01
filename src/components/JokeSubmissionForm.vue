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
</template>

<script setup lang="ts">

import { ref } from "vue";
import Form from "vform";

const formFields = {
  header: "Pealkiri",
  setup: "Setup",
  punchline: "Punchline",
  isOriginal: "Kas nali on originaal?",
}

const formData = ref(new Form({
  header: "",
  setup: "",
  punchline: "",
  isOriginal: false,
}))

const loading = ref(false)

const handleSubmit = async () => {
  loading.value = true
  console.log(formData.value)

  await new Promise(resolve => setTimeout(resolve, 1000));

  loading.value = false
  formData.value.clear()
  formData.value.reset()
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
