const dictionaryKeys = ['ChargeTypePSC'];

const dictionaryData = ref<Record<string, any>>({});
export function useSetDictionary(list: PromiseFulfilledResult<any>[]): void {
  const [privateDict, ...rest] = list;

  const filteredData = privateDict.value?.filter(item => dictionaryKeys.includes(item.key));
  const filteredObject = filteredData.reduce((acc, item) => {
    const transformedData = (item.value as any).map(item => ({
      label: item.codeName,
      value: item.codeID,
    }));
    acc[item.key] = transformedData;
    return acc;
  }, {});

  dictionaryData.value = {
    ...filteredObject,
    ...Object.assign({}, ...rest.map(v => v.value)),
  };
}

export const useGetDictionary = computed(() => {
  const data = unref(dictionaryData);
  if (!data || Object.keys(data).length === 0) {
    return {};
  }

  return {
    ...unref(dictionaryData),
    ...{
      TtemDangerous: [
        //固定私有字典
        {
          label: '是',
          value: '0',
        },
        {
          label: '否',
          value: '1',
        },
      ],
    },
  };
});
