import { createDiscreteApi } from 'naive-ui';
import { InterceptorHooks, ExpandAxiosResponse, BaseApiResponse, RequestOptions } from './types';
import { getToken, checkout, checkToken } from '@/utils/auth';
import { useSetLoading } from '@/hooks/useLoading';

const { notification } = createDiscreteApi(['notification']);

export const transform: InterceptorHooks = {
  requestInterceptor(config) {
    const options = config['requestOptions'] as RequestOptions;

    if (options?.globalLoading) {
      useSetLoading(true);
    }
    if (options?.globalCheckToken) {
      checkToken()
        .then(() => {
          config!.headers!.Authorization = 'Token';
          config!.headers!.Token = getToken();
        })
        .catch(() => {
          checkout();
        });
    }
    return config;
  },
  requestInterceptorCatch(err) {
    useSetLoading(false);
    return Promise.reject(err);
  },
  responseInterceptor(result) {
    useSetLoading(false);

    const res = result as ExpandAxiosResponse;
    if (res.status !== 200) return Promise.reject(res);

    const data = res.data as BaseApiResponse<any>;
    if (!data.flag) {
      if (res.config.requestOptions?.globalErrorMessage) {
        notification.error({
          content: '提示',
          meta: data.errorMessage ?? '未知错误',
          duration: 3000,
        });
      }
      return Promise.reject(data);
    }
    if (res.config.requestOptions?.globalSuccessMessage) {
      notification.success({
        content: '提示',
        meta: data.errorMessage,
        duration: 3000,
      });
    }
    return data.data;
  },
  responseInterceptorCatch(err) {
    useSetLoading(false);
    const mapErrorStatus = new Map([
      [400, '发出的请求有错误'],
      [401, '登录失效，请重新登录'],
      [403, '服务器拒绝本次访问'],
      [404, '请求资源未找到'],
      [405, '请求方式不正确'],
      [406, '请求的格式不正确'],
      [500, '内部服务器错误'],
      [501, '服务器不支持该请求中使用的方法'],
      [502, '网关错误'],
      [503, '服务不可用'],
      [504, '网关超时'],
    ]);
    const message = mapErrorStatus.get(err.response.status) || '请求出错，请稍后再试';

    notification.error({
      content: '提示',
      meta: message,
      duration: 3000,
    });
    return Promise.reject(err.response);
  },
};