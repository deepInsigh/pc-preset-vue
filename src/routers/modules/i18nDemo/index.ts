import type { RouteRecordRaw } from 'vue-router';

export const example: RouteRecordRaw[] = [
  {
    path: '/i18nDemo',
    name: 'i18nDemo',
    component: () => import('@/views/i18nDemo/index.vue'),
    meta: {
      affix: true,
    },
  },
];
