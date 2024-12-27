import { useState } from 'react';
import { useParams } from 'next/navigation';

import { useQuizQuestions } from '@/lib/hooks';
import { QuizAnswerRes } from '@/types/responses';
import apis from '@/lib/apis';
import QuestionItem from '@/components/pages/SessionQuiz/components/QuestionItem';
import { Button } from '@/components/ui/button';

export default function VocabularyQuiz() {
  const params = useParams<{ code: string }>();
  const sessionCode = params.code;
  const { data } = useQuizQuestions({ code: sessionCode });
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [results, setResults] = useState<Record<string, QuizAnswerRes>>({});
  const [loading, setLoading] = useState(false);

  if (!data) {
    return <div className="container m-auto py-10">Questions loading...</div>;
  }
  const questions = data || [];

  if (questions.length === 0) {
    return <div className="container m-auto py-10">There is no questions!</div>;
  }

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const question = questions[currentQuestion];

  const handleAnswer = (value: string) => {
    setLoading(true);
    setAnswers({
      ...answers,
      [`${currentQuestion}`]: value,
    });
    apis.quizSession
      .answer(sessionCode, {
        questionId: question.id,
        answer: [value],
      })
      .then((res) => {
        setResults({
          ...results,
          [`${currentQuestion}`]: res.data,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="w-full">
      <QuestionItem
        question={question}
        index={currentQuestion}
        value={answers[`${currentQuestion}`]}
        onChange={handleAnswer}
        result={results[`${currentQuestion}`]}
        disabled={loading || !!results[`${currentQuestion}`]}
      />
      <div className="flex items-center justify-between gap-5 mt-5 w-[400px]">
        <Button
          onClick={handlePrevQuestion}
          disabled={currentQuestion === 0 || loading}
          className="w-20"
        >
          Previous
        </Button>
        <Button
          onClick={handleNextQuestion}
          disabled={currentQuestion === questions.length - 1 || loading}
          className="w-20"
        >
          Next
        </Button>
      </div>
    </div>
  );
}
