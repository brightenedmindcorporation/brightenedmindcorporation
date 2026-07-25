export type StudentStatus = "PENDING" | "APPROVED" | "REJECTED";

export interface StudentProgress {
  currentLesson: number; // Ex: 1 à 12
  completedLessons: number[]; // Ex: [1, 2, 3]
  quizScores: Record<number, number>; // Ex: { 1: 10, 2: 8 }
  finalQuizPassed: boolean;
  finalQuizScore?: number;
}

export interface User {
  id: string;
  fullName: string;
  email: string;
  status: StudentStatus;
  matricule?: string; // Format: BMCA-2026-001
  role: "STUDENT" | "ADMIN";
  progress: StudentProgress;
}