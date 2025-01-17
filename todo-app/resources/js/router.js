import { createRouter, createWebHistory } from 'vue-router';

import TodoList from './components/TodoList.vue';
import HomePage from './components/HomePage.vue'; 
import TodoDetail from './components/TodoDetail.vue';


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage, // home page
  },
  {
    path: '/todos',
    name: 'todos',
    component: TodoList, // todo list
  },
  { path: '/', name: 'home', component: HomePage },
  { path: '/todos', name: 'todosList', component: TodoList },
  { path: '/todos/:id', name: 'todoDetail', component: TodoDetail },
];


const router = createRouter({
  history: createWebHistory(), 
  routes,
});

export default router;