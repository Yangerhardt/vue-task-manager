import { TASK_STATUSES, type GlobalTasks, type Task, type TaskStatus } from '@/types/Task.d';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useTaskStore = defineStore('tasks', () => {
  const tasks = ref<GlobalTasks>({
    [TASK_STATUSES[0]]: [
      {
        id: '1',
        title: 'Task 1',
        duration: 1,
        status: 'backlog',
        priority: 'low',
      },
      {
        id: '2',
        title: 'Task 2',
        duration: 2,
        status: 'backlog',
        priority: 'medium',
      },
    ],
    [TASK_STATUSES[1]]: [],
    [TASK_STATUSES[2]]: [],
    [TASK_STATUSES[3]]: [],
  });

  const addTask = (task: Task, status: TaskStatus) => {
    tasks.value[status].push(task);
  };

  const moveTask = (task: Task, from: TaskStatus, to: TaskStatus) => {
    const index = tasks.value[from].findIndex((t) => t.id === task.id);
    if (index > -1) {
      const [movedTask] = tasks.value[from].splice(index, 1);
      movedTask.status = to; 
      tasks.value[to].push(movedTask);
    }

    console.log('##########Task moved:', task, from, to);
    console.log('##########Task :', task);
  };

  return { tasks, addTask, moveTask };
});
