<template>
  <main>
    <h1>Task View</h1>

    <div class="columns">
      <div class="column">
        <h2>Backlog</h2>
        <draggable v-model="backlogTasks" group="tasks">
          <template #item="{ element }">
            <li :key="element.id">
              <TaskCard :task="element" :id="'task-' + element.id" />
            </li>
          </template>
        </draggable>
      </div>

      <div class="column">
        <h2>In Progress</h2>
        <draggable v-model="inProgressTasks" group="tasks">
          <template #item="{ element }">
            <li :key="element.id">
              <TaskCard :task="element" :id="'task-' + element.id" />
            </li>
          </template>
        </draggable>
      </div>
    </div>

    <CreateNewTaskForm :tasks="tasks" />
    <RouterView />
  </main>
</template>

<script setup lang="ts">
import CreateNewTaskForm from '../components/CreateNewTaskForm.vue';
import TaskCard from '@/components/TaskCard.vue';
import type { Task } from '@/types/Task.d';
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import draggable from 'vuedraggable';

const route = useRoute();
const taskId = computed(() => route.params.id);

const backlogTasks = ref<Task[]>([
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
]);

const inProgressTasks = ref<Task[]>([
  {
    id: '3',
    title: 'Task 3',
    duration: 3,
    status: 'inProgress',
    priority: 'high',
  },
]);
</script>

<style scoped>
.board {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.columns {
  display: flex;
  gap: 24px;
}

.column {
  flex: 1;
  padding: 16px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  > div > li {
    list-style: none;
  }
}

h2 {
  margin-bottom: 12px;
}

.draggable-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>
