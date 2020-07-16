<template>
  <div class="index container">
    <div class="card" v-for="cuisine in cuisines" :key="cuisine.id">
      <div class="card-content">
        <i class="material-icons delete" @click="deleteCuisine(cuisine.id)"
          >delete</i
        >
        <h2 class="pink-text">{{ cuisine.title }}</h2>
        <ul class="ingredients">
          <li v-for="(ing, index) in cuisine.ingredients" :key="index">
            <span class="chip">{{ ing }}</span>
          </li>
        </ul>
      </div>
      <span class="btn-floating btn-large halfway-fab indigo">
        <router-link
          :to="{ name: 'EditCuisine', params: { cuisine_slug: cuisine.slug } }"
        >
          <i class="material-icons edit">edit</i>
        </router-link>
      </span>
    </div>
  </div>
</template>

<script>
import db from "@/firebase/init";
export default {
  name: "Index",
  data() {
    return {
      cuisines: []
    };
  },
  methods: {
    deleteCuisine(id) {
      // delete doc from firestore
      db.collection("cuisines")
        .doc(id)
        .delete()
        .then(() => {
          this.cuisines = this.cuisines.filter(cuisine => {
            return cuisine.id != id;
          });
        });
    }
  },
  created() {
    db.collection("cuisines")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          // console.log(doc.data(), doc.id)
          let cuisine = doc.data();
          cuisine.id = doc.id;
          this.cuisines.push(cuisine);
        });
      });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.index {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-top: 60px;
}
.index .card {
  width: 406px;
  min-height: 211px;
  margin: 10px;
}
.index h2 {
  font-size: 1.8em;
  text-align: center;
  margin-top: 0;
}

.index .ingredients {
  margin: 30px auto;
}
.index .ingredients li {
  display: inline-block;
}

.index .delete {
  position: absolute;
  top: 4px;
  right: 4px;
  cursor: pointer;
  color: #aaa;
  font-size: 1.4em;
}
</style>
