import { useCommonStore } from '@/stores/modules/common';

export const getLang = (): string => {
  return useCommonStore().lang;
};

export const setLang = (lang: string): void => {
  if (!lang) return;
  useCommonStore().$patch({ lang });
};
