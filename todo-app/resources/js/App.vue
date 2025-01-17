<!-- resources/js/App.vue -->
<template>
    <div>
        <h1>Todo Application</h1>
  
      <!-- Navigation links -->
      <nav>
        <div class="container">
            <router-link to="/">
                <button>Home</button>
            </router-link>
            <router-link to="/todos">
                <button>Todo List</button>
            </router-link>
        </div>

      </nav>

      <router-view></router-view>
    </div>
  </template>
  
  <script>
  export default {
    name: 'App',
  };
  </script>

<style scoped>
.container {
    display: flex;
    grid-template-columns: repeat(n, 1fr);
    gap: 10px;
}

button {
  padding: 10px 15px;
  background-color: #649acc;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #537ca1;
}

button[type="submit"] {
  background-color: #649acc;
}

button[type="submit"]:hover,
button[type="button"]:hover {
  opacity: 0.8;
}
</style>