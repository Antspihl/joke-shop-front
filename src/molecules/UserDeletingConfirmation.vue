<template>
  <v-dialog>
    <v-container class="delete-container">
      <v-card class="delete-dialog-card">
        <v-card-title>Oled sa kindel, et soovid kasutaja "
          <strong>{{ props.userToDelete.username }}</strong> " kustutada?
        </v-card-title>
        <div class="card-buttons">
        <v-btn color="primary" text="Kustuta" @click="deleteUser()"/>
          <v-btn color="error" text="Välju" @click="$emit('closeDialog')"/>
        </div>
      </v-card>
    </v-container>
  </v-dialog>

</template>
<script setup lang="ts">
import {useMainStore} from "@/api/MainStore";
import {User, UsersPageRequest} from "@/molecules/types";

const props = defineProps<{
  userToDelete: User
  pageRequest: UsersPageRequest
}>()
const mainStore = useMainStore()
const emit = defineEmits(['userDeleted', 'closeDialog'])

function deleteUser() {
  mainStore.deleteUser(props.userToDelete.userId, props.pageRequest)
      .then(() => {emit('userDeleted')})
}
</script>

<style scoped>
.delete-dialog-card {
  padding: 15px;
  border-radius: 10px;
  min-width: 22rem;
}
.delete-container {
  display: flex;
  justify-content: center;
}
.card-buttons {
  padding-top: 10px;
  display: flex;
  justify-content: space-around;
}
</style>
