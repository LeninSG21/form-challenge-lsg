/* global RequestInit */
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

const DEFAULT_REQUEST_OPTIONS: RequestInit = {
  method: 'GET',
  signal: abortController.signal,
};

export async function request<T = undefined>(
  url: string,
  options?: RequestInit,
): Promise<T> {
  const optionsWithDefault = { ...DEFAULT_REQUEST_OPTIONS, ...options };

  try {
    const response = await fetch(url, optionsWithDefault);
    if (response.ok) {
      return response.json();
    }
    throw new Error(errorParser(response.status, response.statusText));
  } catch (error: any) {
    if (error.name === 'AbortError') {
      console.info('aborted');
      return {} as T;
    }
    throw error;
  }
}
