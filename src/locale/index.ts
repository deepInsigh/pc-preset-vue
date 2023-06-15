import { createI18n } from 'vue-i18n';
import zhCN from './lang/zh-CN';

const messages = {
  zh_CN: zhCN,
};

const i18n = createI18n({
  globalInjection: true,
  locale: 'zh_CN',
  legacy: false,
  messages,
});

export { i18n };
