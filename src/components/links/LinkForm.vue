<script setup lang="ts">
import { computed, ref } from 'vue';
import BaseButton from '../common/BaseButton.vue';
import ClearableInput from '../common/ClearableInput.vue';
import SelectInput from '../common/SelectInput.vue';
import type { LinkInput, LinkItem } from '../../types';

const props = defineProps<{
  /** All other items, in display order — used to build the position picker. */
  others: LinkItem[];
  /** Existing values when editing. */
  initial?: LinkInput;
  /** 1-based current position when editing; when omitted the default is the end. */
  initialPosition?: number;
  submitLabel: string;
  saving?: boolean;
  error?: string | null;
  /** Show a Delete button (edit page). */
  deletable?: boolean;
}>();

const emit = defineEmits<{
  submit: [input: LinkInput, position: number];
  cancel: [];
  delete: [];
}>();

const endPosition = computed(() => props.others.length + 1);

const title = ref(props.initial?.title ?? '');
const url = ref(props.initial?.url ?? '');
const description = ref(props.initial?.description ?? '');
const position = ref(props.initialPosition ?? endPosition.value);

// "At the end" comes first (unnumbered) since it is the default when adding.
const positionOptions = computed(() => {
  const mark = (value: number, label: string) =>
    value === props.initialPosition ? `${label} (current)` : label;
  return [
    { value: endPosition.value, label: mark(endPosition.value, 'At the end') },
    ...props.others.map((item, index) => ({
      value: index + 1,
      label: mark(index + 1, `${index + 1}. Before "${item.title}"`),
    })),
  ];
});

const validationError = ref<string | null>(null);

function handleSubmit() {
  const input: LinkInput = {
    title: title.value.trim(),
    url: url.value.trim(),
    description: description.value.trim(),
  };
  // `required` lets whitespace-only values through, so check after trimming
  if (!input.title || !input.url || !input.description) {
    validationError.value = 'All fields are required and cannot be blank.';
    return;
  }
  validationError.value = null;
  emit('submit', input, position.value);
}
</script>

<template>
  <form
    class="form"
    @submit.prevent="handleSubmit"
  >
    <label class="form-field">
      <span class="form-label">Title</span>
      <ClearableInput
        v-model="title"
        type="text"
        required
        maxlength="100"
        placeholder="e.g. Loan Calculator"
      />
    </label>

    <label class="form-field">
      <span class="form-label">URL</span>
      <ClearableInput
        v-model="url"
        type="url"
        required
        maxlength="2000"
        pattern="https?://.+"
        title="Must start with http:// or https://"
        inputmode="url"
        placeholder="https://example.com"
      />
    </label>

    <label class="form-field">
      <span class="form-label">Description</span>
      <ClearableInput
        v-model="description"
        multiline
        required
        rows="3"
        maxlength="300"
        placeholder="What is this tool for?"
      />
    </label>

    <label class="form-field">
      <span class="form-label">Position</span>
      <SelectInput
        v-model="position"
        :options="positionOptions"
      />
      <span class="form-hint">
        {{ initialPosition ? 'Defaults to the current position.' : 'Defaults to the end of the list.' }}
        You can also drag cards on the home page.
      </span>
    </label>

    <p
      v-if="validationError || error"
      class="form-error"
      role="alert"
    >
      {{ validationError || error }}
    </p>

    <div class="form-actions">
      <BaseButton
        v-if="deletable"
        variant="danger-outline"
        class="form-button delete-button"
        :disabled="saving"
        @click="emit('delete')"
      >
        Delete
      </BaseButton>
      <BaseButton
        variant="secondary"
        class="form-button"
        :disabled="saving"
        @click="emit('cancel')"
      >
        Cancel
      </BaseButton>
      <BaseButton
        type="submit"
        class="form-button"
        :disabled="saving"
      >
        {{ saving ? 'Saving...' : submitLabel }}
      </BaseButton>
    </div>
  </form>
</template>

<style scoped>
.form {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.form-field {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  min-width: 0;
}

.form-label {
  font-weight: 600;
}

.form-hint {
  color: var(--color-muted);
  font-size: 0.85rem;
  font-weight: 400;
}

.form-error {
  color: var(--color-error);
  margin: 0;
}

.form-actions {
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
}

/* Delete sits apart on the left, away from Save */
.delete-button {
  margin-right: auto;
}

/* Phones: full-width buttons stacked Save → Cancel → Delete */
@media (max-width: 480px) {
  .form-actions {
    flex-direction: column-reverse;
  }

  .form-button {
    width: 100%;
  }

  .delete-button {
    margin-right: 0;
  }
}
</style>
