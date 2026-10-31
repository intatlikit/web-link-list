import { createRouter, createWebHashHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

// Hash history: GitHub Pages has no SPA fallback, so /#/links/new survives a refresh.
export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    {
      path: '/links/new',
      name: 'link-create',
      component: () => import('../views/LinkCreateView.vue'),
    },
    {
      path: '/links/:id/edit',
      name: 'link-edit',
      component: () => import('../views/LinkEditView.vue'),
      props: true,
    },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
  scrollBehavior: () => ({ top: 0 }),
});
