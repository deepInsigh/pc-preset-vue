import { getPackTypeList } from './public';
import { useSetNotDictionaryData } from '@/hooks/useDictionary';
export async function getPublicApi(): Promise<void> {
  return new Promise(async resolve => {
    Promise.allSettled([getPackTypeList(), getPackTypeList()]).then(res => {
      useSetNotDictionaryData(res as PromiseFulfilledResult<any>[]);
      resolve();
    });
  });
}
