import { createApp } from 'vue';
import { VXETable, Menu, Tooltip } from 'vxe-table';
import { router } from '@/routers';
import { store } from '@/stores';
import { i18n } from '@/locale';
import { setToken } from '@/utils/auth';
import { getPublicApi } from '@/api';
import { useGetIDBDictionary } from '@/hooks/useDictionary';
import App from './App.vue';
import 'virtual:uno.css';
import '@/styles/index.scss';

async function bootstrap(): Promise<void> {
  const app = createApp(App);
  app.use(router).use(store).use(i18n).use(Menu).use(Tooltip);
  await router.isReady();
  app.mount('#app', true);
}

async function useVxeTable(): Promise<void> {
  if (import.meta.env.PROD) {
    await setToken(window.localStorage.getItem('SSID')!);
  }
  await getPublicApi();
  await useGetIDBDictionary();

  VXETable.setup({
    //@ts-ignore
    i18n: (key, args) => i18n.global.t(key, args),
  });
}

bootstrap();
useVxeTable();