<template>
  <main>
    <h1>Task View</h1>

    <div class="columns">
      <div v-for="column in TASK_STATUSES" :key="column" class="column" :data-status="column">
        <h2>{{ TASK_STATUS_LABELS[column] }}</h2>
        <draggable
          v-model="tasks[column]"
          group="tasks"
          @add="onTaskAdded"
          item-key="id"
        >
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
import { useTaskStore } from '@/stores/tasks';
import CreateNewTaskForm from '../components/CreateNewTaskForm.vue';
import TaskCard from '@/components/TaskCard.vue';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import draggable from 'vuedraggable';
import { TASK_STATUS_LABELS, TASK_STATUSES, type Task, type TaskStatus } from '@/types/Task.d';

const route = useRoute();
const taskId = computed(() => route.params.id);
const { tasks, moveTask } = useTaskStore();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const onTaskAdded = (event: any) => {
  // Aparentemente a única forma de pegar as infos do objeto da task
  const task = event.item._underlying_vm_;
  // Da mesma maneira, a única forma de pegar o status de destino
  const toStatus = event.to.closest('.column').dataset.status;
  moveTask(task as Task, task.status as TaskStatus, toStatus as TaskStatus);
};
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
