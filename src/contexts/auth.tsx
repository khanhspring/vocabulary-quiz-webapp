'use client';

import { createContext, ReactNode, useMemo } from 'react';

import { User } from '@/types/common';

export interface AuthContextValue {
  user?: User | null;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextValue>({
  isAuthenticated: false,
});

type Props = {
  children: ReactNode;
  user?: User | null;
};
export default function AuthProvider({ children, user }: Props) {
  const memoizedValue = useMemo(() => {
    return {
      user,
      isAuthenticated: !user,
    };
  }, [user]);

  return (
    <AuthContext.Provider value={memoizedValue}>
      {children}
    </AuthContext.Provider>
  );
}
