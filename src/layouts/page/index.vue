<template>
  <div class="flex flex-col w-[100vw] h-[100vh]">
    <page-header />
    <nav-tabs />
    <div class="h-[calc(100%-108px)] px-10px overflow-x-hidden">
      <router-view v-slot="{ Component: component }" :key="key">
        <keep-alive :max="8" :include="keepList">
          <component :is="component" />
        </keep-alive>
      </router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
  import PageHeader from './header.vue';
  import NavTabs from './navTabs.vue';
  import { useGetNavTabs } from '@/hooks/useNavTabs';

  const route = useRoute();
  const key = route.path;
  const keepList = ref<string[]>([]);

  watchEffect(() => {
    keepList.value = unref(useGetNavTabs()).map(tab => tab.options.compName);
  });
</script>
