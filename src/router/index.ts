import { createRouter, createWebHashHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import { initAuth, useAuth } from '../composables/useAuth';
import { supabase } from '../lib/supabase';

declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth?: boolean;
  }
}

// Hash history: GitHub Pages has no SPA fallback, so /#/links/new survives a refresh.
export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    {
      path: '/links/new',
      name: 'link-create',
      component: () => import('../views/LinkCreateView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/links/:id/edit',
      name: 'link-edit',
      component: () => import('../views/LinkEditView.vue'),
      props: true,
      meta: { requiresAuth: true },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
      beforeEnter: () => (supabase ? true : { name: 'home' }),
    },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
  scrollBehavior: () => ({ top: 0 }),
});

router.beforeEach(async (to) => {
  if (!to.meta.requiresAuth) return true;
  await initAuth();
  if (useAuth().canEdit.value) return true;
  return { name: 'login', query: { redirect: to.fullPath } };
});
