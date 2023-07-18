import { getBatchDataByKeys, storePrivateSyscodeTable, storeResourceTable } from '@/utils/idb';
import type { Dict, SelectOptions } from './types';
import { compact, uniq } from 'lodash-es';
import { ResourceData } from '../useResource/type';

/*
  系统所有字典dictionaryKey集合
*/
const dictionaryKeys = [
  'CurrencyPSC',
  // 'PackageType',
  // 'TMTypePSC',
  // 'PackAdjustReason',
  // 'packType',
];

const dictionaryData = ref<Record<string, any>>({});
const notDictionaryData = ref<Record<string, any> | null>({});

const getSysDictAllFields = (dicts: Dict[]) => {
  const fields: string[] = [];
  dicts.forEach(dict => {
    dict.value.forEach(item => {
      if (item.resourceKey && item.resourceKey.length > 0) {
        fields.push(item.resourceKey.toUpperCase());
      }
    });
  });
  return uniq(compact(fields));
};

/*
  获取本系统所用到的字典，并根据idb里面resource资源把每一项的下拉框option进行国际化处理
*/
const getI18nDictionary = async (): Promise<Record<string, any>> => {
  const dicts = await getBatchDataByKeys<Dict>(storePrivateSyscodeTable, dictionaryKeys);
  const fields = getSysDictAllFields(dicts);
  const resourceData = await getBatchDataByKeys<ResourceData>(storeResourceTable, fields);
  dicts.forEach(dict => {
    dict.value.forEach(option => {
      const foundData = resourceData.find(
        item =>
          option.resourceKey &&
          option.resourceKey.length > 0 &&
          item.key === option.resourceKey.toUpperCase(),
      );
      foundData && (option.label = foundData.value);
    });
  });
  const dictMap: Record<string, any> = {};
  dicts.forEach(item => {
    dictMap[item.key] = item.value;
  });
  return dictMap;
};

export async function useSetDictionary(): Promise<void> {
  dictionaryData.value = await getI18nDictionary();
}

/*
  非字典数据取值，例如一些主数据，它们不在字典库中，必须通过接口获取来生成下拉框字典
*/
export async function useSetNotDictionaryData(list: PromiseFulfilledResult<any>[]): Promise<void> {
  notDictionaryData.value = {
    ...list[0].value,
  };
}

export function useGetDictionary(): Record<string, SelectOptions> | null {
  return { ...unref(dictionaryData), ...unref(notDictionaryData) };
}
