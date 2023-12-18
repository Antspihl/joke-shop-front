<template>
  <v-footer color="primary lighten-1" class="footer">
    <v-row align="center">
      <v-col class="logo-column">
        <v-img class="logo" src='/FooterLogo.png' />
      </v-col>

      <v-col class="details-column">
        <div class="contact-detail">
          <v-icon class="icon">mdi-email</v-icon>
          info@naljad.ee
        </div>
        <div class="contact-detail">
          <v-icon class="icon">mdi-home</v-icon>
          Pommiaugu põik 123
        </div>
        <div class="contact-detail">
          <v-icon class="icon">mdi-phone</v-icon>
          123 45 678
        </div>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script lang="ts" setup>
</script>

<style scoped>
.footer {
  max-height: 12rem;
  padding: 16px 16px !important;
}

.logo {
  max-width: 120px;
  aspect-ratio: 1.5;
}

.logo-column,
.details-column {
  max-width: 35%;
  text-align: center;
  padding: 0 12px;
}

.contact-detail {
  padding: 4px 0;
}

.icon {
  padding-right: 4px;
}
</style>
