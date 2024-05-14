<script>
export default {
  data() {
    return {
      namaKegiatan: '',
      kegiatanList: [],
      filterAktif: false,
      selectedUser: null,
      posts: [],
      users: [],
      showPost: false, // Menyimpan status tampilan bagian Post
      showTodos: true, // Menyimpan status tampilan bagian Todos (default ditampilkan saat halaman pertama dimuat)
    };z
  },
  mounted() {
    // Load users from API
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => (this.users = data));
  },
  computed: {
    filteredKegiatanList() {
      if (this.filterAktif) {
        return this.kegiatanList.filter(kegiatan => !kegiatan.selesai);
      } else {
        return this.kegiatanList;
      }
    }
  },
  methods: {
    tambahKegiatan() {
      if (this.namaKegiatan.trim() !== '') {
        this.kegiatanList.push({ nama: this.namaKegiatan, selesai: false });
        this.namaKegiatan = '';
      }
    },
    batalkanKegiatan(index) {
      this.kegiatanList.splice(index, 1);
    },
    toggleFilter() {
      this.filterAktif = !this.filterAktif;
    },
    showPostSection() {
      this.showPost = true;
      this.showTodos = false;
    },
    showTodosSection() {
      this.showPost = false;
      this.showTodos = true;
    },
    post() {
      if (this.selectedUser !== null) {
        fetch(`https://jsonplaceholder.typicode.com/posts?userId=${this.selectedUser}`)
          .then(response => response.json())
          .then(data => (this.posts = data));
      }
    },
  },
};
</script>

<template>
  <div class="container">
    <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
    </div>

    <!-- Tombol Post -->
    <button @click="showPostSection" class="btn-post-section">Post</button>
    <!-- Tombol Todos -->
    <button @click="showTodosSection" class="btn-todos-section">Todos</button>

    <!-- Bagian Post -->
    <div v-if="showPost" class="input-section">
      <h1 class="section-title"><span>Switch</span> User</h1>
      <select v-model="selectedUser" class="select-user">
        <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
      </select>
      <button @click="post" class="btn-post">Post</button>
    </div>

    <!-- Bagian Todos -->
    <div v-if="showTodos" class="input-section">
      <h2 class="section-title">Add_List</h2>
      <div class="input-container">
        <input type="text" v-model="namaKegiatan" placeholder="Apa Kegiatanmu hari ini!" class="input-kegiatan">
        <button @click="tambahKegiatan" class="btn-tambah">+</button>
      </div>
    </div>

    <div class="list-section" v-if="showTodos">
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
      <button @click="toggleFilter" class="btn-filter" :class="{ active: filterAktif }">{{ filteredKegiatanList ? 'Show all' : 'hideCompleted' }}</button>
    </div>

    <!-- Bagian Daftar Postingan -->
    <div v-if="showPost" class="list-section">
      <h2 class="section-title">Post</h2>
      <ul>
        <li v-for="(post, index) in posts" :key="index" class="daftar-post">
          <span>{{ post.title }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.done {
  text-decoration: line-through;
}
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
