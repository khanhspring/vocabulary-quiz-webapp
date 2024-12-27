export interface QuizRegistrationReq {
  sessionCode: string;
}

export interface QuizAnswerReq {
  questionId: string;
  answer: string[];
}
