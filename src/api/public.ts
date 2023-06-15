import { get } from '@/hooks/useRequest';
import { getData } from '@/utils/idb/index';

//获取所有数据字典
export async function getDictionaries() {
  const data = await getData('1');
  const res = await get(
    `/SCM.Cloud.OpenApi/v2/TanantManageConvertValueSvc/GetConvertValueList?version='${data?.version}'`,
    {
      requestOptions: {
        globalLoading: false,
        globalErrorMessage: false,
      },
    },
  );

  for (const industries in res.keyValuePairs) {
    res.keyValuePairs[industries] = Object.entries(res.keyValuePairs[industries]).map(
      ([value, label]) => ({
        value,
        label,
      }),
    );
  }

  return res;
}
