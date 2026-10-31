<script setup lang="ts">
import AppHeader from './components/layout/AppHeader.vue';
import AppFooter from './components/layout/AppFooter.vue';
import SearchBar from './components/search/SearchBar.vue';
import LinkGrid from './components/links/LinkGrid.vue';
import LoadingState from './components/states/LoadingState.vue';
import ErrorState from './components/states/ErrorState.vue';
import EmptyState from './components/states/EmptyState.vue';
import { useLinks } from './composables/useLinks';
import { useLinkSearch } from './composables/useLinkSearch';

const appVersion = import.meta.env.VITE_APP_VERSION || 'local';

const { links, loading, error, fetchLinks } = useLinks();
const { searchQuery, filteredLinks } = useLinkSearch(links);
</script>

<template>
  <div class="app-container">
    <AppHeader
      title="Intat's Hub"
      subtitle="A curated list of useful resources. Click any item to open in a new tab."
    >
      <SearchBar
        v-model="searchQuery"
        placeholder="Search by name or URL..."
      />
    </AppHeader>

    <main class="app-main">
      <LoadingState v-if="loading" />
      <ErrorState
        v-else-if="error"
        :message="error"
        @retry="fetchLinks"
      />
      <EmptyState
        v-else-if="filteredLinks.length === 0"
        :query="searchQuery"
      />
      <LinkGrid
        v-else
        :links="filteredLinks"
      />
    </main>

    <AppFooter :version="appVersion" />
  </div>
</template>

<style scoped>
.app-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
}

.app-main {
  width: 100%;
}
</style>
