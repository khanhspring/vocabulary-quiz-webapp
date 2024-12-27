import { redirect } from 'next/navigation';

import Quiz from '@/components/pages/SessionQuiz/components/Quiz';
import { restClient } from '@/lib/utils/server';

type Props = {
  params: Promise<{ code: string }>;
};

export default async function SessionQuizPage({ params }: Props) {
  const { code } = await params;
  const res = await restClient.get(`/quiz-sessions/${code}`);
  const data = await res.json();

  if (!data || !data.joined || data.status === 'Completed') {
    return redirect(`/sessions/${code}`);
  }

  return <Quiz />;
}
