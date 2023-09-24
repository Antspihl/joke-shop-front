<template>
  <v-app>
    <Tool-bar />
    <default-view />
    <Base-footer />
  </v-app>
</template>

<script lang="ts" setup>
  import ToolBar from '../../components/Toolbar.vue'
  import DefaultView from './View.vue'
  import BaseFooter from '../../components/Footer.vue'
</script>
