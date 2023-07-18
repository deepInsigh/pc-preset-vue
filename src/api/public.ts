import { SelectOption, SelectOptions } from '@/hooks/useDictionary/types';
import { get, post } from '@/hooks/useRequest';

const encodeQueryParams = params => {
  return Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    .join('&');
};

// 获取包装类型
export async function getPackTypeList(): Promise<Record<string, SelectOptions> | {}> {
  const data = await post(
    '/SCM.Configration.OpenApi/v2/PackageConvertSvc/GetList',
    {
      queryModel: {
        Items: [],
      },
      pageInfo: {
        currentPage: 0,
        pageSize: 9999,
        sortField: '',
        isGetTotalCount: true,
        totalCount: 0,
      },
    },
    {
      requestOptions: {
        globalLoading: false,
        globalMessage: false,
      },
    },
  );
  const list: SelectOptions = data.list.map((v): SelectOption => {
    return {
      label: v.packid,
      value: v.packgid,
    };
  });
  return { packType: list };
}

// 获取系统国际化配置
export async function getResource(resourceVersion = ''): Promise<Record<string, any> | null> {
  const language = window.localStorage.getItem('Language') ?? 'en-us'; //en-us
  // const resourceVersion = resourceVersion ?? '2023-06-05T08:55:53.5199547+08:00';
  try {
    const data = await get(
      `/SCM.Cloud.OpenApi/v2/ResourceSvc/GetResourceByLanguage?${encodeQueryParams({
        language,
        resourceVersion,
      })}`,
      {
        requestOptions: {
          globalLoading: false,
          globalMessage: false,
        },
      },
    );
    return data;
  } catch (error) {
    return null;
  }
}
// 获取私有字典
export async function getPrivateSyscode(
  privateSyscodeVersion = '',
): Promise<Record<string, any> | null> {
  // const resourceVersion = resourceVersion ?? '2023-06-05T08:55:53.5199547+08:00';
  try {
    const data = await get(
      `/SCM.Configration.OpenApi/v2/PrivateSyscodeSvc/GetAllPrivateSyscodeWithVersion?${encodeQueryParams(
        {
          privateSyscodeVersion,
        },
      )}`,
      {
        requestOptions: {
          globalLoading: false,
          globalMessage: false,
        },
      },
    );
    return data;
  } catch (error) {
    return null;
  }
}
