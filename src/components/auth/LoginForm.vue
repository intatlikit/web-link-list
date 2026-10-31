<script setup lang="ts">
import { ref } from 'vue';

defineProps<{
  saving?: boolean;
  error?: string | null;
}>();

const emit = defineEmits<{
  submit: [email: string, password: string];
}>();

const email = ref('');
const password = ref('');
</script>

<template>
  <form
    class="form"
    @submit.prevent="emit('submit', email.trim(), password)"
  >
    <label class="form-field">
      <span class="form-label">Email</span>
      <input
        v-model="email"
        class="form-control"
        type="email"
        required
        autocomplete="email"
      >
    </label>

    <label class="form-field">
      <span class="form-label">Password</span>
      <input
        v-model="password"
        class="form-control"
        type="password"
        required
        autocomplete="current-password"
      >
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
        type="submit"
        class="button button-primary"
        :disabled="saving"
      >
        {{ saving ? 'Signing in...' : 'Sign in' }}
      </button>
    </div>
  </form>
</template>

<style scoped src="../../assets/form.css"></style>
