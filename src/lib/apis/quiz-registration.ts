import { QuizRegistrationReq } from 'src/types/request';

import api from '../utils/client/rest-client';

const quizRegistration = {
  register: (request: QuizRegistrationReq) =>
    api.post(`/quiz-sessions/registrations`, request),
};

export default quizRegistration;
