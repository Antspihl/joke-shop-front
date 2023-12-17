<template>
  <AllJokes v-if="!loadingJokes" user-jokes :jokes="mainStore.userJokes"/>
</template>
<script setup lang="ts">
import {useMainStore} from "@/api/MainStore";
import {onBeforeMount, ref} from "vue";
import AllJokes from "@/pages/AllJokes.vue";

const mainStore = useMainStore()
const loadingJokes = ref(false)

onBeforeMount(() => {
  loadingJokes.value = true
  mainStore.fetchUserJokes().then(() => loadingJokes.value = false)
})
</script>
