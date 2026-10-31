<script setup lang="ts">
import AppFooter from './components/layout/AppFooter.vue';

const appVersion = import.meta.env.VITE_APP_VERSION || 'local';
</script>

<template>
  <div class="app-container">
    <RouterView />
    <AppFooter :version="appVersion" />
  </div>
</template>

<style scoped>
.app-container {
  max-width: 1200px;
  margin: 0 auto;
  /* Extra bottom space so the floating button never covers content */
  padding: clamp(2rem, 6vw, 4rem) clamp(1rem, 4vw, 2rem) 7rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
}
</style>
