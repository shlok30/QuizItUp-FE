import { Quiz } from './features/quiz';

export type QuizWithId = Quiz & { _id: string; score: number };
export type Quizzes = { quizzes: QuizWithId[] };
