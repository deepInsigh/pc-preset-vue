import {
  createRouter,
  createWebHashHistory,
  type RouteRecordRaw,
  type RouteLocationNormalized,
  type NavigationGuardNext,
  type RouteRecordNormalized,
} from 'vue-router';
import { page } from './modules/layouts/page';
import { checkToken } from '@/utils/auth';
import { useAddCacheRoute } from '@/hooks/useRouters';

export const routes: RouteRecordRaw[] = [
  ...page,
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  scrollBehavior: () => ({ top: 0 }),
  routes,
});

router.beforeEach(
  (
    to: RouteLocationNormalized,
    _from: RouteLocationNormalized,
    next: NavigationGuardNext,
  ): void => {
    const whiteList: string[] = ['login', 'error404'];
    const hasRoute: boolean = router
      .getRoutes()
      .some((route: RouteRecordNormalized) => route.path === to.path);

    useAddCacheRoute(router);

    if (whiteList.find(v => v === to.name)) {
      next();
    } else {
      checkToken().then(() => {
        if (hasRoute) {
          next();
        } else {
          next({ ...to, replace: true });
        }
      });
    }
  },
);

export { router };
