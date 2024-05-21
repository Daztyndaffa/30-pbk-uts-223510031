<template>
  <div class="container">
    <div>
      <a href="https://vitejs.dev" target="_blank">
        <img src="/vite.svg" class="logo" alt="Vite logo" />
      </a>
      <a href="https://vuejs.org/" target="_blank">
        <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
      </a>
    </div>

    <button @click="showPostSection" class="btn-post-section">Post</button>
    <button @click="showTodosSection" class="btn-todos-section">Todos</button>

    <div v-if="showPost" class="input-section">
      <h1 class="section-title"><span>Switch</span> User</h1>
      <select v-model="selectedUser" class="select-user">
        <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
      </select>
    </div>

    <Loading v-if="loading" />

    <PostSection v-if="showPost && !loading" :user-id="selectedUser" />
    <TodosSection v-if="showTodos" />
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import PostSection from './components/PostSection.vue';
import TodosSection from './components/TodosSection.vue';
import Loading from './components/Loading.vue';

const selectedUser = ref(null);
const users = ref([]);
const showPost = ref(false);
const showTodos = ref(true);
const loading = ref(false);

const showPostSection = () => {
  showPost.value = true;
  showTodos.value = false;
};

const showTodosSection = () => {
  showPost.value = false;
  showTodos.value = true;
};

const fetchUsers = () => {
  fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(data => (users.value = data));
};

onMounted(() => {
  fetchUsers();
});

watch(selectedUser, async () => {
  if (selectedUser.value !== null) {
    loading.value = true;
    // Fetch posts for the selected user
    await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${selectedUser.value}`)
      .then(response => response.json())
      .then(data => {
        const postSection = document.querySelector('post-section');
        if (postSection) {
          postSection.posts = data;
        }
      });
    loading.value = false;
  }
});
</script>

<style scoped>
.done {
  text-decoration: line-through;
}
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
h1 {
  color: #646cff;
  margin-bottom: 50px;
}
span {
  color: #42b883;
}
.btn-post-section,
.btn-todos-section {
  margin: 10px;
  padding: 10px 20px;
  background-color: #42b883;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}
.input-section {
  margin: 20px 0;
}
.select-user {
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
}
</style>
