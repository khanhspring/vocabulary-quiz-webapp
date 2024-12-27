export type QuizSessionStatus =
  | 'Draft'
  | 'Ready'
  | 'ScheduledToStart'
  | 'InProgress'
  | 'Completed';

export type QuizQuestionType = 'MultiChoice' | 'ShortAnswer';

export interface QuizSessionRes {
  id: string;
  code: string;
  title: string;
  description: string;
  duration: number;
  maxMembers: number;
  totalQuestions: number;
  status: QuizSessionStatus;
  statedDate: Date;
  scheduledDate?: Date;
  joined: boolean;
}

export interface QuizQuestionRes {
  id: string;
  type: string;
  content: QuizQuestionType;
  options: Record<string, string>;
}

export interface QuizAnswerRes {
  correct: boolean;
  receivedScore: number;
}

export interface QuizSessionStatusMessage {
  status: QuizSessionStatus;
  countDownTime: number;
}

export interface QuizSessionMember {
  userId: string;
  fullName: string;
  completedDate: Date;
  receivedScore: number;
}

export interface QuizSessionLeaderboard {
  members: QuizSessionMember[];
}
