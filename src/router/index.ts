import { createRouter, createWebHistory } from 'vue-router'
import RepositoriesView from '../views/RepositoriesView.vue'
import SettingsView from '../views/SettingsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'repositories',
      component: RepositoriesView
    },
    {
      path: '/settings',
      name: 'settings',
      component: SettingsView
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
})

export default router
