<template>
  <v-container class="toast-container">
        <span class="toast-message">
          <v-icon class="info-icon">mdi-information</v-icon>
          Te ei ole veel ühtegi nalja soetanud, vaata galeriid:
        </span>
    <v-btn to="/jokes">Avasta nalju</v-btn>
  </v-container>
</template>

<style scoped>
.toast-container {
  background-color: rgba(255, 245, 230, 0.5);
  border-radius: 5px;
  max-width: 850px;
  display: flex;
  float: left;
}

.toast-message {
  color: #333;
  margin-left: 10px;
  margin-right: 15px;
  font-size: 26px;
}
</style>
