
import { ExamCategory, VideoResource, NoteResource, QuizQuestion, NotificationItem, NoticeItem } from '../types';

// Toggle this to false when connecting to the real backend
const USE_MOCK_DATA = true;
const API_BASE_URL = 'http://localhost:5000/api';

// --- MOCK DATA STORE ---
const INITIAL_EXAMS: ExamCategory[] = [
  { id: '1', title: 'RPSC RAS', icon: 'fa-landmark', description: 'Complete preparation strategy for Rajasthan Administrative Services (Pre & Mains).' },
  { id: '2', title: 'Rajasthan Police', icon: 'fa-shield-alt', description: 'Constable and SI exam resources, physical guides, and mock tests.' },
  { id: '3', title: 'REET Level 1 & 2', icon: 'fa-chalkboard-teacher', description: 'Psychology, Hindi, Sanskrit, and subject-specific notes for teachers.' },
  { id: '4', title: 'RSMSSB Patwari', icon: 'fa-file-signature', description: 'Revenue laws, math tricks, and computer knowledge for Patwari exam.' },
  { id: '5', title: 'High Court LDC', icon: 'fa-gavel', description: 'Typing test tips, English & Hindi grammar, and current affairs.' },
  { id: '6', title: 'Junior Accountant', icon: 'fa-calculator', description: 'Accounts, business methods, and auditing notes for commerce students.' },
  { id: '7', title: 'EO/RO Exam', icon: 'fa-building', description: 'Municipal Act notes and urban development schemes.' },
  { id: '8', title: 'Agri. Supervisor', icon: 'fa-seedling', description: 'Agriculture science, horticulture, and animal husbandry resources.' }
];

const INITIAL_VIDEOS: VideoResource[] = [
  { id: '1', title: 'Rajasthan History Marathon: Mevad Dynasty', category: 'History', thumbnailUrl: 'https://picsum.photos/seed/history1/600/340' },
  { id: '2', title: 'Monthly Current Affairs: September 2023', category: 'Current Affairs', thumbnailUrl: 'https://picsum.photos/seed/news2/600/340' },
  { id: '3', title: 'Rajasthan Polity: Role of Governor', category: 'Polity', thumbnailUrl: 'https://picsum.photos/seed/polity3/600/340' },
  { id: '4', title: 'Geography: Aravalli Mountain Range', category: 'Geography', thumbnailUrl: 'https://picsum.photos/seed/geo4/600/340' },
  { id: '5', title: 'Art & Culture: Folk Deities (Lok Devta)', category: 'Art & Culture', thumbnailUrl: 'https://picsum.photos/seed/art5/600/340' },
  { id: '6', title: 'General Hindi: Sandhi Tricks', category: 'Language', thumbnailUrl: 'https://picsum.photos/seed/hindi6/600/340' },
];

const INITIAL_NOTES: NoteResource[] = [
  { id: '1', title: 'Rajasthan Art & Culture: Fairs & Festivals Summary', date: 'Oct 24, 2023', size: '2.4 MB', categoryId: '1' },
  { id: '2', title: 'RPSC RAS Mains Paper IV (Hindi/English) Notes', date: 'Oct 22, 2023', size: '4.1 MB', categoryId: '1' },
  { id: '3', title: 'Rajasthan Economic Survey 2023-24 Highlights', date: 'Oct 20, 2023', size: '1.8 MB', categoryId: '1' },
  { id: '4', title: 'Monthly Current Affairs PDF - September', date: 'Oct 15, 2023', size: '3.2 MB', categoryId: '1' },
  { id: '5', title: 'Rajasthan Geography: Maps & Minerals', date: 'Oct 10, 2023', size: '5.5 MB', categoryId: '4' },
  { id: '6', title: 'General Science: Biology Important Questions', date: 'Oct 08, 2023', size: '1.5 MB', categoryId: '3' },
  { id: '7', title: 'REET Psychology Short Notes', date: 'Oct 05, 2023', size: '2.1 MB', categoryId: '3' },
  { id: '8', title: 'Rajasthan Budget 2023: Key Schemes', date: 'Oct 01, 2023', size: '1.2 MB', categoryId: '6' },
  { id: '9', title: 'Rajasthan Police Constable Physical Guide', date: 'Sep 28, 2023', size: '1.1 MB', categoryId: '2' },
  { id: '10', title: 'High Court LDC: English Grammar Rules', date: 'Sep 25, 2023', size: '3.5 MB', categoryId: '5' },
  { id: '11', title: 'Municipal Act 2009 for EO/RO', date: 'Sep 20, 2023', size: '8.2 MB', categoryId: '7' },
  { id: '12', title: 'Agriculture: Kharif & Rabi Crops Data', date: 'Sep 15, 2023', size: '2.8 MB', categoryId: '8' },
];

const MOCK_QUIZ: Record<string, QuizQuestion[]> = {
  '1': [
    { id: 1, question: "Who was the first Chief Minister of Rajasthan?", options: ["Mohan Lal Sukhadia", "Heeralal Shastri", "Jai Narain Vyas", "Tikaram Paliwal"], correctAnswer: "Heeralal Shastri" },
    { id: 2, question: "Which river is known as 'Van Ki Asha' (Hope of the Forest)?", options: ["Chambal", "Mahi", "Banas", "Luni"], correctAnswer: "Banas" },
    { id: 3, question: "Where is the Kalibangan civilization located?", options: ["Jaipur", "Udaipur", "Hanumangarh", "Bikaner"], correctAnswer: "Hanumangarh" },
    { id: 4, question: "When was the Rajasthan Public Service Commission (RPSC) established?", options: ["1949", "1950", "1956", "1960"], correctAnswer: "1949" },
    { id: 5, question: "Which fort is known as the 'Golden Fort' (Sonar Quila)?", options: ["Mehrangarh", "Chittorgarh", "Jaisalmer Fort", "Ranthambore"], correctAnswer: "Jaisalmer Fort" }
  ]
};

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  { id: '1', text: "RPSC RAS 2023 Interview Dates Announced - Check Official Website", isHighlight: true },
  { id: '2', text: "Rajasthan Police Constable Physical Admit Card Released", isHighlight: true },
  { id: '3', text: "REET Level 2 Final Cut-off Marks Declared", isHighlight: true },
  { id: '4', text: "New Batch for RSMSSB LDC starting from Monday", isHighlight: false },
  { id: '5', text: "Download Monthly Current Affairs PDF from Notes Section", isHighlight: false }
];

const MOCK_NOTICES: NoticeItem[] = [
  { id: '1', title: 'RPSC RAS 2023 Mains Result Declared', date: '25 Oct 2023', isNew: true, type: 'pdf', link: '#' },
  { id: '2', title: 'Rajasthan Police Constable Physical Test Schedule Postponed', date: '24 Oct 2023', isNew: true, type: 'info', link: '#' },
  { id: '3', title: 'RSMSSB Junior Accountant Provisional Answer Key', date: '20 Oct 2023', isNew: false, type: 'pdf', link: '#' },
  { id: '4', title: 'Important Instructions for REET Level 1 Counselling', date: '18 Oct 2023', isNew: false, type: 'link', link: '#' },
  { id: '5', title: 'Syllabus Update for Assistant Professor Exam 2024', date: '15 Oct 2023', isNew: false, type: 'pdf', link: '#' }
];

// Local Storage Helper
const getStorage = <T>(key: string, initial: T): T => {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initial;
  } catch {
    return initial;
  }
};

const setStorage = (key: string, value: any) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error("Storage failed", e);
  }
};

// --- HELPER FOR DELAY ---
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// --- SERVICE METHODS ---

export const api = {
  getExams: async (): Promise<ExamCategory[]> => {
    if (USE_MOCK_DATA) {
      await delay(600);
      return getStorage('exams', INITIAL_EXAMS);
    }
    const res = await fetch(`${API_BASE_URL}/exams`);
    return res.json();
  },

  getVideos: async (category?: string): Promise<VideoResource[]> => {
    if (USE_MOCK_DATA) {
      await delay(800);
      const allVideos = getStorage<VideoResource[]>('videos', INITIAL_VIDEOS);
      return category 
        ? allVideos.filter(v => v.category === category) 
        : allVideos;
    }
    const url = category ? `${API_BASE_URL}/videos?category=${category}` : `${API_BASE_URL}/videos`;
    const res = await fetch(url);
    return res.json();
  },

  addVideo: async (video: VideoResource): Promise<void> => {
    if (USE_MOCK_DATA) {
      await delay(500);
      const current = getStorage<VideoResource[]>('videos', INITIAL_VIDEOS);
      setStorage('videos', [video, ...current]);
      return;
    }
    // Real API call would go here
  },

  getNotes: async (categoryId?: string): Promise<NoteResource[]> => {
    if (USE_MOCK_DATA) {
      await delay(500);
      const allNotes = getStorage<NoteResource[]>('notes', INITIAL_NOTES);
      return categoryId 
        ? allNotes.filter(n => n.categoryId === categoryId) 
        : allNotes;
    }
    const url = categoryId ? `${API_BASE_URL}/notes?categoryId=${categoryId}` : `${API_BASE_URL}/notes`;
    const res = await fetch(url);
    return res.json();
  },

  addNote: async (note: NoteResource): Promise<void> => {
    if (USE_MOCK_DATA) {
      await delay(500);
      const current = getStorage<NoteResource[]>('notes', INITIAL_NOTES);
      setStorage('notes', [note, ...current]);
      return;
    }
  },

  getQuiz: async (examId: string): Promise<QuizQuestion[]> => {
    if (USE_MOCK_DATA) {
      await delay(1000);
      return MOCK_QUIZ[examId] || [];
    }
    const res = await fetch(`${API_BASE_URL}/quiz/${examId}`);
    return res.json();
  },

  getNotifications: async (): Promise<NotificationItem[]> => {
    if (USE_MOCK_DATA) {
      await delay(300);
      return getStorage('notifications', INITIAL_NOTIFICATIONS);
    }
    const res = await fetch(`${API_BASE_URL}/notifications`);
    return res.json();
  },

  addNotification: async (item: NotificationItem): Promise<void> => {
    if (USE_MOCK_DATA) {
      await delay(300);
      const current = getStorage<NotificationItem[]>('notifications', INITIAL_NOTIFICATIONS);
      setStorage('notifications', [item, ...current]);
      return;
    }
  },

  getNotices: async (): Promise<NoticeItem[]> => {
    if (USE_MOCK_DATA) {
      await delay(400);
      return MOCK_NOTICES;
    }
    const res = await fetch(`${API_BASE_URL}/notices`);
    return res.json();
  }
};
