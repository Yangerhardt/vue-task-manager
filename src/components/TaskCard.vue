<template>
  <div class="container" :class="task.status">
    <div class="task-id-container">
      <p class="task-id">#{{ task.id }}</p>
    </div>
    <h2>{{ task.title }}</h2>
    <div class="bottom-container">
      <p>{{ getTaskPriority(task.priority) }}</p>
      <p>{{ task.duration }} days</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Task } from '@/types/Task.d';
import { getTaskPriority } from '@/utils/taskUtils';

defineProps<{
  task: Task;
}>();
</script>

<style scoped>
@import '../assets/styles/base.css';

.backlog {
  background-color: #efefef;
}

.inProgress {
  background-color: #d1f3f8;
}

.completed {
  background-color: #e6ffe6;
}

.blocked {
  background-color: #fee2e2;
}

.container {
  border: 1px solid #ccc;
  padding: 12px;
  border-radius: 4px;
  color: var(--vt-c-black);
  max-width: 200px;

  h2 {
    margin: 0;
  }

  .bottom-container {
    display: flex;
    justify-content: space-between;
    > p {
      margin: 0;
    }
  }
}

.task-id-container {
  display: flex;
  justify-content: flex-end;
}

.task-id {
  text-align: center;
  font-size: 12px;
  color: var(--vt-c-gray-dark);
  width: 36px;
}
</style>
