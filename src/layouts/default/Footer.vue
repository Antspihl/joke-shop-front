<template>
  <v-footer app absolute color="primary lighten-1">
    <v-row align="center" class="mb-0">
      <v-col md="4" cols="12">
        <v-img class="mx-auto mx-md-0" width="125"
               :aspect-ratio="2"
               src='/Asendus_logo.png'
               cover
               contain/>
      </v-col>
      <v-col md="4" cols="12" class="text-center">
        <v-row>
          <v-col cols="12" class="pb-1"><v-icon class="pr-1 pb-1">mdi-email</v-icon>info@naljad.ee</v-col>
          <v-col cols="12" class="pt-0 pb-1"><v-icon class="pr-1 pb-1">mdi-home</v-icon>Pommiaugu põik 123</v-col>
          <v-col cols="12" class="pt-0"><v-icon class="pr-1 pb-1">mdi-phone</v-icon>555555555</v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script lang="ts" setup>
</script>
