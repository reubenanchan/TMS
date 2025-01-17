<template>
    <div>
      <h1>Todo List</h1>
  
      <!-- Form to add new todo -->
      <div>
        <h2>Add New Todo</h2>
        <form @submit.prevent="addTodo">
          <div>
            <label for="name">Name:</label>
            <input type="text" id="name" v-model="newTodo.name" required />
          </div>
  
          <div>
            <label for="description">Description:</label>
            <textarea id="description" v-model="newTodo.description" required></textarea>
          </div>
  
          <button type="submit">Add Todo</button>
        </form>
      </div>
  
      <div>
        <button @click="sortBy('name')">Sort by Name</button>
        <button @click="sortBy('created_at')">Sort by Created Date</button>
      </div>
  
      <!-- Todo list display -->
      <ul>
        <li v-for="todo in todos" :key="todo.id">
          <strong>{{ todo.name }}</strong><br />
          <p>{{ todo.description }}</p>
          <small>Created on: {{ todo.created_at }}</small>
  
          <!-- Delete button -->
          <button @click="deleteTodo(todo.id)">Delete</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        todos: [], // Holds the todo list
        newTodo: {
          name: "",
          description: "",
        }, // Holds the new todo data
        sortByField: "", // The field to sort by
        sortDirection: "asc", // Sorting direction
      };
    },
    methods: {
      async fetchTodos() {
        try {
          const response = await axios.get("http://localhost/todos");
          this.todos = response.data;
        } catch (error) {
          console.error("Error fetching todos:", error);
        }
      },
      async addTodo() {
        try {
          const response = await axios.post("http://localhost/todos", this.newTodo);
          this.todos.push(response.data); // Add the new todo to the list
          this.newTodo.name = ""; // Reset the input fields
          this.newTodo.description = "";
        } catch (error) {
          console.error("Error adding todo:", error);
        }
      },
      async deleteTodo(id) {
        try {
          await axios.delete(`http://localhost/todos/${id}`);
          this.todos = this.todos.filter(todo => todo.id !== id); // Remove the deleted todo from the list
        } catch (error) {
          console.error("Error deleting todo:", error);
        }
      },
      sortBy(field) {
        this.sortDirection = this.sortByField === field && this.sortDirection === "asc" ? "desc" : "asc";
        this.sortByField = field;
        this.todos.sort((a, b) => {
          if (this.sortDirection === "asc") {
            return a[field] > b[field] ? 1 : -1;
          } else {
            return a[field] < b[field] ? 1 : -1;
          }
        });
      },
    },
    mounted() {
      this.fetchTodos();
    },
  };
  </script>
  
  <style scoped>
  form {
    margin-bottom: 20px;
  }
  
  label {
    display: block;
    margin-top: 10px;
  }
  
  input, textarea {
    width: 100%;
    padding: 8px;
    margin: 5px 0;
  }
  
  button {
    padding: 10px 15px;
    background-color: #4CAF50;
    color: white;
    border: none;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #45a049;
  }
  </style>