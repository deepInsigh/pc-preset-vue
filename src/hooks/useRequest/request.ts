import axios from 'axios';
import type { AxiosInstance } from 'axios';
import { InterceptorHooks, ExpandAxiosRequestConfig } from './types';

export default class Request {
  private _instance: AxiosInstance;
  private _defaultConfig: ExpandAxiosRequestConfig = {
    baseURL: import.meta.env.PROD ? `//${location.host}` : '',
    timeout: 5000,
    requestOptions: {
      globalMessage: false,
      globalCheckToken: true,
      globalLoading: true,
      globalRawData: false,
    },
  };
  private _interceptorHooks?: InterceptorHooks;

  constructor(config: ExpandAxiosRequestConfig) {
    this._instance = axios.create(Object.assign(this._defaultConfig, config));
    this._interceptorHooks = config.interceptorHooks;
    this.setupInterceptors();
  }

  private setupInterceptors() {
    this._instance.interceptors.request.use(
      this._interceptorHooks?.requestInterceptor,
      this._interceptorHooks?.requestInterceptorCatch,
    );
    this._instance.interceptors.response.use(
      this._interceptorHooks?.responseInterceptor,
      this._interceptorHooks?.responseInterceptorCatch,
    );
  }

  public get<T = any>(url: string, config?: ExpandAxiosRequestConfig): Promise<T> {
    return this._instance.get(url, config);
  }

  public post<T = any>(url: string, data?: any, config?: ExpandAxiosRequestConfig): Promise<T> {
    return this._instance.post(url, data, config);
  }
}
