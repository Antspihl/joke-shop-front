  // Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
      },
      {
        path: 'jokes',
        name: 'AllJokes',
        component: () => import(/* webpackChunkName: "home" */ '@/views/JokesView.vue'),
      },
      {
        path: 'users',
        name: 'AllUsers',
        component: () => import(/* webpackChunkName: "home" */ '@/views/UsersView.vue'),
      },
      {
        path: 'addJoke',
        name: 'AddJoke',
        component: () => import(/* webpackChunkName: "home" */ '@/views/JokeSubmissionForm.vue')
      },
      {
        path: 'userJokes',
        name: 'UserJokes',
        component: () => import(/* webpackChunkName: "home" */ '@/views/UserJokes.vue')
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
