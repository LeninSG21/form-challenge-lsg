import axios, { AxiosRequestConfig } from 'axios';

const errorParser = (statusCode: number, statusText: string) => {
  if (statusCode >= 500) {
    return '[500] Something went wrong. Try again';
  }
  if (statusCode >= 400) {
    if (statusCode === 400) {
      return '[400] Bad request';
    }
    if (statusCode === 401) {
      return '[401] Unauthorized';
    }
  }
  return `[${statusCode}]: ${statusText}`;
};

export const abortController = new AbortController();

type RequesOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: unknown;
};

type RequestResponse<T> = {
  data: T;
  status: number;
};

const DEFAULT_REQUEST_OPTIONS: RequesOptions = {
  method: 'GET',
};

export async function request<T = undefined>(
  url: string,
  options?: RequesOptions,
): Promise<RequestResponse<T>> {
  const optionsWithDefault = { ...DEFAULT_REQUEST_OPTIONS, ...options };

  const instance = axios.create();
  const axiosOptions: AxiosRequestConfig = {
    url,
    method: optionsWithDefault.method,
    data: optionsWithDefault.body,
  };

  return instance
    .request<T>(axiosOptions)
    .then((response) => ({ data: response.data, status: response.status }))
    .catch((error) => {
      throw new Error(
        errorParser(error.response.status, error.response.statusText),
      );
    });
}
