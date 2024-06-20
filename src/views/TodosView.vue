<template>
  <div class="container">
    <h2>Todo List</h2>
    <div class="card">
      <input v-model="newTodo" placeholder="Add a new task" @keyup.enter="addNewTodo" />
      <button @click="addNewTodo" class="add">Add</button>
    </div>
    <div class="card">
      <button @click="todoStore.toggleShowCompleted" class="toggle">
        {{ todoStore.showCompleted ? 'Hide Completed' : 'Show Completed' }}
      </button>
      <p>Completed Tasks: {{ todoStore.completedCount }}</p>
      <ul>
        <li v-for="(todo, index) in todoStore.visibleTodos" :key="index">
          <span :style="{ textDecoration: todo.completed ? 'line-through' : 'none' }">
            {{ todo.text }}
          </span>
          <button @click="todoStore.toggleTodo(index)" class="complete">
            {{ todo.completed ? 'Undo' : 'Complete' }}
          </button>
          <button @click="todoStore.removeTodo(index)" class="delete">Delete</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useTodoStore } from '../stores/todoStore';

const newTodo = ref('');
const todoStore = useTodoStore();

const addNewTodo = () => {
  if (newTodo.value.trim()) {
    todoStore.addTodo({
      text: newTodo.value,
      completed: false,
    });
    newTodo.value = '';
  }
};
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

h2 {
  color: #82c91e;
  text-align: center;
  margin-bottom: 20px;
}

.card {
  background: rgba(30, 30, 30, 0.8); /* Semi-transparent dark background */
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  margin-bottom: 20px;
}

input, button {
  font-size: 1em;
  padding: 10px;
  border-radius: 4px;
  border: none;
  margin: 5px 0;
  width: calc(100% - 20px); /* Full width except for padding */
}

button {
  cursor: pointer;
  width: auto; /* Auto width for buttons */
}

button.add {
  background-color: #4caf50; /* Green for add */
  color: #fff;
}

button.delete {
  background-color: #f44336; /* Red for delete */
  color: #fff;
}

button.complete {
  background-color: #ff9800; /* Orange for complete */
  color: #fff;
}

button.toggle {
  background-color: #9c27b0; /* Purple for toggle show/hide completed */
  color: #fff;
  width: 100%; /* Full width for toggle button */
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #444;
}

li span {
  flex: 1;
}

li button {
  margin-left: 10px;
}
</style>
