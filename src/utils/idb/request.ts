import axios, { type AxiosRequestConfig, type AxiosResponse } from 'axios';
import { set, get } from './idb';
import { checkout, getToken } from '@/utils/auth';

const language = 'zh-cn';
const httpConfig: AxiosRequestConfig = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Token',
    Token: getToken(),
  },
  timeout: 0,
  baseURL: import.meta.env.PROD ? `//${window.location.host}` : '',
};

const paramsSerializer = (params: Record<string, string>): string => {
  return Object.entries(params)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');
};

const getUdfResourceByLanguage = async (): Promise<any> => {
  const version = await get('sysSettings', 'udfResourceVersion');
  const res: AxiosResponse<any, any> = await axios.get(
    `/SCM.Cloud.OpenApi/v2/ResourceSvc/GetUdfResourceByLanguage?${paramsSerializer({
      language,
      resourceVersion: version?.value ?? '',
    })}`,
    {
      ...httpConfig,
      headers: {
        ...httpConfig.headers,
        Token: getToken(),
      },
    },
  );
  if (!version || res.data.data.isChanged) {
    await set('sysSettings', {
      key: 'udfResourceVersion',
      value: res.data.data.resourceVersion,
    });
  }

  res.data.data.dictName = 'udfResource';
  return res.data.data;
};

const getSysResourceByLanguage = async (): Promise<any> => {
  const version = await get('sysSettings', 'sysResourceVersion');
  const res: AxiosResponse<any, any> = await axios.get(
    `/SCM.Cloud.OpenApi/v2/ResourceSvc/GetSysResourceByLanguage?${paramsSerializer({
      language,
      resourceVersion: version?.value ?? '',
    })}`,
    {
      ...httpConfig,
      headers: {
        ...httpConfig.headers,
        Token: getToken(),
      },
    },
  );

  if (!version || res.data.data.isChanged) {
    await set('sysSettings', {
      key: 'sysResourceVersion',
      value: res.data.data.resourceVersion,
    });
  }

  res.data.data.dictName = 'sysResource';
  return res.data.data;
};

const getAllPrivateSyscodeWithVersion = async (): Promise<any> => {
  const version = await get('sysSettings', 'privateSyscodeVersion');
  const res: AxiosResponse<any, any> = await axios.get(
    `/SCM.Configration.OpenApi/v2/PrivateSyscodeSvc/GetAllPrivateSyscodeWithVersion?${paramsSerializer(
      {
        privateSyscodeVersion: version?.value ?? '',
      },
    )}`,
    {
      ...httpConfig,
      headers: {
        ...httpConfig.headers,
        Token: getToken(),
      },
    },
  );

  if (!version || res.data.data.isChanged) {
    await set('sysSettings', {
      key: 'privateSyscodeVersion',
      value: res.data.data.privateSyscodeVersion,
    });
  }

  res.data.data.dictName = 'privateSyscode';
  return res.data.data;
};

export const getAllResources = async (): Promise<Record<string, any>> => {
  const allResources: Record<string, any> = {};

  for await (const res of [
    getUdfResourceByLanguage(),
    getSysResourceByLanguage(),
    getAllPrivateSyscodeWithVersion(),
  ]) {
    if (['udfResource', 'sysResource', 'privateSyscode'].includes(res.dictName))
      allResources[res.dictName] = res;
  }
  return allResources;
};
