import { QuizAnswerReq } from 'src/types/request';

import { QuizAnswerRes } from '@/types/responses';

import api from '../utils/client/rest-client';

const quizSession = {
  answer: (code: string, request: QuizAnswerReq) =>
    api.post<QuizAnswerRes>(`/quiz-sessions/${code}/answers`, request),
};

export default quizSession;
