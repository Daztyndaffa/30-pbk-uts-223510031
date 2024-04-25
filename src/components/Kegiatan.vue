<!-- Kegiatan.vue -->
<template>
    <div>
      <span :style="{ 'text-decoration': kegiatan.selesai ? 'line-through' : 'none' }">
        {{ kegiatan.nama }}
      </span>
      <button @click="batal">Batal</button>
      <input type="checkbox" v-model="kegiatan.selesai" @change="selesai" />
    </div>
  </template>
  
  <script>
  export default {
    props: ['kegiatan'],
    methods: {
      batal() {
        this.$emit('batal');
      },
      selesai() {
        this.$emit('selesai');
      },
    },
  };
  </script>
  