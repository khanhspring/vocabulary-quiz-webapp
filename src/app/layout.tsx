import React from 'react';
import type { Metadata } from 'next';

import ThemeProvider from '@/components/providers/ThemeProvider';
import TokenProvider from '@/components/providers/TokenProvider';
import AuthProvider from '@/contexts/auth';
import { getAccessToken, getCurrentUser } from '@/lib/utils/server';

import './globals.css';

export const metadata: Metadata = {
  title: 'Vocabulary Quiz',
  description: 'Real time vocabulary quiz',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUser();
  const accessToken = await getAccessToken();

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AuthProvider user={user}>
          <TokenProvider accessToken={accessToken}>
            <ThemeProvider attribute="class" defaultTheme="light">
              {children}
            </ThemeProvider>
          </TokenProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
