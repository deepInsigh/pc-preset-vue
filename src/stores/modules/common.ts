import { defineStore } from 'pinia';
import type { NavTab } from '@/hooks/useNavTabs/types';
export interface CommonState {
  token: string;
  navTabs: NavTab[];
  lang: string;
}

export const useCommonStore = defineStore('common', {
  state: (): CommonState => {
    return {
      token: '',
      lang: 'zhCN',
      navTabs: [],
    };
  },
  persist: {
    key: 'pc-template',
    storage: window.localStorage,
  },
});
