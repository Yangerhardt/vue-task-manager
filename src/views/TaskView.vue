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

    <p>{{ taskId }}</p>

    <RouterView />
  </main>
</template>

<script setup lang="ts">
import TaskCard from '@/components/TaskCard.vue';
import type { Task } from '@/types/Task';
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const taskId = computed(() => route.params.id);
const newTaskForm = ref(false);
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

const createTask = () => {
  tasks.value.push({
    id: String(tasks.value.length + 1),
    title: `Task ${tasks.value.length + 1}`,
    duration: Math.floor(Math.random() * 10) + 1,
    status: 'backlog',
    priority: 'Low',
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
