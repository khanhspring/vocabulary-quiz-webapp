import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Client } from '@stomp/stompjs';

import { useLeaderboard } from '@/lib/hooks';
import useAuth from '@/lib/hooks/common/auth';
import { QuizSessionMember } from '@/types/responses';

export default function RealtimeLeaderboard() {
  const params = useParams<{ code: string }>();
  const sessionCode = params.code;
  const [members, setMembers] = useState<QuizSessionMember[]>();
  const { data } = useLeaderboard({ code: sessionCode });
  const { user } = useAuth();

  useEffect(() => {
    const client = new Client({
      brokerURL: process.env.WS_URL,
    });
    client.activate();
    client.onConnect = () => {
      client.subscribe(
        `/topic/quiz-sessions/${sessionCode}/leaderboard`,
        (message) => {
          const statusMessage = JSON.parse(message.body);
          setMembers(statusMessage.members);
        },
      );
    };
    return () => {
      client?.deactivate();
    };
  }, [sessionCode]);

  const leaderboard = members || data?.members || [];

  return (
    <div>
      <h3 className="font-bold text-lg">Leaderboard</h3>
      <div className="grid gap-2">
        {leaderboard.map((item, index) => (
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
    </div>
  );
}
