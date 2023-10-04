<template>
  <v-app>
    <Tool-bar />
    <default-view />
<!--    <joke-submission-form />-->
    <Base-footer />
  </v-app>
</template>

<script lang="ts" setup>
  import ToolBar from './Toolbar.vue'
  import DefaultView from './View.vue'
  import BaseFooter from './Footer.vue'
  import JokeSubmissionForm from "@/components/JokeSubmissionForm.vue";
</script>
