<template>
  <main>
    <h1>Task View</h1>
    <p>Task ID: {{ taskId  }}</p>
    <div>
      <button @click="updateQueryParam">Update Query</button>
      <button @click="previousParam">Back to previous</button>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const taskId = ref(route.params.id)

const updateQueryParam = () => {
  const updatedId = parseInt(taskId.value as string) + 1
  router.push({ path: `/task/${updatedId}` })
}

const previousParam = () => {
  router.back()
}

watch(() => route.params.id, (newId) => {
  taskId.value = newId;
})
</script>

<style scoped>
main {
  > div {
    display: flex;
    flex-direction: column;
    max-width: 50%;
    gap: 12px;
  }
}
</style>
