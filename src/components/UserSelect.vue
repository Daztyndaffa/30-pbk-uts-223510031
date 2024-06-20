<template>
    <h2>Posts</h2>
    <div class="user-posts-container">
      <div class="user-select-card">
        <label for="user-select">Select User:</label>
        <select id="user-select" v-model="selectedUserId" @change="onChange" :disabled="isLoadingUsers || isLoadingPosts">
          <option value="" disabled>Select a user</option>
          <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
        </select>
        <div v-if="isLoadingUsers" class="loading">Loading users...</div>
      </div>
      <div v-if="isLoadingPosts" class="loading">Loading posts...</div>
      <div v-if="!isLoadingPosts && posts.length" class="post-list">
        <h2>Posts</h2>
        <ul>
          <li v-for="post in posts" :key="post.id" class="post-item">
            <div class="post-card">
              <div class="post-header">{{ post.title }}</div>
              <div class="post-body">
                <p>{{ post.body }}</p>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div v-if="!isLoadingPosts && posts.length === 0" class="no-posts">
        No posts found.
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted, computed } from 'vue';
  import { useUserStore } from '../stores/userStore';
  
  export default {
    setup() {
      const userStore = useUserStore();
      const isLoadingUsers = ref(true); // Loading state for users
      const isLoadingPosts = ref(false); // Loading state for posts
  
      onMounted(async () => {
        try {
          await userStore.fetchUsers();
        } finally {
          isLoadingUsers.value = false;
        }
      });
  
      const onChange = async (event) => {
        const userId = event.target.value;
        try {
          isLoadingPosts.value = true; // Set isLoadingPosts to true when fetching posts
          await userStore.selectUser(userId);
        } finally {
          isLoadingPosts.value = false; // Set isLoadingPosts back to false after selecting user
        }
      };
  
      return {
        users: userStore.users,
        selectedUserId: computed(() => userStore.selectedUserId),
        posts: computed(() => userStore.posts),
        onChange,
        isLoadingUsers,
        isLoadingPosts,
      };
    },
  };
  </script>
  
  <style scoped>
  h2 {
  color: #82c91e;
  text-align: center;
  margin-bottom: 20px;
}

  .user-posts-container {
    display: flex;
    justify-content: center;
    align-items: flex-start; /* Align items to the top */
    flex-direction: column;
    padding: 20px;
  }
  
  .user-select-card {
    width: 100%;
    background-color: #333; /* Dark background */
    color: #fff; /* White text */
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 20px;
    margin-bottom: 20px;
    max-width: 100vw; /* Full width of viewport */
    margin-left: auto; /* Centered to the right */
    margin-right: auto; /* Centered to the left */
  }
  
  .user-select-card label {
    font-size: 1.2em;
    margin-bottom: 10px;
  }
  
  select {
    width: 100%;
    padding: 10px;
    border-radius: 4px;
    border: 1px solid #666; /* Darker border */
    background-color: #555; /* Darker background */
    color: #fff; /* White text */
    font-size: 1em;
  }
  
  select:focus {
    outline: none;
    border-color: #42b983; /* Vue.js green */
  }
  
  .loading {
    font-size: 1.2em;
    color: #42b983;
    text-align: center;
    margin-top: 10px;
  }
  
  .post-list {
    width: 100%;
    max-width: 100vw; /* Full width of viewport */
  }
  
  .post-list h2 {
    color: #333; /* Dark gray text */
    font-size: 1.5em;
    margin-bottom: 10px;
  }
  
  .post-item {
    list-style: none; /* Remove default list style */
  }
  
  .post-card {
    background-color: #333; /* Dark background */
    color: #fff; /* White text */
    border-radius: 8px;
    padding: 16px;
    margin-bottom: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .post-header {
    background-color: #42b983; /* Vue.js green */
    color: white;
    padding: 10px;
    border-radius: 8px 8px 0 0;
  }
  
  .post-body {
    padding: 16px;
  }
  
  .no-posts {
    margin-top: 20px;
    color: #666; /* Gray text */
    font-size: 1.2em;
  }
  </style>
  