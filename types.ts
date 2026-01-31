
export interface Planet {
  id: string;
  name: string;
  englishName: string;
  description: string;
  funFact: string;
  color: string;
  distanceFromSun: string;
  distanceFromEarth: string;
  size: string;
  image: string;
  moonsCount?: string;
  hasRings?: boolean;
  missions?: string[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
}