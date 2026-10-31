<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import PageHeader from '../components/layout/PageHeader.vue';
import LinkForm from '../components/links/LinkForm.vue';
import LoadingState from '../components/states/LoadingState.vue';
import ErrorState from '../components/states/ErrorState.vue';
import { useLinks } from '../composables/useLinks';
import { createLink } from '../services/linkService';
import { errorMessage } from '../lib/errors';
import type { LinkInput } from '../types';

const router = useRouter();
const { links, loading, error, loadLinks } = useLinks();

const saving = ref(false);
const saveError = ref<string | null>(null);

async function handleSubmit(input: LinkInput, position: number) {
  saving.value = true;
  saveError.value = null;
  try {
    await createLink(input, position);
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
    title="Add item"
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
    <LinkForm
      v-else
      :others="links"
      submit-label="Add item"
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
