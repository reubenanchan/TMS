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

    <div class="container">
      <button @click="sortBy('name')">Sort by Name</button>
      <button @click="sortBy('created_at')">Sort by Created Date</button>
    </div>

    <!-- Update form -->
    <div v-if="editingTodo">
      <h2>Edit Todo</h2>
      <form @submit.prevent="updateTodo">
        <div>
          <label for="editName">Name:</label>
          <input type="text" id="editName" v-model="editingTodo.name" required />
        </div>

        <div>
          <label for="editDescription">Description:</label>
          <textarea id="editDescription" v-model="editingTodo.description" required></textarea>
        </div>

        <button type="submit">Update Todo</button>
        <button @click="cancelEdit">Cancel</button>
      </form>
    </div>

    <!-- Todo list display -->
    <ul>
      <li v-for="todo in todos" :key="todo.id">
        <strong>{{ todo.name }}</strong><br />
        <p>{{ todo.description }}</p>
        <small>Created on: {{ todo.created_at }}</small>

        <!-- Update and Delete buttons -->
         <div class="container">
          <button @click="editTodo(todo)">Update</button>
        <button @click="deleteTodo(todo.id)">Delete</button>
         </div>
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
      editingTodo: null, // The todo being edited
      sortByField: "",
      sortDirection: "asc",
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
    async editTodo(todo) {
      this.editingTodo = { ...todo }; // Clone the todo object to allow editing
    },
    async updateTodo() {
      try {
        const response = await axios.put(`http://localhost/todos/${this.editingTodo.id}`, this.editingTodo);
        // Update the todo in the list with the updated data
        const index = this.todos.findIndex(todo => todo.id === this.editingTodo.id);
        this.todos[index] = response.data;
        this.editingTodo = null; // Clear the editing state
      } catch (error) {
        console.error("Error updating todo:", error);
      }
    },
    cancelEdit() {
      this.editingTodo = null; // Cancel editing and reset the form
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

button[type="button"] {
  background-color: #f44336;
}

button[type="submit"]:hover,
button[type="button"]:hover {
  opacity: 0.8;
}
</style>