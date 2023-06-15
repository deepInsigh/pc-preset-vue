import { getData, saveData } from '@/utils/idb/index';

const globalDataDictionary = ref<Record<string, any>>();
export function useSetDictionary(list: PromiseFulfilledResult<any>[]): void {
  const data = list.find(({ value }) => value?.keyValuePairs)?.value;
  if (data) {
    const { version, keyValuePairs } = data;
    saveData({ id: 'admin', version, keyValuePairs });
  }
}

export async function useGetIDBDictionary() {
  const { keyValuePairs } = await getData('admin');
  globalDataDictionary.value = keyValuePairs;
}

export function useGetDictionary() {
  return unref(globalDataDictionary);
}
