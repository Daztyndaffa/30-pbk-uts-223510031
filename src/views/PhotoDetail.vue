<template>
    <div class="photo-detail">
      <img :src="photoUrl" :alt="photo.title" class="full-size-photo">
    </div>
  </template>
  
  <script setup>
  import { useUserStore } from '../stores/userStore';
  import { ref, onMounted , watch } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  
  const userStore = useUserStore();
  const route = useRoute();
  const router = useRouter();
  
  const albumId = Number(route.params.albumId);
  const photoId = Number(route.params.photoId);
  const photoUrl = ref('');

  watch(() => userStore.photos, (newPhotos) => {
    console.log('New photos fetched:', newPhotos);
  });
  
  onMounted(async () => {
    await userStore.fetchPhotos(albumId); // Pastikan foto-foto sudah di-fetch
    const photo = userStore.photos.find(p => p.id === photoId);
    if (photo) {
      photoUrl.value = photo.url;
    } else {
      router.replace({ name: 'AlbumDetail', params: { albumId: String(albumId) } });
    }
  });
  
  </script>
  
  <style scoped>
  .photo-detail {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh; /* Sesuaikan tinggi sesuai kebutuhan */
    background-color: #333; /* Latar belakang gelap */
  }
  
  .full-size-photo {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
  </style>
  