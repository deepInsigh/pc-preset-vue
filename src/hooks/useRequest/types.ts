import type { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

export type BaseApiResponse<T> = {
  flag: boolean;
  errorMessage: string;
  data: T;
  errorCode: string;
};

export interface RequestOptions {
  globalSuccessMessage?: boolean;
  globalErrorMessage?: boolean;
  globalCheckToken?: boolean;
  globalLoading?: boolean;
  globalRawData?: boolean;
}

export interface ExpandAxiosRequestConfig<D = any> extends AxiosRequestConfig<D> {
  interceptorHooks?: InterceptorHooks;
  requestOptions?: RequestOptions;
}

export interface ExpandInternalAxiosRequestConfig<D = any> extends InternalAxiosRequestConfig<D> {
  interceptorHooks?: InterceptorHooks;
  requestOptions?: RequestOptions;
}

export interface ExpandAxiosResponse<T = any, D = any> extends AxiosResponse<T, D> {
  config: ExpandInternalAxiosRequestConfig<D>;
}

export interface InterceptorHooks {
  requestInterceptor?: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig;
  requestInterceptorCatch?: (error: any) => any;
  responseInterceptor?: (response: AxiosResponse) => AxiosResponse | Promise<AxiosResponse>;
  responseInterceptorCatch?: (error: any) => any;
}
