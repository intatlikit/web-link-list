<script setup lang="ts">
import { ref } from 'vue';

// Attributes (type, placeholder, required, maxlength...) go to the input, not the wrapper.
defineOptions({ inheritAttrs: false });

withDefaults(
  defineProps<{
    /** Render a <textarea> instead of an <input>. */
    multiline?: boolean;
    /** `pill` is the rounded, larger style used by the search bar. */
    variant?: 'default' | 'pill';
  }>(),
  { multiline: false, variant: 'default' }
);

const model = defineModel<string>({ required: true });
const fieldRef = ref<HTMLInputElement | HTMLTextAreaElement | null>(null);

function clear() {
  model.value = '';
  fieldRef.value?.focus();
}
</script>

<template>
  <div
    class="clearable"
    :class="[`clearable-${variant}`, { 'clearable-multiline': multiline }]"
  >
    <textarea
      v-if="multiline"
      ref="fieldRef"
      v-model="model"
      v-bind="$attrs"
      class="clearable-field"
    />
    <input
      v-else
      ref="fieldRef"
      v-model="model"
      v-bind="$attrs"
      class="clearable-field"
    >
    <button
      v-if="model"
      type="button"
      class="clear-button"
      aria-label="Clear text"
      title="Clear"
      @click="clear"
    >
      ✕
    </button>
  </div>
</template>

<style scoped>
.clearable {
  position: relative;
  width: 100%;
}

.clearable-field {
  display: block;
  width: 100%;
  box-sizing: border-box;
  padding: 0.7rem 2.75rem 0.7rem 1rem;
  /* >= 16px so iOS Safari does not zoom on focus */
  font-size: 1rem;
  font-family: inherit;
  line-height: 1.5;
  border-radius: 8px;
  border: 1px solid var(--color-border);
  background-color: var(--color-surface);
  color: var(--color-text);
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.clearable-field:focus {
  border-color: var(--color-accent);
  box-shadow: 0 0 0 2px var(--color-accent-ring);
}

.clearable-field::placeholder {
  color: var(--color-subtle);
}

textarea.clearable-field {
  resize: vertical;
  min-height: 5rem;
}

.clearable-pill .clearable-field {
  padding: 0.8rem 3rem 0.8rem 1.5rem;
  font-size: 1.1rem;
  border-radius: 50px;
}

.clear-button {
  position: absolute;
  top: 50%;
  right: 0.35rem;
  transform: translateY(-50%);
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  border-radius: 50%;
  color: var(--color-subtle);
  font-size: 1rem;
  line-height: 1;
  cursor: pointer;
  transition: color 0.2s, background-color 0.2s;
  -webkit-tap-highlight-color: transparent;
}

.clear-button:hover {
  color: var(--color-accent);
  background-color: var(--color-accent-ring);
}

.clearable-pill .clear-button {
  right: 0.6rem;
}

/* Textareas grow, so pin the button to the top-right instead of centering it */
.clearable-multiline .clear-button {
  top: 0.35rem;
  transform: none;
}
</style>
