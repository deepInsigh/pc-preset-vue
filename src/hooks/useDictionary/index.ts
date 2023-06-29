import { getData, saveData } from '@/utils/idb/index';

const globalDataDictionary = ref<Record<string, any>>();
export function useSetDictionary(list: PromiseFulfilledResult<any>[]): void {
  const data = list.find(({ value }) => value?.keyValuePairs)?.value;
  if (!data) return;
  const { version, keyValuePairs } = data;
  globalDataDictionary.value = keyValuePairs;
  saveData({ id: 'admin', version, keyValuePairs });
}

export async function useGetIDBDictionary() {
  const data = await getData('admin');
  globalDataDictionary.value = data?.keyValuePairs ?? globalDataDictionary;
}

export function useGetDictionary() {
  return unref(globalDataDictionary);
}
