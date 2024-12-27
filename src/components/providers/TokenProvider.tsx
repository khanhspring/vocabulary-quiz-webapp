'use client';

import { ReactNode } from 'react';

import { setAccessToken } from '@/lib/utils/client/rest-client';

type Props = {
  accessToken?: string;
  children: ReactNode;
};

export default function TokenProvider({ children, accessToken }: Props) {
  setAccessToken(accessToken);
  return <>{children}</>;
}
