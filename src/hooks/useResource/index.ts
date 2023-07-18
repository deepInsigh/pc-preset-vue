import { getBatchDataByKeys, storeResourceTable } from '@/utils/idb';
import { transformSnakeCase } from '@/utils/sysFormat';
import { camelCase, compact, uniq } from 'lodash-es';
import { ResourceData } from './type';
import { ColumnProps } from '@quantum-asia/qt-design/es/table/src/types';
import { FormList, FormOptionGroup } from '@quantum-asia/qt-design/es/form/src/types';
import { defaultTableOptions } from '@/views/i18nDemo/config';
/*
  系统所有tableOptions 和formOptions集合
*/
const options = [
  defaultTableOptions,
  // tableOptions,
  // formOptions,
];
const globalI18nData = ref<ResourceData[]>([]);

const getSysAllFields = (): string[] => {
  const fields: string[] = [];
  options.forEach((option: ColumnProps[] | FormList) => {
    option.forEach((item: ColumnProps | FormOptionGroup) => {
      fields.push(transformSnakeCase(item.field as string).toUpperCase());
      fields.push(camelCase(item.field as string).toUpperCase());
    });
  });
  return uniq(compact(fields));
};

export async function useSetI18nData(): Promise<void> {
  const fields = getSysAllFields();
  const resourceData = await getBatchDataByKeys<ResourceData>(storeResourceTable, fields);
  globalI18nData.value = resourceData;
}

export function useGetI18nData(): ResourceData[] {
  return globalI18nData.value;
}
