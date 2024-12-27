'use client';

import Link from 'next/link';

import useAuth from '@/lib/hooks/common/auth';

export default function Header() {
  const { user } = useAuth();

  return (
    <header className="border-grid sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container m-auto h-16 flex items-center justify-between">
        <Link href="/">
          <h1 className="font-bold text-xl leading-tight">Quiz</h1>
        </Link>
        <span>
          {user?.firstName} {user?.lastName}
        </span>
      </div>
    </header>
  );
}
