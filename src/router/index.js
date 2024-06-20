// router/index.js

import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import TodosView from '../views/TodosView.vue';
import PostView from '../views/PostView.vue';
import AlbumsView from '../views/AlbumsView.vue';
import AlbumDetailView from '../views/AlbumDetail.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'Home', component: HomeView },
    { path: '/todos', name: 'Todos', component: TodosView },
    { path: '/post', name: 'Post', component: PostView },
    { path: '/albums', name: 'Albums', component: AlbumsView },
    { path: '/albums/:albumId', name: 'AlbumDetail', component: AlbumDetailView, props: true },
  ],
});

export default router;
