
export interface ExamCategory {
  id: string;
  title: string;
  icon: string;
  description: string;
}

export interface VideoResource {
  id: string;
  title: string;
  category: string;
  thumbnailUrl: string; 
}

export interface NoteResource {
  id: string;
  title: string;
  date: string;
  size: string;
  categoryId?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface NotificationItem {
  id: string;
  text: string;
  isHighlight: boolean;
}

export interface NoticeItem {
  id: string;
  title: string;
  date: string;
  link?: string;
  isNew?: boolean;
  type: 'pdf' | 'link' | 'info';
}
