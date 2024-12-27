import Link from 'next/link';
import { ClockIcon, UsersRoundIcon } from 'lucide-react';

import { QuizSessionRes } from '@/types/responses';

type Props = {
  session: QuizSessionRes;
};

export default function SessionCard({ session }: Props) {
  return (
    <Link
      className="border rounded p-5 hover:bg-gray-200/80"
      href={`/sessions/${session.code}`}
    >
      <div className="grid gap-4">
        <div className="flex items-center justify-between">
          <span className="font-bold">#{session.code}</span>
          <span className="text-xs flex items-center py-1 px-2 rounded-[3px] bg-gray-300">
            {session.status}
          </span>
        </div>
        <h3 className="font-bold">{session.title}</h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <ClockIcon className="w-5" />
            <span>{session.duration / 60} min</span>
          </div>
          <div className="flex items-center gap-1">
            <UsersRoundIcon className="w-5" />
            <span>{session.maxMembers}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
