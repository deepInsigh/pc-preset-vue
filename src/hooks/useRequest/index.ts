import Request from './request';
import { transform } from './service';
import { ExpandAxiosRequestConfig } from './types';

const request = new Request({
  interceptorHooks: transform,
});

export function post(url: string, data?: any, config?: ExpandAxiosRequestConfig) {
  return request.post(url, data, config);
}

export function get(url: string, config?: ExpandAxiosRequestConfig) {
  return request.get(url, config);
}
