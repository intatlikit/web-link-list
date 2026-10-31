<script setup lang="ts">
import { onMounted, ref, useId, watch } from 'vue';
import BaseButton from './BaseButton.vue';

const props = withDefaults(
  defineProps<{
    open: boolean;
    title: string;
    message: string;
    confirmLabel?: string;
    busyLabel?: string;
    /** Disables the buttons and blocks closing while the action runs. */
    busy?: boolean;
  }>(),
  { confirmLabel: 'Delete', busyLabel: 'Deleting...', busy: false }
);

const emit = defineEmits<{
  confirm: [];
  cancel: [];
}>();

const titleId = useId();
const dialogRef = ref<HTMLDialogElement | null>(null);

// Native <dialog> gives focus trapping, Esc handling, and a backdrop on every browser.
function syncOpen() {
  const dialog = dialogRef.value;
  if (!dialog) return;
  if (props.open && !dialog.open) dialog.showModal();
  else if (!props.open && dialog.open) dialog.close();
}

watch(() => props.open, syncOpen);
onMounted(syncOpen);

function requestCancel() {
  if (!props.busy) emit('cancel');
}

/** Esc key: let the parent decide by toggling `open`. */
function onNativeCancel(event: Event) {
  event.preventDefault();
  requestCancel();
}

/** Clicks on the dialog element itself land on the backdrop area. */
function onDialogClick(event: MouseEvent) {
  if (event.target === dialogRef.value) requestCancel();
}
</script>

<template>
  <dialog
    ref="dialogRef"
    class="confirm-dialog"
    :aria-labelledby="titleId"
    @cancel="onNativeCancel"
    @click="onDialogClick"
  >
    <div class="dialog-body">
      <h2 :id="titleId">
        {{ title }}
      </h2>
      <p>{{ message }}</p>
      <div class="dialog-actions">
        <BaseButton
          variant="secondary"
          :disabled="busy"
          @click="requestCancel"
        >
          Cancel
        </BaseButton>
        <BaseButton
          variant="danger"
          :disabled="busy"
          @click="emit('confirm')"
        >
          {{ busy ? busyLabel : confirmLabel }}
        </BaseButton>
      </div>
    </div>
  </dialog>
</template>

<style scoped>
.confirm-dialog {
  width: min(420px, calc(100vw - 2rem));
  padding: 0;
  border: 1px solid var(--color-border);
  border-radius: 12px;
  background-color: var(--color-bg);
  color: var(--color-text);
  box-shadow: var(--shadow-card);
}

.confirm-dialog::backdrop {
  background-color: hsla(0, 0%, 0%, 0.55);
}

.dialog-body {
  padding: 1.5rem;
}

h2 {
  margin: 0 0 0.5rem;
  font-size: 1.25rem;
  color: var(--color-heading);
}

p {
  margin: 0 0 1.5rem;
  color: var(--color-description);
  overflow-wrap: anywhere;
}

.dialog-actions {
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
}

/* Phones: full-width buttons, destructive action on top */
@media (max-width: 480px) {
  .dialog-actions {
    flex-direction: column-reverse;
  }

  .dialog-actions > * {
    width: 100%;
  }
}
</style>
