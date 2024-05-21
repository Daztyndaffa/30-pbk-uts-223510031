<template>
    <div>
      <div class="input-section">
        <h2 class="section-title">Add_List</h2>
        <div class="input-container">
          <input type="text" v-model="namaKegiatan" placeholder="Apa Kegiatanmu hari ini!" class="input-kegiatan">
          <button @click="tambahKegiatan" class="btn-tambah">+</button>
        </div>
      </div>
  
      <div class="list-section">
        <h1>Daftar <span>Kegiatan</span></h1>
        <ul>
          <li v-for="(kegiatan, index) in filteredKegiatanList" :key="index" class="daftar-kegiatan">
            <div class="kegiatan-info">
              <span class="span" :style="{ textDecoration: kegiatan.selesai ? 'line-through' : 'none' }">{{ kegiatan.nama }}</span>
              <button @click="batalkanKegiatan(index)" class="btn-batalkan">X</button>
            </div>
            <input type="checkbox" v-model="kegiatan.selesai" class="checkbox-selesai">
          </li>
        </ul>
        <button @click="toggleFilter" class="btn-filter" :class="{ active: filterAktif }">{{ filterAktif ? 'Show all' : 'Hide completed' }}</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  
  const namaKegiatan = ref('');
  const kegiatanList = ref([]);
  const filterAktif = ref(false);
  
  const tambahKegiatan = () => {
    if (namaKegiatan.value.trim() !== '') {
      kegiatanList.value.push({ nama: namaKegiatan.value, selesai: false });
      namaKegiatan.value = '';
    }
  };
  
  const batalkanKegiatan = (index) => {
    kegiatanList.value.splice(index, 1);
  };
  
  const toggleFilter = () => {
    filterAktif.value = !filterAktif.value;
  };
  
  const filteredKegiatanList = computed(() => {
    if (filterAktif.value) {
      return kegiatanList.value.filter(kegiatan => !kegiatan.selesai);
    } else {
      return kegiatanList.value;
    }
  });
  </script>
  
  <style scoped>
.input-section {
  margin: 20px 0;
}
.input-container {
  display: flex;
}
.input-kegiatan {
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #333;
  color: #fff;
}
.btn-tambah {
  padding: 10px;
  background-color: #42b883;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  margin-left: 10px;
}
.list-section {
  margin: 20px 0;
}
.section-title {
  font-size: 1.5em;
  color: #42b883;
}
.daftar-kegiatan {
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #444;
  color: #fff;
  transition: background-color 0.3s;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.daftar-kegiatan:hover {
  background-color: #555;
}
.kegiatan-info {
  display: flex;
  align-items: center;
}
.btn-batalkan {
  margin-left: 10px;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.checkbox-selesai {
  margin-left: 10px;
}
.btn-filter {
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #42b883;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}
.btn-filter.active {
  background-color: #e74c3c;
}
</style>
