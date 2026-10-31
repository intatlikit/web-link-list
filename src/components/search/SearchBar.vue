<script setup lang="ts">
import ClearableInput from '../common/ClearableInput.vue';

withDefaults(
  defineProps<{
    placeholder?: string;
  }>(),
  { placeholder: 'Search...' }
);

const query = defineModel<string>({ required: true });
</script>

<template>
  <div class="search-container">
    <ClearableInput
      v-model="query"
      variant="pill"
      type="text"
      enterkeyhint="search"
      aria-label="Search"
      :placeholder="placeholder"
    />
  </div>
</template>

<style scoped>
.search-container {
  margin: 2.5rem auto 0;
  width: 100%;
  max-width: 500px;
}
</style>
