<script setup lang="ts">
import { computed } from 'vue';
import AppHeader from '../components/layout/AppHeader.vue';
import SearchBar from '../components/search/SearchBar.vue';
import LinkGrid from '../components/links/LinkGrid.vue';
import LoadingState from '../components/states/LoadingState.vue';
import ErrorState from '../components/states/ErrorState.vue';
import EmptyState from '../components/states/EmptyState.vue';
import AlertBanner from '../components/common/AlertBanner.vue';
import FloatingActionButton from '../components/common/FloatingActionButton.vue';
import IconPlus from '../components/icons/IconPlus.vue';
import { useLinks } from '../composables/useLinks';
import { useLinkSearch } from '../composables/useLinkSearch';
import { useAuth } from '../composables/useAuth';

const { links, loading, error, actionError, loadLinks, reorder, clearActionError } = useLinks();
const { searchQuery, filteredLinks } = useLinkSearch(links);
const { canEdit } = useAuth();

// Reordering a filtered subset is ambiguous, so drag is off while searching.
const sortable = computed(() => canEdit.value && !searchQuery.value.trim());
</script>

<template>
  <AppHeader
    title="Intat's Hub"
    subtitle="A curated list of useful resources. Click any item to open in a new tab."
  >
    <SearchBar
      v-model="searchQuery"
      placeholder="Search by name or URL..."
    />
  </AppHeader>

  <main class="home-main">
    <AlertBanner
      v-if="actionError"
      :message="actionError"
      @dismiss="clearActionError"
    />
    <LoadingState v-if="loading" />
    <ErrorState
      v-else-if="error"
      :message="error"
      @retry="loadLinks"
    />
    <EmptyState
      v-else-if="filteredLinks.length === 0"
      :query="searchQuery"
    />
    <LinkGrid
      v-else
      :links="filteredLinks"
      :editable="canEdit"
      :sortable="sortable"
      @reorder="reorder"
    />
  </main>

  <FloatingActionButton
    v-if="canEdit"
    :to="{ name: 'link-create' }"
    label="Add item"
  >
    <IconPlus />
  </FloatingActionButton>
</template>

<style scoped>
.home-main {
  width: 100%;
}
</style>
