<!-- App.vue -->
<template>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <div>
    <h1>Daftar <span>Kegiatan</span></h1>
    <TambahKegiatan @tambah="tambahKegiatan" />
    <div v-for="(kegiatan, index) in kegiatanList" :key="index">
      <Kegiatan
        :kegiatan="kegiatan"
        @batal="batalKegiatan"
        @selesai="selesaiKegiatan"
      />
    </div>
  </div>
</template>

<script>
import TambahKegiatan from './components/TambahKegiatan.vue';
import Kegiatan from './components/Kegiatan.vue';

export default {
  components: {
    TambahKegiatan,
    Kegiatan,
  },
  data() {
    return {
      kegiatanList: [],
    };
  },
  methods: {
    tambahKegiatan(namaKegiatan) {
      this.kegiatanList.push({
        nama: namaKegiatan,
        selesai: false,
      });
    },
    batalKegiatan(index) {
      this.kegiatanList.splice(index, 1);
    },
    selesaiKegiatan(index) {
      this.kegiatanList[index].selesai = true;
    },
  },
};
</script>


<style scoped>
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
h1{
  color: #646cff;
  margin-bottom: 50px;
}
span{
  color: #42b883;
}
</style>
