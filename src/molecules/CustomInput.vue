<template>
  <div class="input-wrapper">
    <label>{{ label }}</label>
    <input
        class="form-control"
        :type="type"
        :id="id"
        :value="value"
        :autocomplete="autocomplete"
        @input="handleInput($event)"
        @blur="$emit('blur')"
    />
    <div v-if="error" class="error-message">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script setup lang="ts">

const emit = defineEmits(['update:value', 'blur'])

defineProps({
  label: String,
  value: String,
  id: String,
  type: { type: String, default: 'text' },
  error: Boolean,
  errorMessage: String,
  autocomplete: String,
});

function handleInput(event: Event) {
  const target = event.target as HTMLInputElement;
  emit('update:value', target.value);
}
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
