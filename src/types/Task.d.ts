export interface Task {
  id: string;
  title: string;
  duration: number;
  status: 'backlog' | 'inProgress' | 'completed' | 'blocked';
  priority: 'low' | 'medium' | 'high';
  note?: string;
}

export const TASK_STATUSES = ['backlog', 'inProgress', 'completed', 'blocked'] as const;

export type TaskStatus = (typeof TASK_STATUSES)[number];

export const TASK_PRIORITIES = ['low', 'medium', 'high'] as const;

export type TaskPriority = (typeof TASK_PRIORITIES)[number];

export const TASK_STATUS_LABELS: Record<TaskStatus, string> = {
  backlog: 'Backlog',
  inProgress: 'In Progress',
  completed: 'Completed',
  blocked: 'Blocked',
};

export const TASK_PRIORITY_LABELS: Record<TaskPriority, string> = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
};

export type GlobalTasks = Record<TaskStatus, Task[]>;
