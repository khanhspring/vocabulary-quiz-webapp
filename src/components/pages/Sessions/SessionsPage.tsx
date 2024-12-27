'use client';

import { useQuizSessions } from '@/lib/hooks';

import SessionCard from './components/SessionCard';

export default function SessionsPage() {
  const { data } = useQuizSessions();
  const items = data?.content || [];

  return (
    <div className="container m-auto py-10">
      <h2 className="font-bold">Vocabulary Quiz Challenges</h2>
      <section className="grid grid-cols-3 gap-5 mt-5">
        {items.map((item, index) => (
          <SessionCard key={index} session={item} />
        ))}
      </section>
    </div>
  );
}
