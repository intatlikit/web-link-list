<script setup lang="ts">
import { computed, ref } from 'vue';
import type { LinkInput, LinkItem } from '../../types';

const props = defineProps<{
  /** All other items, in display order — used to build the position picker. */
  others: LinkItem[];
  /** Existing values when editing. */
  initial?: LinkInput;
  /** 1-based position to preselect; defaults to the end of the list. */
  initialPosition?: number;
  submitLabel: string;
  saving?: boolean;
  error?: string | null;
}>();

const emit = defineEmits<{
  submit: [input: LinkInput, position: number];
  cancel: [];
}>();

const title = ref(props.initial?.title ?? '');
const url = ref(props.initial?.url ?? '');
const description = ref(props.initial?.description ?? '');
const position = ref(props.initialPosition ?? props.others.length + 1);

const positionOptions = computed(() =>
  Array.from({ length: props.others.length + 1 }, (_, index) => {
    const value = index + 1;
    const next = props.others[index];
    let label = next ? `${value}. Before "${next.title}"` : `${value}. At the end`;
    if (value === props.initialPosition) label += ' (current)';
    return { value, label };
  })
);

function handleSubmit() {
  emit(
    'submit',
    {
      title: title.value.trim(),
      url: url.value.trim(),
      description: description.value.trim() || undefined,
    },
    position.value
  );
}
</script>

<template>
  <form
    class="form"
    @submit.prevent="handleSubmit"
  >
    <label class="form-field">
      <span class="form-label">Title</span>
      <input
        v-model="title"
        class="form-control"
        type="text"
        required
        maxlength="100"
        placeholder="e.g. Loan Calculator"
      >
    </label>

    <label class="form-field">
      <span class="form-label">URL</span>
      <input
        v-model="url"
        class="form-control"
        type="url"
        required
        inputmode="url"
        placeholder="https://example.com"
      >
    </label>

    <label class="form-field">
      <span class="form-label">Description <span class="form-hint">(optional)</span></span>
      <textarea
        v-model="description"
        class="form-control"
        rows="3"
        maxlength="300"
        placeholder="What is this tool for?"
      />
    </label>

    <label class="form-field">
      <span class="form-label">Position</span>
      <select
        v-model.number="position"
        class="form-control"
      >
        <option
          v-for="option in positionOptions"
          :key="option.value"
          :value="option.value"
        >
          {{ option.label }}
        </option>
      </select>
      <span class="form-hint">Leave as is to keep the default. You can also drag cards on the home page.</span>
    </label>

    <p
      v-if="error"
      class="form-error"
      role="alert"
    >
      {{ error }}
    </p>

    <div class="form-actions">
      <button
        type="button"
        class="button button-secondary"
        :disabled="saving"
        @click="emit('cancel')"
      >
        Cancel
      </button>
      <button
        type="submit"
        class="button button-primary"
        :disabled="saving"
      >
        {{ saving ? 'Saving...' : submitLabel }}
      </button>
    </div>
  </form>
</template>

<style scoped src="../../assets/form.css"></style>
