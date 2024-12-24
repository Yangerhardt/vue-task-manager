<template>
  <div class="create-task-btn">
    <button @click="newTaskForm = true">Create New Task</button>
  </div>

  <div v-if="newTaskForm" class="new-task-form">
    <form @submit.prevent="createTask" class="form">
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
      <div class="buttons">
        <button type="submit">Create Task</button>
        <button @click="newTaskForm = false">Cancel</button>
      </div>
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

const initialState: Task = {
  id: '',
  title: '',
  duration: 0,
  status: 'backlog',
  priority: 'low',
};

const newTask = ref<Task>({ ...initialState });

const createTask = () => {
  const taskToAdd: Task = {
    ...newTask.value,
    id: '4',
  };

  addTask(taskToAdd, taskToAdd.status);
  newTaskForm.value = false;
  newTask.value = { ...initialState };
};
</script>

<style lang="css" scoped>
.create-task-btn {
  display: flex;
  justify-content: flex-end;
  margin: 16px;

  > button {
    padding: 12px;
    border: none;
    border-radius: 4px;
    background-color: black;
    color: white;
    cursor: pointer;
  }
}

.new-task-form {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.form {
  min-width: 400px;
  max-width: 500px;
  padding: 24px;
  background-color: WHITE;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  > input {
    margin-bottom: 8px;
    padding: 8px;
    width: 100%;
    max-width: 280px;
  }

  > select {
    margin-bottom: 8px;
    padding: 8px;
    width: 100%;
    max-width: 300px;
  }

  .buttons {
    display: flex;
    gap: 12px;
    margin-top: 12px;

    > button {
      padding: 12px;
      border: none;
      border-radius: 4px;
      background-color: black;
      color: white;
      cursor: pointer;
      width: 140px;
    }
  }
}
</style>
