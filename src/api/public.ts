import { getAll } from '@/utils/idb/idb';
import { get } from '@/hooks/useRequest';
import type { SelectOption, SelectOptions } from '@/hooks/useDictionary/types';

// 获取私有字典
export async function getPrivateSyscode() {
  return await getAll('privateSyscode');
}

export async function getUserInfo() {
  const data = await get('/SCM.RoleManage.OpenApi/v2/UserSvc/GetLoginUser', {
    requestOptions: {
      globalLoading: false,
      globalErrorMessage: false,
      globalCheckToken: true,
    },
  });
  const list: SelectOptions = data.allDomain.map((v): SelectOption => {
    return {
      label: v,
      value: v,
    };
  });
  return { domainDict: list };
}
