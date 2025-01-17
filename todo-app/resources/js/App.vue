<!-- resources/js/App.vue -->
<template>
    <div>
        <h1>Todo Application</h1>
  
      <!-- Navigation links -->
      <nav>
        <div>
            <router-link to="/">Home</router-link>
        </div>
        <div>
            <router-link to="/todos"> Todo List</router-link>
        </div>

      </nav>
  
      <!-- The active route's component will be rendered here -->
      <router-view></router-view>
    </div>
  </template>
  
  <script>
  export default {
    name: 'App',
  };
  </script>