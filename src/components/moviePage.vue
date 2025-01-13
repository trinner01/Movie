<script>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import details from "../assets/detail.json";
import data from "../assets/data.json";

export default {
  setup() {
    const route = useRoute();
    const movie = ref(null);

    onMounted(() => {
      const movieId = parseInt(route.params.id);

      // Сначала ищем фильм в detail.json
      movie.value = details.find((item) => item.id === movieId);

      // Если фильма нет в detail.json, ищем его в data.json
      if (!movie.value) {
        movie.value = data.items.find((item) => item.id === movieId);
      }
    });

    return { movie };
  },
};
</script>

<template>
  <head>
    <title>Detail Page</title>
  </head>
  <main v-if="movie">
    <h1>{{ movie.name }}</h1>
    <img :src="movie.poster" :alt="movie.name" />
    <p>{{ movie.description }}</p>
    <div class="movie-info">
      <p>Рейтинг: ☆ {{ movie.rating.toFixed(1) }}</p>
      <p>Жанр: {{ movie.genre }}</p>
      <p>Длительность: {{ movie.duration }}</p>
    </div>

    <!-- Если есть дополнительные данные, выводим их -->
    <div v-if="movie.trivia || movie.actors">
      <h2>Дополнительная информация</h2>
      <div v-if="movie.trivia">
        <h3>Интересные факты:</h3>
        <ul>
          <li v-for="(fact, index) in movie.trivia" :key="index">{{ fact }}</li>
        </ul>
      </div>
      <div v-if="movie.actors">
        <h3>Актёры:</h3>
        <ul>
          <li v-for="actor in movie.actors" :key="actor.imdb_id">
            {{ actor.name }} 
            <a :href="`https://www.imdb.com/name/${actor.imdb_id}`" target="_blank">(IMDB)</a>
          </li>
        </ul>
      </div>
    </div>
  </main>
  <div v-else>
    <p>Фильм не найден</p>
  </div>
</template>

<style scoped>
main {
  color: white;
  padding: 20px;
}

img {
  max-width: 100%;
  border-radius: 8px;
}

.movie-info {
  margin-top: 20px;
  font-size: 1.2em;
}
</style>
