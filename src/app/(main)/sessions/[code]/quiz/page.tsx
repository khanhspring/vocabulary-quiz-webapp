import SessionQuizPage from '@/components/pages/SessionQuiz';

type Props = {
  params: Promise<{ code: string }>;
};

export default function SessionDetail({ params }: Props) {
  return <SessionQuizPage params={params} />;
}
