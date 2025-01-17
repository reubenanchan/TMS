<template>
    <div>
      <h1>Todo Detail</h1>
      <p>Name: {{ todo.name }}</p>
      <p>Description: {{ todo.description }}</p>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        todo: {
          name: '',
          description: '',
        },
      };
    },
    created() {
      const todoId = this.$route.params.id; // Get ID
      this.fetchTodoDetail(todoId);
    },
    methods: {
      async fetchTodoDetail(id) {
        try {
          const response = await axios.get(`http://localhost/todos/${id}`);
          this.todo = response.data;
        } catch (error) {
          console.error('Error fetching todo:', error);
        }
      },
    },
  };
  </script>