<template>
  <button @click="newTaskForm = true">Create New Task</button>

  <div v-if="newTaskForm">
    <form @submit.prevent="createTask(newTask, ref(tasks))">
      <input v-model.trim="newTask.title" placeholder="Task Title" />
      <input v-model.number="newTask.duration" placeholder="Duration" />
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
</template>

<script setup lang="ts">
import {
  TASK_PRIORITIES,
  TASK_STATUSES,
  type Task,
  type TaskPriority,
  type TaskStatus,
} from '@/types/Task.d';
import { getTaskPriority, getTaskStatus } from '@/utils/taskUtils';
import { ref, type Ref } from 'vue';

defineProps<{
  tasks: Task[];
}>();

const newTaskForm = ref(false);

const newTask = ref<Task>({
  id: '',
  title: '',
  duration: 0,
  status: 'backlog',
  priority: 'low',
});

const createTask = (task: Task, tasks: Ref<Task[]>) => {
  tasks.value.push({
    id: String(tasks.value.length + 1),
    title: task.title,
    duration: task.duration,
    status: task.status,
    priority: task.priority,
  });
};
</script>
