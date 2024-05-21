<template>
    <div class="list-section">
      <h2 class="section-title">Post</h2>
      <ul>
        <li v-for="(post, index) in posts" :key="index" class="daftar-post">
          <span>{{ post.title }}</span>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { ref, watch, onMounted } from 'vue';
  
  const props = defineProps({
    userId: {
      type: Number,
      required: true,
    },
  });
  
  const posts = ref([]);
  
  const fetchPosts = () => {
    if (props.userId !== null) {
      fetch(`https://jsonplaceholder.typicode.com/posts?userId=${props.userId}`)
        .then(response => response.json())
        .then(data => {
          posts.value = data;
        });
    }
  };
  
  watch(() => props.userId, () => {
    fetchPosts();
  });
  
  onMounted(() => {
    fetchPosts();
  });
  </script>
  
<style scoped>
.list-section {
  margin: 20px 0;
}
.section-title {
  font-size: 1.5em;
  color: #42b883;
}
.daftar-post {
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #444;
  color: #fff;
  transition: background-color 0.3s;
}
.daftar-post:hover {
  background-color: #555;
}
</style>
