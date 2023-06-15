import { useCommonStore } from '@/stores/modules/common';
import { router } from '@/routers';

export const checkout = async (): Promise<void> => {
  useCommonStore().$reset();
  router.replace('/login');
};

export const checkToken = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (!getToken()) {
      checkout();
      reject('登录失效，请重新登录');
    } else {
      resolve();
    }
  });
};

export const getToken = (): string => {
  return useCommonStore().token;
};

export const setToken = (token: string): void => {
  if (token) {
    useCommonStore().$patch({
      token,
    });
  } else {
    router.replace('/login');
  }
};
