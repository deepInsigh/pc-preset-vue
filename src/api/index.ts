import { getDictionaries } from './public';
import { useSetDictionary } from '@/hooks/useDictionary';
import type { SelectOptions } from '@/hooks/useDictionary/types';
export async function getPublicApi(): Promise<void> {
  return new Promise(async resolve => {
    Promise.allSettled([getDictionaries()]).then(res => {
      useSetDictionary(res as PromiseFulfilledResult<SelectOptions>[]);
      resolve();
    });
  });
}
