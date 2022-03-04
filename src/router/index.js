import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import registeration from '../views/register.vue'
import login from '../views/loginv.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: registeration
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
