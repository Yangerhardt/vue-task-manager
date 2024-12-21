<template>
  <main>
    <h1>Task View</h1>

    <div v-if="tasks.length > 0">
      <li v-for="task in tasks" :key="task.id">
        <TaskCard :task="task" :id="'task-' + task.id" />
      </li>
    </div>
    <div v-else>No task on the board</div>

    <button @click="newTaskForm = true">Create New Task</button>

    <div v-if="newTaskForm">
      <form @submit.prevent="createTask(newTask)">
        <input v-model="newTask.title" placeholder="Task Title" />
        <input v-model="newTask.duration" placeholder="Duration" />
        <select v-model="newTask.status">
          <option v-for="status in TASK_STATUSES" :key="status" :value="status">
            {{ getTaskStatus(status as TaskStatus) }}
          </option>
        </select>
        <select v-model="newTask.priority">
          <option v-for="priority in TASK_PRIORITIES" :key="priority" :value="priority">
            {{ getTaskPriority(priority as TaskPriority) }}
          </option>
        </select>
        <button type="submit">Create Task</button>
        <button @click="newTaskForm = false">Cancel</button>
      </form>
    </div>

    <RouterView />
  </main>
</template>

<script setup lang="ts">
import TaskCard from '@/components/TaskCard.vue';
import {
  TASK_PRIORITIES,
  TASK_PRIORITY_LABELS,
  TASK_STATUS_LABELS,
  TASK_STATUSES,
  type Task,
  type TaskPriority,
  type TaskStatus,
} from '@/types/Task.d';
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const taskId = computed(() => route.params.id);
const newTaskForm = ref(false);
const getTaskStatus = (status: TaskStatus) => {
  return TASK_STATUS_LABELS[status] || status;
};
const getTaskPriority = (priority: TaskPriority) => {
  return TASK_PRIORITY_LABELS[priority] || priority;
};

const newTask = ref<Task>({
  id: '',
  title: '',
  duration: 0,
  status: 'backlog',
  priority: 'low',
});
const tasks = ref<Task[]>([
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
    status: 'blocked',
    priority: 'medium',
  },
]);

const createTask = (task: Task) => {
  tasks.value.push({
    id: String(tasks.value.length + 1),
    title: task.title,
    duration: task.duration,
    status: task.status,
    priority: task.priority,
  });
};
</script>

<style scoped>
main {
  > div {
    display: flex;
    flex-direction: column;
    max-width: 50%;
    gap: 12px;
  }

  > div > li {
    list-style: none;
  }
}
</style>
