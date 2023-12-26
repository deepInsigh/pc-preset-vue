import { getPrivateSyscode, getUserInfo } from './public';
import { useSetDictionary } from '@/hooks/useDictionary';
export async function getPublicApi(): Promise<void> {
  return new Promise(async resolve => {
    Promise.allSettled([getPrivateSyscode(), getUserInfo()]).then(res => {
      useSetDictionary(res as PromiseFulfilledResult<any>[]);
      resolve();
    });
  });
}
