import { useRequest } from '@/lib/hooks/query/request';
import {
  PageRes,
  QuizQuestionRes,
  QuizSessionLeaderboard,
  QuizSessionRes,
} from '@/types/responses';

export function useQuizSessions() {
  return useRequest<PageRes<QuizSessionRes>>(`/quiz-sessions`);
}

export function useQuizSession({ code }: { code?: string }) {
  return useRequest<QuizSessionRes>(`/quiz-sessions/${code}`);
}

export function useQuizQuestions({ code }: { code?: string }) {
  return useRequest<QuizQuestionRes[]>(`/quiz-sessions/${code}/questions`);
}

export function useLeaderboard({ code }: { code?: string }) {
  return useRequest<QuizSessionLeaderboard>(
    `/quiz-sessions/${code}/leaderboard`,
  );
}
