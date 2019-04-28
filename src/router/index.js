import Vue from 'vue';
import Router from 'vue-router';
import routes from './routes';

import { wait } from '@/lib/helpers';

Vue.use(Router);

const router = new Router({
  base: '/alumni-network/',
  routes,
  mode: 'history',
  scrollBehavior: (to, from, saved) => saved || { x: 0, y: 0 },
});

router.afterEach(async ({ hash }) => {
  if (hash) {
    await wait(350);
    const target = document.querySelector(hash);
    target && target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
});

export default router;
