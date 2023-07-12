<template>
  <div class="flex flex-col w-[100vw] h-[100vh]">
    <nav-tabs />
    <div class="h-full px-10px overflow-x-hidden">
      <router-view v-slot="{ Component: component }" :key="key">
        <keep-alive :max="8" :include="keepList">
          <component :is="component" />
        </keep-alive>
      </router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
  import NavTabs from './navTabs.vue';
  import { useGetNavTabs } from '@/hooks/useNavTabs';

  const route = useRoute();
  const key = route.path;
  const keepList = ref<string[]>([]);

  watchEffect(() => {
    keepList.value = unref(useGetNavTabs()).map(tab => tab.options.compName);
  });
</script>
