import React from 'react';

import PrimaryLayout from '@/layouts/primary-layout';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <PrimaryLayout>{children}</PrimaryLayout>;
}
