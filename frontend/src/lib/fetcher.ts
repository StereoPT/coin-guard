import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { GetServerSidePropsContext } from 'next';

export const clientAxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const serverAxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Origin: process.env.NEXT_PUBLIC_BASE_URL,
    Referer: process.env.NEXT_PUBLIC_BASE_URL,
  },
});

export type FetcherOptions<TVariables = unknown> =
  AxiosRequestConfig<TVariables> &
    (
      | {
          instance?: 'client' | 'server' | AxiosInstance;
          req?: never;
        }
      | {
          instance?: 'server';
          req?: GetServerSidePropsContext['req'];
        }
    );

export const fetcher = async <TData, TVariables = unknown>(
  url: string,
  config?: FetcherOptions<TVariables>,
) => {
  const { req, instance, ...axiosConfig } = config ?? {};
  const isSSR = typeof window === 'undefined';

  let axiosInstance = clientAxiosInstance;
  if (instance === 'client' || (!instance && !isSSR)) {
    axiosInstance = clientAxiosInstance;
  } else if (instance === 'server' || (!instance && (req || isSSR))) {
    axiosInstance = serverAxiosInstance;
  } else if (instance) {
    axiosInstance = instance;
  } else {
    throw new Error('Invalid axios instance!');
  }

  const { data } = await axiosInstance(url, axiosConfig);
  return data as TData;
};
