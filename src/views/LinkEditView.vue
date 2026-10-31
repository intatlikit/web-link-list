<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import PageHeader from '../components/layout/PageHeader.vue';
import LinkForm from '../components/links/LinkForm.vue';
import LoadingState from '../components/states/LoadingState.vue';
import ErrorState from '../components/states/ErrorState.vue';
import { useLinks } from '../composables/useLinks';
import { updateLink } from '../services/linkService';
import { errorMessage } from '../lib/errors';
import type { LinkInput } from '../types';

const props = defineProps<{
  id: string;
}>();

const router = useRouter();
const { links, loading, error, loadLinks } = useLinks();

const index = computed(() => links.value.findIndex((link) => link.id === props.id));
const link = computed(() => links.value[index.value]);
const others = computed(() => links.value.filter((item) => item.id !== props.id));
const currentPosition = computed(() => index.value + 1);

const saving = ref(false);
const saveError = ref<string | null>(null);

async function handleSubmit(input: LinkInput, position: number) {
  saving.value = true;
  saveError.value = null;
  try {
    // Only touch the order when the position actually changed
    await updateLink(
      props.id,
      input,
      position === currentPosition.value ? undefined : position
    );
    await router.push({ name: 'home' });
  } catch (e) {
    saveError.value = errorMessage(e);
  } finally {
    saving.value = false;
  }
}
</script>

<template>
  <PageHeader
    title="Edit item"
    :back-to="{ name: 'home' }"
  />

  <main class="form-page">
    <LoadingState
      v-if="loading"
      :count="1"
    />
    <ErrorState
      v-else-if="error"
      :message="error"
      @retry="loadLinks"
    />
    <ErrorState
      v-else-if="!link"
      title="Item not found."
      message="It may have been removed or hidden."
      @retry="loadLinks"
    />
    <LinkForm
      v-else
      :others="others"
      :initial="link"
      :initial-position="currentPosition"
      submit-label="Save changes"
      :saving="saving"
      :error="saveError"
      @submit="handleSubmit"
      @cancel="router.push({ name: 'home' })"
    />
  </main>
</template>

<style scoped>
.form-page {
  width: 100%;
  max-width: 600px;
}
</style>
