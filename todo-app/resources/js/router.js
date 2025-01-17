import { createRouter, createWebHistory } from 'vue-router';

// Import the components that will be rendered for each route
import TodoList from './components/TodoList.vue';
import HomePage from './components/HomePage.vue'; // You can create this component later
import TodoDetail from './components/TodoDetail.vue';

// Define your routes
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage, // This will be the home page
  },
  {
    path: '/todos',
    name: 'todos',
    component: TodoList, // This will show the todo list
  },
  { path: '/', name: 'home', component: HomePage },
  { path: '/todos', name: 'todos', component: TodoList },
  { path: '/todos/:id', name: 'todoDetail', component: TodoDetail },
];

// Create the router instance and pass the routes
const router = createRouter({
  history: createWebHistory(), // Use history mode (no hashes in the URL)
  routes,
});

export default router;