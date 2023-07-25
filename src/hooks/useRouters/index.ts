import { cloneDeep } from 'lodash-es';
import Error from '@/views/error/404.vue';
import { useGetNavTabs, useSetNavTabs } from '@/hooks/useNavTabs';
import type { DefineComponent } from 'vue';
import type { Router } from 'vue-router';
import type { AddRoute } from './types';
import type { NavTab } from '@/hooks/useNavTabs/types';

export function useGetComponents(name): DefineComponent {
  const components = {
    //添加动态路由
  };
  return components[name] ? cloneDeep(components[name]) : Error;
}

export async function useAddRoute(router: Router, route: AddRoute) {
  const comp = useGetComponents(route.compName);
  comp.name = `${route.compName}-${route.compKey}`;

  router.addRoute('page', {
    name: route.name,
    path: route.path,
    component: comp,
  });
}

export function useAddCacheRoute(router: Router) {
  const cachenavTabs = useGetNavTabs();

  cachenavTabs.forEach((navTab: NavTab) => {
    if (navTab.name && !router.hasRoute(navTab.options.key)) {
      const compName = navTab.options.compName.split('-')[0];
      const compKey = navTab.options.compName.split('-')[1];
      useAddRoute(router, {
        name: navTab.options.key,
        path: navTab.options.path,
        compName: compName,
        compKey: compKey,
      });
    }
  });

  router.addRoute({
    path: '/:pathMatch(.*)*',
    name: 'error404',
    component: Error,
  });
}

export function useCloseCurrentRoute(name: String) {
  const navTabs = useGetNavTabs();
  const updatedNavTabs = navTabs.filter(navTab => navTab.options.key !== name);
  useSetNavTabs(updatedNavTabs);
}
