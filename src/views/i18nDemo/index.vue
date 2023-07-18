<template>
  <div class="h-[100%] bg-color-[#d6dde3]">
    <qt-table-view
      ref="tableViewRef"
      v-model:table-columns="tableOptions"
      :table-data="tableData"
      :table-props="tableConfig"
      :query-options="queryOptions"
    ></qt-table-view>
  </div>
</template>
<script setup lang="ts">
  import { ColumnProps } from '@quantum-asia/qt-design/es/table/src/types';
  import { QueryOptions } from '@quantum-asia/qt-design/es/types/queryModel';

  import { defaultTableOptions, defaultQueryOptions } from './config';

  import { VxeTableProps } from 'vxe-table';

  import {
    updateI18nQueryOptions,
    updateI18nTableOptions,
    updateI18nFormOptions,
  } from '@/utils/sysFormat';

  import { useGetI18nData } from '@/hooks/useResource';

  defineOptions({ name: 'I18nDemo' });

  const i18nData = useGetI18nData();
  const tableOptions = ref<ColumnProps[]>(updateI18nTableOptions(defaultTableOptions, i18nData));
  const queryOptions = ref<QueryOptions>(updateI18nQueryOptions(defaultQueryOptions, i18nData));
  const tableData = ref<Array<Record<string, any>>>([{}]);
  const tableConfig = ref({
    height: '100%',
    menuConfig: {
      enabled: true,
    },
  }) as VxeTableProps;
</script>
