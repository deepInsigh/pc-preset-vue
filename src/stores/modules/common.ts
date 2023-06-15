import { defineStore } from 'pinia';
import type { NavTab } from '@/hooks/useNavTabs/types';
export interface CommonState {
  token: string;
  navTabs: NavTab[];
}

export const useCommonStore = defineStore('common', {
  state: (): CommonState => {
    return {
      token: '',
      navTabs: [],
    };
  },
  persist: {
    key: 'pc-template',
    storage: window.localStorage,
  },
});
