<script setup lang="ts">
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
    <input
      v-model="query"
      type="text"
      class="search-input"
      :placeholder="placeholder"
    >
    <button
      v-if="query"
      type="button"
      class="clear-search"
      aria-label="Clear search"
      @click="query = ''"
    >
      ✕
    </button>
  </div>
</template>

<style scoped>
.search-container {
  margin: 2.5rem auto 0;
  width: 100%;
  max-width: 500px;
  position: relative;
  display: flex;
  align-items: center;
}

.search-input {
  width: 100%;
  padding: 0.8rem 3rem 0.8rem 1.5rem;
  font-size: 1.1rem;
  border-radius: 50px;
  border: 1px solid var(--color-border);
  background-color: var(--color-surface);
  color: var(--color-text);
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.search-input:focus {
  border-color: var(--color-accent);
  box-shadow: 0 0 0 2px var(--color-accent-ring);
}

.search-input::placeholder {
  color: var(--color-subtle);
}

.clear-search {
  position: absolute;
  right: 1rem;
  background: none;
  border: none;
  color: var(--color-subtle);
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s;
  line-height: 1;
}

.clear-search:hover {
  color: var(--color-accent);
}
</style>
