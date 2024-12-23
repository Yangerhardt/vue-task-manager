import { createRouter, createWebHistory } from 'vue-router';
import TaskView from '@/views/TaskView.vue';
import NotFoundView from '@/views/NotFoundView.vue';
import TaskDetailsView from '@/views/TaskDetailsView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/task/:id',
      name: 'task',
      component: TaskView,
      children: [
        {
          path: 'details',
          name: 'task-details',
          component: TaskDetailsView,
        },
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFoundView,
    },
  ],
});

export default router;
