<template>
  <div class="input-wrapper">
    <label :for="id">{{ label }}</label>
    <input
        class="form-control"
        :type="type"
        :id="id"
        :value="value"
        :autocomplete="autocomplete"
        @input="$emit('update:value', $event.target.value)"
        @blur="$emit('blur')"
    />
    <div v-if="error" class="error-message">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

defineProps({
  label: String,
  value: String,
  id: [String, Number],
  type: { type: String, default: 'text' },
  error: Boolean,
  errorMessage: String,
  autocomplete: String,
});
</script>

<style scoped>
.input-wrapper {
  margin-bottom: 15px;
}

.form-control {
  width: 100%;
  padding: 10px;
  margin-top: 12px;
  border: 1px solid dimgray;
  border-radius: 5px;
}

.error-message {
  color: red;
  font-size: 0.8rem;
  margin-top: 5px;
}
</style>
