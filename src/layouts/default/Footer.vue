<template>
  <v-footer app absolute color="primary lighten-1">
    <v-row align="center" class="mb-0">
      <v-col md="4" cols="12">
        <v-img
          class="mr-3"
          max-width="120"
          :aspect-ratio="1.5"
          src='/Asendus_logo.png'
        />
      </v-col>
      <v-col md="4" cols="12" class="text-center">
        <template v-for="footerLink in footerLinks">
          <router-link :to="footerLink.url" v-slot="{href, route, navigate}">
            <v-btn :href="href" @click="navigate" color="white"
                   variant="text"
                   rounded>{{ footerLink.name }}
            </v-btn>
          </router-link>
        </template>
      </v-col>

      <v-col md="4" cols="12" class="text-center">
        <v-row>
          <v-col cols="12" class="pb-1">
            <v-icon class="pr-1 pb-1">mdi-email</v-icon>
            info@naljad.ee
          </v-col>
          <v-col cols="12" class="pt-0 pb-1">
            <v-icon class="pr-1 pb-1">mdi-home</v-icon>
            Pommiaugu põik 123
          </v-col>
          <v-col cols="12" class="pt-0">
            <v-icon class="pr-1 pb-1">mdi-phone</v-icon>
            123 45 678
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script lang="ts" setup>
interface FooterLink {
  name: string,
  url: string
}

const footerLinks: FooterLink[] = [
  {name: "Privaatsuspoliitika", url: "/"},
]
</script>
