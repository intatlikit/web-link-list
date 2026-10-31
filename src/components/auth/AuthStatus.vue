<script setup lang="ts">
import { useAuth } from '../../composables/useAuth';

const { session, authEnabled, signOut } = useAuth();
</script>

<template>
  <div
    v-if="authEnabled"
    class="auth-status"
  >
    <template v-if="session">
      <span>Signed in as {{ session.user.email }}</span>
      <button
        type="button"
        class="auth-action"
        @click="signOut"
      >
        Sign out
      </button>
    </template>
    <RouterLink
      v-else
      :to="{ name: 'login' }"
      class="auth-action"
    >
      Sign in to edit
    </RouterLink>
  </div>
</template>

<style scoped>
.auth-status {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.9rem;
}

.auth-action {
  background: none;
  border: none;
  padding: 0;
  font: inherit;
  color: var(--color-accent);
  text-decoration: none;
  cursor: pointer;
}

.auth-action:hover {
  text-decoration: underline;
}
</style>
