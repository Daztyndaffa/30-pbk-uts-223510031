<!-- TambahKegiatan.vue -->
<template>
  <div>
    <input type="text" v-model="namaKegiatan" />
    <button @click="tambah">Tambah</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      namaKegiatan: '',
    };
  },
  methods: {
    tambah() {
      if (this.namaKegiatan.trim() !== '') {
        this.$emit('tambah', this.namaKegiatan);
        this.namaKegiatan = '';
      }
    },
  },
};
</script>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
