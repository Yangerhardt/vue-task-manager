export interface Task {
  id: string;
  title: string;
  duration: number;
  status: 'backlog' | 'inProgress' | 'completed' | 'blocked';
  priority: 'Low' | 'Medium' | 'High';
}
