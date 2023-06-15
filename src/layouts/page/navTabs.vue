<template>
  <qt-tabs-view
    v-model:value="activedNavName"
    v-model:tabs="navList"
    @update:value="onUpdateValue"
    @close="handleClose"
    @contextmenu="onContextmenu"
  />
</template>

<script setup lang="ts">
  import {
    useSetNavTabs,
    useGetNavTabs,
    useSetActivedTab,
    useGetActivedTab,
    useAddTabs,
  } from '@/hooks/useNavTabs';
  import {
    useCloseCurrentTab,
    useCloseOtherTab,
    useCloseLeftTab,
    useCloseRightTab,
    useCloseAllTab,
  } from '@quantum-asia/qt-design/es/tabs-view/src/useTabsView';
  import type {
    OnUpdateValue,
    OnClose,
    OnContextMenu,
  } from '@quantum-asia/qt-design/es/tabs-view/src/types';
  import type { NavTab } from '@/hooks/useNavTabs/types';

  const router = useRouter();
  const route = useRoute();

  const navList = ref<NavTab[]>([]);
  const activedNavName = ref('');

  watch(
    () => route.fullPath,
    () => {
      useAddTabs(route);
    },
    { immediate: true },
  );

  watch(
    () => unref(navList),
    val => {
      useSetNavTabs(val);
    },
    { deep: true },
  );

  watchEffect((): void => {
    navList.value = useGetNavTabs();
    const activedTab = unref(useGetActivedTab());
    if (activedTab) {
      activedNavName.value = activedTab!.name;
    }
  });

  const onUpdateValue: OnUpdateValue = name => {
    const activedTab = unref(navList).find(item => item.name === name);

    if (activedTab) {
      useSetActivedTab(activedTab);
      router.replace(activedTab.options.fullPath);
    }
  };

  const handleClose: OnClose = tab => {
    useCloseCurrentTab(tab);
  };

  const onContextmenu: OnContextMenu = ({ event, tab }) => {
    switch (event) {
      case 'closeCurrent':
        useCloseCurrentTab(tab);
        break;
      case 'closeOther':
        useCloseOtherTab(tab);
        break;
      case 'closeLeft':
        useCloseLeftTab(tab);
        break;
      case 'closeRight':
        useCloseRightTab(tab);
        break;
      case 'closeAll':
        useCloseAllTab();
        break;
    }
  };
</script>
