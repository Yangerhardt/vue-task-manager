<template>
  <main>
    <h1>Task View</h1>

    <div v-if="tasks.length > 0">
      <li v-for="task in tasks" :key="task.id">
        <TaskCard :task="task" :id="'task-' + task.id" />
      </li>
    </div>
    <div v-else>No task on the board</div>

    <TaskForm :tasks="tasks" />
    <RouterView />
  </main>
</template>

<script setup lang="ts">
import TaskCard from '@/components/TaskCard.vue';
import TaskForm from '@/components/TaskForm.vue';
import type { Task } from '@/types/Task.d';

import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const taskId = computed(() => route.params.id);

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

</script>

<style scoped>
main {
  > div {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  > div > li {
    list-style: none;
  }
}
</style>
