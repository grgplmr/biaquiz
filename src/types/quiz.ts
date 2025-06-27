export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export interface Quiz {
  id: number;
  title: string;
  category: string;
  questions: Question[];
  createdAt: string;
}

export interface QuizCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
}

export interface QuizAttempt {
  questionId: number;
  selectedAnswer: number;
  isCorrect: boolean;
  attempts: number;
}

export interface QuizSession {
  quizId: number;
  attempts: QuizAttempt[];
  score: number;
  completed: boolean;
  startTime: Date;
  endTime?: Date;
}