<template>
  <main>
    <h1>Task View</h1>

    <div v-if="tasks.length > 0">
      <li v-for="task in tasks" :key="task.id">
        <TaskCard :task="task" :id="'task-' + task.id" />
      </li>
    </div>
    <div v-else>No task on the board</div>

    <RouterView />
  </main>
</template>

<script setup lang="ts">
import TaskCard from '@/components/TaskCard.vue';
import type { Task } from '@/types/Task';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const taskId = ref(route.params.id);

watch(
  () => route.params.id,
  (newId) => {
    taskId.value = newId;
  },
);

const tasks = ref<Task[]>([
  {
    id: '1',
    title: 'Task 1',
    duration: 1,
    status: 'backlog',
    priority: 'Low',
  },
  {
    id: '2',
    title: 'Task 2',
    duration: 2,
    status: 'blocked',
    priority: 'Medium',
  },
]);
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
