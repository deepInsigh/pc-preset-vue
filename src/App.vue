<template>
  <n-config-provider :locale="zhCN" :date-locale="dateZhCN">
    <n-loading-bar-provider>
      <n-message-provider>
        <n-dialog-provider>
          <n-notification-provider>
            <router-view v-slot="{ Component }">
              <n-spin :show="getShowLoading">
                <component :is="Component" />
                <template #description>加载中....</template>
              </n-spin>
            </router-view>
          </n-notification-provider>
        </n-dialog-provider>
      </n-message-provider>
    </n-loading-bar-provider>
  </n-config-provider>
</template>

<script setup lang="ts">
  import { zhCN, dateZhCN } from 'naive-ui';
  import { useGetLoading } from '@/hooks/useLoading';

  const getShowLoading = useGetLoading();
</script>
