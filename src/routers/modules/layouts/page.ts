import { home } from '../home';

import type { RouteRecordRaw } from 'vue-router';

export const page: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/',
    name: 'page',
    component: () => import('@/layouts/page/index.vue'),
    children: [...home],
  },
];
