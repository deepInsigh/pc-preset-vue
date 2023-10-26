const globalDataDictionary = ref<Record<string, any>>();
export function useSetDictionary(list: PromiseFulfilledResult<any>[]): void {
  globalDataDictionary.value = list;
}

export function useGetDictionary() {
  return unref(globalDataDictionary);
}
