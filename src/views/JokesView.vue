<template>
  <AllJokes v-if="!loadingJokes" :user-jokes="false" :jokes="mainStore.setups"/>
</template>

<script lang="ts" setup>
import AllJokes from "@/pages/AllJokes.vue";
import {useMainStore} from "@/api/MainStore";
import {onBeforeMount, ref} from "vue";

const mainStore = useMainStore()
const loadingJokes = ref(false)

onBeforeMount(() => {
  loadingJokes.value = true;
  mainStore.fetchSetups().then(() => loadingJokes.value = false)
});
</script>
