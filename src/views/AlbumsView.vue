<template>
  <h2>Albums</h2>
  <div class="albums">
    <ul>
      <li v-for="(album, index) in albums" :key="album.id" class="album-item" @click="goToAlbumDetail(album.id)">
        <span class="album-index">{{ index + 1 }}.</span> <!-- Nomor atau tanda untuk setiap album -->
        <span class="album-title">{{ album.title }}</span> <!-- Judul album -->
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useUserStore } from '../stores/userStore';
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';

const userStore = useUserStore();
const router = useRouter();

// Fetch all albums when component is mounted
onMounted(() => {
  userStore.fetchAllAlbums();
});

const albums = userStore.albums;

const goToAlbumDetail = (albumId) => {
  router.push({ name: 'AlbumDetail', params: { albumId: String(albumId) } });
};
</script>

<style scoped>
.albums {
  display: flex;
  justify-content: center;
}

ul {
  list-style-type: none;
  padding: 0;
}
h2 {
  color: #82c91e;
  text-align: center;
  margin-bottom: 20px;
}

.album-item {
  cursor: pointer;
  margin: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  display: flex;
  align-items: center;
}

.album-index {
  margin-right: 10px;
}

.album-title {
  flex: 1;
}
</style>
