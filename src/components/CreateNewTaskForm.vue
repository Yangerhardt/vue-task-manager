<template>
  <button @click="newTaskForm = true">Create New Task</button>

  <div v-if="newTaskForm">
    <form @submit.prevent="createTask">
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
import { useTaskStore } from '@/stores/tasks';
import {
  TASK_PRIORITIES,
  TASK_STATUSES,
  type GlobalTasks,
  type Task,
  type TaskPriority,
  type TaskStatus,
} from '@/types/Task.d';
import { getTaskPriority, getTaskStatus } from '@/utils/taskUtils';
import { ref } from 'vue';

defineProps<{
  tasks: GlobalTasks;
}>();

const newTaskForm = ref(false);
const { addTask } = useTaskStore();

const newTask = ref<Task>({
  id: '',
  title: '',
  duration: 0,
  status: 'backlog',
  priority: 'low',
});

const createTask = () => {
  const taskToAdd: Task = {
    ...newTask.value,
    id: '4',
  };

  addTask(taskToAdd, taskToAdd.status);
  newTaskForm.value = false;
};
</script>
