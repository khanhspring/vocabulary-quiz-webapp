'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import apis from '@/lib/apis';
import { useQuizSession } from '@/lib/hooks';

import Leaderboard from './components/Leaderboard';

export default function SessionDetailPage() {
  const params = useParams<{ code: string }>();
  const { data, mutate } = useQuizSession({ code: params.code });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  if (!data) {
    return (
      <div className="container m-auto py-10">
        <p>Loading...</p>
      </div>
    );
  }

  const handleRequestToJoin = async () => {
    setLoading(true);
    apis.quizRegistration
      .register({ sessionCode: params.code })
      .then(async () => {
        await mutate();
        router.push(`/sessions/${params.code}/quiz`);
      })
      .finally(() => setLoading(false));
  };

  const requestToJoin = !data.joined && data.status === 'Ready';
  const isContinue =
    data.joined &&
    ['Ready', 'InProgress', 'ScheduledToStart'].includes(data.status);

  return (
    <div className="container m-auto py-10">
      <div>
        <span className="block font-bold text-xl">#{data.code}</span>
        <h2 className="font-bold">{data.title}</h2>
        <p>Status: {data.status}</p>
        <div className="mt-3">
          {requestToJoin && (
            <Button onClick={handleRequestToJoin} disabled={loading}>
              Request to join
            </Button>
          )}
          {isContinue && (
            <Button asChild>
              <Link href={`/sessions/${params.code}/quiz`}>Continue</Link>
            </Button>
          )}
        </div>
      </div>
      {data.status === 'Completed' && (
        <div className="mt-5 grid gap-5">
          <h3 className="font-bold text-lg">Leaderboard</h3>
          <Leaderboard />
        </div>
      )}
    </div>
  );
}
