import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
// import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/customization',
  },
  {
    path: '/play',
    name: 'game',
    component: () =>
      import(/* webpackChunkName: "game" */ '../views/GameView.vue'),
  },
  {
    path: '/customization',
    name: 'customization',
    component: () =>
      import(/* webpackChunkName: "game" */ '../views/Customization.vue'),
  },
  {
    path: '/about',
    name: 'about',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
