<script setup lang="ts" generic="T extends string | number">
import IconChevronDown from '../icons/IconChevronDown.vue';

// Attributes (id, required, aria-*) go to the <select>, not the wrapper.
defineOptions({ inheritAttrs: false });

defineProps<{
  options: { value: T; label: string }[];
}>();

const model = defineModel<T>({ required: true });
</script>

<template>
  <div class="select">
    <select
      v-model="model"
      v-bind="$attrs"
      class="select-field"
    >
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
    <span
      class="select-arrow"
      aria-hidden="true"
    >
      <IconChevronDown />
    </span>
  </div>
</template>

<style scoped>
.select {
  position: relative;
  width: 100%;
}

.select-field {
  /* Hide the native arrow so ours lines up the same in every browser */
  appearance: none;
  -webkit-appearance: none;
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
  cursor: pointer;
  /* Long labels shrink to "…" instead of running under the arrow */
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.select-field:focus {
  border-color: var(--color-accent);
  box-shadow: 0 0 0 2px var(--color-accent-ring);
}

.select-field option {
  background-color: var(--color-surface);
  color: var(--color-text);
}

.select-arrow {
  position: absolute;
  top: 50%;
  right: 0.9rem;
  transform: translateY(-50%);
  display: flex;
  color: var(--color-muted);
  pointer-events: none;
}

.select-field:focus + .select-arrow {
  color: var(--color-accent);
}
</style>
