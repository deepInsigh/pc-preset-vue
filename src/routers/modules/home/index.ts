import type { RouteRecordRaw } from 'vue-router';

export const home: RouteRecordRaw[] = [
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/home/index.vue'),
    meta: {
      affix: true,
    },
  },
];
