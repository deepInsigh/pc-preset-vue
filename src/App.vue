<template>
  <n-config-provider :locale="locale" :date-locale="dateLocale">
    <n-loading-bar-provider>
      <n-message-provider>
        <n-dialog-provider>
          <n-notification-provider>
            <qt-provider :dictionary="useGetDictionary()" :locale="localeQt">
              <router-view v-slot="{ Component }">
                <n-spin :show="getShowLoading">
                  <component :is="Component" />
                  <template #description>加载中....</template>
                </n-spin>
              </router-view>
            </qt-provider>
          </n-notification-provider>
        </n-dialog-provider>
      </n-message-provider>
    </n-loading-bar-provider>
  </n-config-provider>
</template>

<script setup lang="ts">
  import { zhCN, dateZhCN, zhTW, dateZhTW, enUS, dateEnUS } from 'naive-ui';
  import { useGetLoading } from '@/hooks/useLoading';
  import { useGetDictionary } from '@/hooks/useDictionary';
  import { zhCN as qtZhCN } from '@quantum-asia/qt-design/es';
  import { getLang } from '@/utils/lang';

  const getShowLoading = useGetLoading();

  const memoizedLang = computed(getLang);

  const localeQt = computed(() => {
    return unref(memoizedLang) === 'zh_cn' ? qtZhCN : '';
  });

  const locale = computed(() => {
    return unref(memoizedLang) === 'zh_cn' ? zhCN : unref(memoizedLang) === 'zh_hk' ? zhTW : enUS;
  });

  const dateLocale = computed(() => {
    return unref(memoizedLang) === 'zh_cn'
      ? dateZhCN
      : unref(memoizedLang) === 'zh_hk'
      ? dateZhTW
      : dateEnUS;
  });
</script>
