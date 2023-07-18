import { CommonState, useCommonStore } from '@/stores/modules/common';
import { QueryOptions } from '@quantum-asia/qt-design/es/types/queryModel';
import type { VxeColumnProps } from 'vxe-table';
import {
  FormDateOption,
  FormInputNumberOption,
  FormInputUnitOption,
  FormList,
} from '@quantum-asia/qt-design/es/form/src/types';
import { cloneDeep, snakeCase, camelCase, upperCase } from 'lodash-es';
import { ColumnProps } from '@quantum-asia/qt-design/es/table/src/types';
import { ResourceData } from '@/hooks/useResource/type';
export type DateDigitFields = {
  dates: string[];
  precisions: string[];
};
export type DateDigitObject = {
  [key: string]: 'yyyy-MM-dd' | 'yyyy-MM-dd HH:mm:ss' | 'yyyy-MM-dd HH:mm' | string;
};

export const transformSnakeCase = (field: string) => {
  let result = snakeCase(field).toUpperCase();
  const index = result.lastIndexOf('_');
  const lastPart = result.slice(index + 1);
  const isNumber = /^\d+$/.test(lastPart);
  isNumber && (result = result.slice(0, index) + lastPart);
  return result;
};
/**
 * 合并表格列配置，将默认配置和远程配置合并为一个数组
 * @param defaultTableOptions 默认的表格列配置
 * @param remoteTableOptions 远程获取到的表格列配置
 * @returns 合并后的表格列配置
 */
export const mergeTableOptions = (
  defaultTableOptions: ColumnProps[],
  remoteTableOptions: ColumnProps[],
): ColumnProps[] => {
  if (defaultTableOptions.length > remoteTableOptions.length) {
    defaultTableOptions.forEach(v => {
      if (!remoteTableOptions.some(vv => vv.field === v.field)) {
        remoteTableOptions.push(v);
      }
      if (!remoteTableOptions.some(vv => vv.type === v.type)) {
        remoteTableOptions.push(v);
      }
    });
  } else if (defaultTableOptions.length < remoteTableOptions.length) {
    for (const option of remoteTableOptions) {
      const matchOption = defaultTableOptions.find(v => v.field === option.field);
      if (!matchOption) {
        const index = remoteTableOptions.findIndex(vv => vv.field === option.field);
        remoteTableOptions.splice(index, 1);
      }
    }
  }
  return remoteTableOptions;
};
// 根据配置生成新的tableOptions和新的queryOptions
export const updateI18nTableOptions = (
  tableOptions: ColumnProps[],
  i18nData: Record<string, any>[],
): ColumnProps[] => {
  return tableOptions.map(v => {
    if (v.field) {
      const foundData = i18nData.find(
        item =>
          item.key === transformSnakeCase(v.field as string).toUpperCase() ||
          item.key === camelCase(v.field).toUpperCase(),
      );

      foundData && (v.title = foundData.value);
    }
    return v;
  });
};

export const updateI18nQueryOptions = (
  queryOptions: QueryOptions,
  i18nData: Record<string, any>[],
): QueryOptions => {
  return queryOptions.map(v => {
    const foundData = i18nData.find(
      item =>
        item.key === transformSnakeCase(v.field as string).toUpperCase() ||
        item.key === camelCase(v.field).toUpperCase(),
    );

    foundData && (v.label = foundData.value);
    return v;
  });
};
export const updateI18nFormOptions = (formList: FormList, i18nData: ResourceData[]): FormList => {
  return formList.map(v => {
    const foundData = i18nData.find(item => {
      if (
        item.key === transformSnakeCase(v.field as string).toUpperCase() ||
        item.key === camelCase(v.field).toUpperCase()
      ) {
        return item;
      }
    });
    foundData && (v.label = foundData.value);
    console.log('v:', v);
    return v;
  });
};

export const getDateDigitFields = (dateDigitObj: DateDigitObject): DateDigitFields => {
  const dates: string[] = [];
  const precisions: string[] = [];
  for (const [key, value] of Object.entries(dateDigitObj)) {
    /^yyyy-MM-dd/.test(value) ? dates.push(key) : precisions.push(key);
  }
  return { dates, precisions };
};

export const updateDateDigitFormOptions = (
  formList: FormList,
  params: DateDigitObject,
): FormList => {
  const clonedFormList = cloneDeep(formList);
  const { dates, precisions } = getDateDigitFields(params);
  dates.forEach(field => {
    const formItem = clonedFormList.find(v => v.field === field) as FormDateOption;
    if (formItem) {
      const isDateFormat = (format: string): boolean => /^yyyy-MM-dd/.test(format);
      formItem.type = isDateFormat(params[field]) ? 'date' : 'datetime';
      formItem.format = params[field];
    }
  });
  precisions.forEach(field => {
    const formItem = clonedFormList.find(v => v.field === field) as
      | FormInputUnitOption
      | FormInputNumberOption;
    formItem && (formItem.precision = Number(params[field]));
  });
  return clonedFormList;
};
/**
 * 更新数字表格列的精度
 * @param tableOptions 数字表格列的配置数组
 * @param params 包含数值精度信息的对象
 */
export const updateDigitTableColumns = (tableOptions: ColumnProps[], params: DateDigitObject) => {
  const { precisions } = getDateDigitFields(params);
  precisions.forEach(field => {
    const column = tableOptions.find(v => v.field === field) as ColumnProps;
    if (column && column?.params?.precision) {
      column.params.precision = Number(params[field]);
    }
  });
};

// export const getSysFormatObj = (key: keyof CommonState['sysFormatObj']): DateDigitObject => {
//   return useCommonStore().getSysFormatObj(key);
// };

// export const setSysFormatObj = (key: string, value: DateDigitObject) => {
//   useCommonStore().setSysFormatObj(key, value);
// };
