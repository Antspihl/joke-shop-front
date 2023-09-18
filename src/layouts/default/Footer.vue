<template>
  <v-footer app absolute color="primary lighten-1">
    <v-row align="center" class="mb-0">
      <v-col md="4" cols="12">
        <v-img
          class="v_image"
          src='/Asendus_logo.png'
        />
      </v-col>

      <v-col md="4" cols="12" class="text-center">
        <v-row>
          <v-col cols="12" class="v_top_row">
            <v-icon class="v_icon">mdi-email</v-icon>
            info@naljad.ee
          </v-col>
          <v-col cols="12" class="v_middle_row">
            <v-icon class="v_icon">mdi-home</v-icon>
            Pommiaugu põik 123
          </v-col>
          <v-col cols="12" class="v_bottom_row">
            <v-icon class="v_icon">mdi-phone</v-icon>
            123 45 678
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script lang="ts" setup>

</script>

<style scoped>
.v_image {
  max-width: 120px;
  aspect-ratio: 1.5;
  margin-right: 12px;
}

.v_top_row {
  padding-right: 4px;
  padding-bottom: 4px;
}

.v_middle_row {
  padding-top: 0;
  padding-bottom: 4px;
}

.v_bottom_row {
  padding-top: 0;
  padding-bottom: 4px;
}

.v_icon {
  padding-right: 4px;
  padding-bottom: 4px;
}
</style>
