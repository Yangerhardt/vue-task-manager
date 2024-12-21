import {
  TASK_PRIORITY_LABELS,
  TASK_STATUS_LABELS,
  type TaskPriority,
  type TaskStatus,
} from '@/types/Task.d';

export const getTaskStatus = (status: TaskStatus) => {
  return TASK_STATUS_LABELS[status] || status;
};

export const getTaskPriority = (priority: TaskPriority) => {
  return TASK_PRIORITY_LABELS[priority] || priority;
};
