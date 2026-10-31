<script setup lang="ts">
import { computed, ref } from 'vue';
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
}>();

const emit = defineEmits<{
  submit: [input: LinkInput, position: number];
  cancel: [];
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
      <span class="form-label">Description <span class="form-hint">(optional)</span></span>
      <ClearableInput
        v-model="description"
        multiline
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

.button {
  padding: 0.7rem 1.5rem;
  min-height: 44px;
  font-size: 1rem;
  font-family: inherit;
  border-radius: 50px;
  border: 1px solid var(--color-accent);
  cursor: pointer;
  transition: opacity 0.2s, background-color 0.2s;
}

.button:disabled {
  opacity: 0.6;
  cursor: progress;
}

.button-primary {
  background-color: var(--color-accent);
  color: hsl(0, 0%, 100%);
}

.button-secondary {
  background: none;
  color: var(--color-accent);
}

/* Phones: full-width buttons, primary action on top */
@media (max-width: 480px) {
  .form-actions {
    flex-direction: column-reverse;
  }

  .button {
    width: 100%;
  }
}
</style>
