import { AxiosError } from 'axios';
import useSWR, { Key, SWRConfiguration } from 'swr';

import { fetcher } from '@/lib/utils/client/rest-client';

export interface Config<Data = unknown, Error = unknown>
  extends Omit<SWRConfiguration<Data, AxiosError<Error>>, 'fallbackData'> {}

export function useRequest<Data = unknown, Error = unknown>(
  url?: Key,
  { ...config }: Config<Data, Error> = {},
) {
  return useSWR<Data, AxiosError<Error>>(url, fetcher, config);
}
