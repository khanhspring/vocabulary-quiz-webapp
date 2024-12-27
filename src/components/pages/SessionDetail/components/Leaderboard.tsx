'use client';

import { useParams } from 'next/navigation';

import { useLeaderboard } from '@/lib/hooks';
import useAuth from '@/lib/hooks/common/auth';

export default function Leaderboard() {
  const params = useParams<{ code: string }>();
  const sessionCode = params.code;
  const { data } = useLeaderboard({ code: sessionCode });
  const { user } = useAuth();

  return (
    <div className="grid gap-2">
      {data?.members.map((item, index) => (
        <div
          className="grid grid-cols-leaderboard border rounded py-3"
          key={index}
        >
          <div className="flex items-center justify-center font-bold text-xl text-blue-600">
            #{index + 1}
          </div>
          <div className="flex items-center gap-2 font-bold">
            <span>{item.fullName}</span>
            {item.userId === user?.id && (
              <span className="font-light text-sm">(You)</span>
            )}
          </div>
          <div className="flex items-center justify-center font-bold text-xl text-gray-700">
            {item.receivedScore || 0}
          </div>
        </div>
      ))}
    </div>
  );
}
