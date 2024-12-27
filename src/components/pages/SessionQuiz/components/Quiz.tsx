'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Client } from '@stomp/stompjs';
import { differenceInSeconds } from 'date-fns/differenceInSeconds';

import Countdown from '@/components/atoms/Countdown';
import { useQuizSession } from '@/lib/hooks';
import { QuizSessionStatus, QuizSessionStatusMessage } from '@/types/responses';

import RealtimeLeaderboard from './RealtimeLeaderboard';
import VocabularyQuiz from './VocabularyQuiz';
import Waiting from './Waiting';

export default function Quiz() {
  const params = useParams<{ code: string }>();
  const sessionCode = params.code;
  const { data } = useQuizSession({ code: sessionCode });
  const [latestStatus, setLatestStatus] = useState<QuizSessionStatus>();
  const router = useRouter();

  useEffect(() => {
    const client = new Client({
      brokerURL: process.env.WS_URL,
    });
    if (data && data.joined) {
      setLatestStatus(data.status);
      if (data.status !== 'Completed') {
        client.activate();
        client.onConnect = () => {
          client.subscribe(
            `/topic/quiz-sessions/${sessionCode}/status`,
            (message) => {
              const statusMessage = JSON.parse(
                message.body,
              ) as QuizSessionStatusMessage;
              setLatestStatus(statusMessage.status);
              if (statusMessage.status === 'Completed') {
                router.push(`/sessions/${sessionCode}`);
              }
            },
          );
        };
      }
    }
    return () => {
      client?.deactivate();
    };
  }, [sessionCode, data, router]);

  if (!latestStatus || !data) {
    return <div className="container m-auto py-10">Loading...</div>;
  }

  if (latestStatus === 'Ready') {
    return <Waiting />;
  }

  if (latestStatus === 'ScheduledToStart') {
    return (
      <div className="container m-auto py-10 flex items-center justify-center">
        <span className="font-bold italic">
          The challenge will start soon in <Countdown seconds={5} />
        </span>
      </div>
    );
  }

  const timeLeft =
    data.duration - differenceInSeconds(new Date(), new Date(data.statedDate));

  return (
    <div className="container m-auto py-10 grid gap-4">
      <span>
        Time left <Countdown seconds={timeLeft} />
      </span>
      <div className="grid grid-cols-2 gap-5">
        <VocabularyQuiz />
        <RealtimeLeaderboard />
      </div>
    </div>
  );
}
