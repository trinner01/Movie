<script>
import { ref, onMounted } from "vue";
import data from "../assets/data.json";
import Header from "../components/header.vue";
import Footer from "../components/footer.vue";

export default {
  components: { Header, Footer },
  setup() {
    const movies = ref([]);

    onMounted(() => {
      movies.value = data.items; // Загружаем фильмы из data.json
    });

    return {
      movies,
    };
  },
};
</script>

<template>
  <div>
    <Header />
    <main>
      <div class="movie-list">
        <div v-for="movie in movies" :key="movie.id" class="movie">
          <img class="movie-poster" :src="movie.poster" :alt="movie.name" />
          <h2 class="movie-name">
            <router-link :to="`/movie/${movie.id}`">{{ movie.name }}</router-link>
          </h2>
          <p class="movie-description">{{ movie.description }}</p>
          <div class="movie-info">
            <div
              class="rating"
              :style="{
                backgroundColor: movie.rating < 4.0
                  ? '#eb160f'
                  : movie.rating < 7.0
                  ? '#752dff'
                  : '#009e53',
              }"
            >
              ☆ {{ movie.rating.toFixed(1) }}
            </div>
            <div class="genre">🎞: {{ movie.genre }}</div>
            <div class="duration">⏱ {{ movie.duration }}</div>
          </div>
        </div>
      </div>
    </main>
    <Footer />
  </div>
</template>

<style scoped>
.movie-list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  align-items: stretch;
}

.movie {
  border: 1px solid #444;
  padding: 10px;
  border-radius: 8px;
  background-color: #222;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: 550ms;
}
.movie-list .movie:hover{
  transform: translateY(5);
}
.movie-poster {
  width: 100%;
  height: auto;
  border-radius: 8px;
}

.movie-info {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.rating {
  padding: 5px;
  border-radius: 4px;
  color: white;
  display: inline-block;
}

.genre,
.duration {
  font-size: 0.9em;
}

@media (max-width: 1200px) {
  .movie-list {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (max-width: 992px) {
  .movie-list {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .movie-list {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 576px) {
  .movie-list {
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>