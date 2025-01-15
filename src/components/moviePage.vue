<script>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import details from "../assets/detail.json";
import data from "../assets/data.json";
import Header from "../components/header.vue";
import Footer from "../components/footer.vue";

export default {
  components: { 
    Header, 
    Footer 
  },
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

        // Устанавливаем заголовок страницы с названием фильма
        if (movie.value) {
          document.title = `Detail Page`;
        }
    });

    return { movie };
  },
};
</script>

<template>
  <Header />
  <main v-if="movie">
    <div class="movie-info">
    <h1>{{ movie.name }}</h1>
    <img :src="movie.poster" :alt="movie.name"/> <br><br>
    <div class="rating" :style="{
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
    <div class="desc">
            <h1>Description</h1>
            <p>{{ movie.description }}</p>
            <div v-if="movie.trivia || movie.actors">
      <div v-if="movie.trivia">
        <h1>Trivia</h1>
        <ul>
          <li v-for="(fact, index) in movie.trivia" :key="index">{{ fact }}</li>
        </ul>
      </div>
      <div v-if="movie.actors">
        <h1>Actors</h1>
        <ul>
          <li v-for="actor in movie.actors" :key="actor.imdb_id">
            <a :href="`https://www.imdb.com/name/${actor.imdb_id}`" target="_blank">{{ actor.name }} </a>
          </li>
        </ul>
      </div>
    </div>
    </div>
  </main>
  <div v-else>
    <p>Фильм не найден</p>
  </div>
  <Footer />
</template>

<style scoped>
main {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  color: white;
  font-weight: bolder;
  padding: 20px;
  padding-left: 50px;
  align-items: flex-start;
  min-height: 77.7vh
}

img {
  border-radius: 10px;
  height: 400px;
  object-fit: cover;
}


.rating, .genre, .duration{
  padding: 4px;
  border-radius: 20px;
  color: white;
  display: inline-block;
  font-size: 0.8em;
  margin: 2px;
  width: max-content;
  text-align: center;
}
.genre{
  background: #2880f3;
}
.duration{
  background: #7438f8;
}
a{
  text-decoration: underline;
}
.desc{
    margin-top: 10px;
    flex: 1;
    max-width: 800px;
    padding-left: 50px;
}
footer {
  background: #292c31;
  height: 70px;
  margin-top: auto;
}
</style>
