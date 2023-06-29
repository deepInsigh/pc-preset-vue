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
  import { zhCN as qtZhCN, zhHK as qtZhTW, enUS as qtEnUS } from '@quantum-asia/qt-design/es';
  import { getLang } from '@/utils/lang';

  const getShowLoading = useGetLoading();

  const memoizedLang = computed(getLang);

  const localeQt = computed(() => {
    const lang = unref(memoizedLang);
    const localeMap = {
      en_us: qtEnUS,
      zh_hk: qtZhTW,
    };
    return localeMap[lang] || qtZhCN;
  });

  const locale = computed(() => {
    const lang = unref(memoizedLang);
    const localeMap = {
      en_us: enUS,
      zh_hk: zhTW,
    };
    return localeMap[lang] || zhCN;
  });

  const dateLocale = computed(() => {
    const lang = unref(memoizedLang);
    const locales = {
      en_us: dateEnUS,
      zh_hk: dateZhTW,
    };
    return locales[lang] || dateZhCN;
  });
</script>
