import { createApp } from 'vue';
import { VXETable, Menu, Tooltip } from 'vxe-table';
import { router } from '@/routers';
import { store } from '@/stores';
import { i18n } from '@/locale';
import { setToken } from '@/utils/auth';
import { setLang } from '@/utils/lang';
import { getPublicApi } from '@/api';
import { setGlobalEnv } from '@quantum-asia/qt-design/es/utils/legacy';

import App from './App.vue';
import 'virtual:uno.css';
import '@/styles/index.scss';

async function bootstrap(): Promise<void> {
  const app = createApp(App);

  app.use(router).use(store).use(i18n).use(Menu).use(Tooltip);

  if (import.meta.env.PROD) {
    await setToken(window.localStorage.getItem('SSID')!);

    await setLang(window.localStorage.getItem('Language')!);
  }
  await getPublicApi();
  // /dswl.wms.fe/# 外挂部署项目地址
  await setGlobalEnv({ env: import.meta.env.VITE_NODE_ENV, directory: '/dswl.wms.fe/#', router });

  await router.isReady();

  app.mount('#app', true);

  app.config.errorHandler = (err: Error) => {
    console.log(err);
  };
}

async function useVxeTable(): Promise<void> {
  VXETable.setup({
    //@ts-ignore
    i18n: (key, args) => i18n.global.t(key, args),
  });
}

bootstrap();
useVxeTable();
