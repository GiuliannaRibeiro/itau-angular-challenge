export interface Task {
  id: number;
  name: string;
  isCompleted: boolean;
  completionDate: Date | null;
}
