import axios, { AxiosRequestConfig, Method } from 'axios';

export async function request<T>(
  url: string,
  method: Method = 'GET',
  options?: AxiosRequestConfig
): Promise<T> {
  return (await axios.request<T>({ url, method, ...options })).data;
}

export class HttpClient {
  get = <T>(path: string, options?: AxiosRequestConfig): Promise<T> => {
    return request<T>(path, 'GET', options);
  };
}

const http = new HttpClient();

export default http;
