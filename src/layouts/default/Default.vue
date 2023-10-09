<template>
  <v-app>
    <Tool-bar />
    <default-view />
<!--    <joke-submission-form />-->
    <Base-footer />
  </v-app>
</template>

<script lang="ts" setup>
  import ToolBar from '../../components/Toolbar.vue'
  import DefaultView from './View.vue'
  import BaseFooter from '../../components/Footer.vue'
  import JokeSubmissionForm from "@/components/JokeSubmissionForm.vue";
</script>
