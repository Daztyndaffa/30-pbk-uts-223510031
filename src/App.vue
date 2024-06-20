<template>
  <header class="navbar">
    <nav>
      <ul class="nav-links">
        <li><RouterLink to="/" class="nav-link">Home</RouterLink></li>
        <li><RouterLink to="/todos" class="nav-link">Todo List</RouterLink></li>
        <li><RouterLink to="/post" class="nav-link">Posts</RouterLink></li>
        <li><RouterLink to="/albums" class="nav-link">Albums</RouterLink></li>
      </ul>
    </nav>
  </header>
  <RouterView />
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<style scoped>
.navbar {
  background-color: #333;
  padding: 10px 0;
}

nav {
  display: flex;
  justify-content: center;
}

.nav-links {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
}

.nav-link {
  text-decoration: none;
  color: #fff;
  padding: 10px 20px;
  margin: 0 5px; /* Added margin between items */
  transition: color 0.3s ease, transform 0.2s ease; /* Added transition for color and transform */
}

.nav-link:hover {
  color: #82c91e; /* Change text color on hover */
  transform: translateY(-3px); /* Move the link up slightly on hover */
}

.nav-link:active {
  background-color: #777;
}
</style>
