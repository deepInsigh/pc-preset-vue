import { useCommonStore } from '@/stores/modules/common';
import { router } from '@/routers';
import type { Ref } from 'vue';
import type { RouteLocationNormalizedLoaded } from 'vue-router';
import type { NavTab } from './types';

const routeTitle = {
  home: '工作台',
};
const whitePath: string[] = ['Redirect', '/login'];
const whiteName: string[] = ['login', 'error404'];
const activedNav = ref<Nullable<NavTab>>(null);

export function useSetNavTabs(navTabs: NavTab[]): void {
  useCommonStore().$patch({ navTabs });
}

export function useGetNavTabs(): NavTab[] {
  return useCommonStore().navTabs;
}

export function useSetActivedTab(tab: NavTab): void {
  activedNav.value = tab;
}

export function useGetActivedTab(): Ref<Nullable<NavTab>> {
  return activedNav;
}

export function useAddTabs(route: RouteLocationNormalizedLoaded): void {
  const routeOtherInfo = router.getRoutes().find(v => v.name === route.name);
  const navList = useGetNavTabs();
  const findWhitePath: boolean =
    whitePath.includes(route.path) || whiteName.includes(route.name as string);

  if (findWhitePath) return;

  const isExists: boolean = navList.some((item: NavTab) => item.options.path == route.path);

  if (!isExists) {
    navList.push({
      name: routeTitle[route.name as string],
      closable: !route.meta?.affix as boolean,
      options: {
        fullPath: route.fullPath,
        path: route.path,
        key: route.name as string,
        compName: routeOtherInfo?.components?.default?.name ?? '',
      },
    });
    useSetNavTabs(navList);
  }

  activedNav.value = unref(navList).find(
    (item: NavTab): boolean => item.options.path === route.path,
  );
}
