<template>
  <div>
    <Header />
    <main>
      <div class="movie-list">
        <div
          v-for="movie in movies"
          :key="movie.id"
          class="movie"
          @mouseenter="setActive(movie.id)"
          @mouseleave="removeActive(movie.id)"
          :class="{ active: activeMovies.includes(movie.id) }"
        >
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

<script>
import { ref, onMounted } from "vue";
import data from "../assets/data.json";
import Header from "../components/header.vue";
import Footer from "../components/footer.vue";

export default {
  components: {
    Header,
    Footer,
  },
  setup() {
    const movies = ref([]);
    const activeMovies = ref([]);

    const setActive = (id) => {
      if (!activeMovies.value.includes(id)) {
        activeMovies.value.push(id);
      }
    };

    const removeActive = (id) => {
      setTimeout(() => {
        const index = activeMovies.value.indexOf(id);
        if (index !== -1) {
          activeMovies.value.splice(index, 1);
        }
      }, none); // Задержка для завершения анимации
    };

    onMounted(() => {
      movies.value = data.items; // Загружаем фильмы из data.json
    });

    return {
      movies,
      activeMovies,
      setActive,
      removeActive,
    };
  },
};
</script>



<style scoped>
.movie-list {
  padding-top: 30px;
  padding-bottom: 30px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  align-items: stretch;
}

.movie {
  padding: 10px;
  position: relative;
  border: 1px solid #444;
  border-radius: 25px;
  background-color: #121212;
  display: flex;
  flex-direction: column;
  height: 500px;
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
  z-index: 10; /* Гарантируем, что карточка выше всего */
  overflow: hidden; /* Скрываем всё, что выходит за пределы карточки */
}

.movie:hover {
  transform: translate(-10px, -10px);
  box-shadow: 10px 10px 0 0 #6c39e5;
}

.movie:hover {
  transform: translate(-10px, -10px);
}

.movie.active {
  border: 3px solid #6c39e5;
}

.movie-description{
  padding-bottom: 10px;
}

.movie-poster {
  width: 100%;
  height: 50%;
  border-radius: 25px;
  object-fit: cover;
}

.movie-info {
  gap: 10px;
  display: flex;
  position: absolute;
  bottom: 0;
  padding-bottom: 20px;
}

.rating{
  padding: 4px;
  border-radius: 20px;
  color: white;
  display: inline-block;
}

.genre,
.duration {
  border-radius: 20px;
  font-size: 0.9em;
  display: inline-block;
  padding: 4px;
}
.genre{
  background: #2880f3;
}
.duration{
  background: #7438f8;
}

@media (min-width: 1518){
  .movie{
    height: 550px;
  }
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