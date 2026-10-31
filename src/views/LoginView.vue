<script setup lang="ts">
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import PageHeader from '../components/layout/PageHeader.vue';
import LoginForm from '../components/auth/LoginForm.vue';
import { useAuth } from '../composables/useAuth';
import { errorMessage } from '../lib/errors';

const route = useRoute();
const router = useRouter();
const { signIn } = useAuth();

const saving = ref(false);
const loginError = ref<string | null>(null);

async function handleSubmit(email: string, password: string) {
  saving.value = true;
  loginError.value = null;
  try {
    await signIn(email, password);
    // Only follow in-app redirects (e.g. "/links/new"), never external URLs
    const redirect = route.query.redirect;
    const target = typeof redirect === 'string' && redirect.startsWith('/') ? redirect : '/';
    await router.replace(target);
  } catch (e) {
    loginError.value = errorMessage(e);
  } finally {
    saving.value = false;
  }
}
</script>

<template>
  <PageHeader
    title="Sign in"
    :back-to="{ name: 'home' }"
  />

  <main class="form-page">
    <LoginForm
      :saving="saving"
      :error="loginError"
      @submit="handleSubmit"
    />
  </main>
</template>

<style scoped>
.form-page {
  width: 100%;
  max-width: 600px;
}
</style>
