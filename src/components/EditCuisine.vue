<template>
  <div v-if="cuisine" class="edit-cuisine container">
    <h2>Edit Cuisine {{ cuisine.title }}</h2>
    <form action @submit.prevent="editCuisine">
      <div class="field title">
        <label for="title">Smoothie title:</label>
        <input type="text" name="title" id v-model="cuisine.title" />
      </div>
      <div
        v-for="(ing, index) in cuisine.ingredients"
        :key="index"
        class="field"
      >
        <label for="ingredient">Ingredient:</label>
        <input
          type="text"
          name="ingredient"
          v-model="cuisine.ingredients[index]"
        />
        <i class="material-icons delete" @click="deleteIng(ing)">delete</i>
      </div>
      <div class="field add-ingredient">
        <label for="add-ingredient">Add an ingredient:</label>
        <input
          type="text"
          name="add-ingredient"
          @keydown.tab.prevent="addIng"
          v-model="another"
        />
        <i class="material-icons delete" @click="addIng">add</i>
      </div>
      <div class="field center-align">
        <p v-if="feedback" class="red-text">{{ feedback }}</p>
        <button class="btn indigo">UPDATE CUISINE</button>
      </div>
    </form>
  </div>
</template>

<script>
import db from "@/firebase/init";
import slugify from "slugify";
export default {
  name: "EditCuisine",
  data() {
    return {
      cuisine: null,
      another: null,
      feedback: null
    };
  },
  methods: {
    editCuisine() {
      if (this.cuisine.title) {
        this.feedback = "";
        this.cuisine.slug = slugify(this.cuisine.title, {
          replacement: "-",
          remove: /[$*+~.()'"!\-:@]/g,
          lower: true
        });
        db.collection("cuisines")
          .doc(this.cuisine.id)
          .update({
            title: this.cuisine.title,
            ingredients: this.cuisine.ingredients,
            slug: this.cuisine.slug
          })
          .then(() => {
            this.$router.push({ name: "Index" });
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.feedback = "Please must enter a cuisines title";
      }
    },
    addIng() {
      if (this.another) {
        this.cuisine.ingredients.push(this.another);
        this.another = "";
      } else {
        this.feedback = "The ingredient field empty";
      }
    },
    deleteIng(ing) {
      this.cuisine.ingredients = this.cuisine.ingredients.filter(ingredient => {
        return ingredient != ing;
      });
    }
  },
  created() {
    let ref = db
      .collection("cuisines")
      .where("slug", "==", this.$route.params.cuisine_slug);
    ref.get().then(snapshot => {
      snapshot.forEach(doc => {
        this.cuisine = doc.data();
        this.cuisine.id = doc.id;
      });
    });
  }
};
</script>

<style>
.edit-cuisine {
  margin-top: 60px;
  padding: 20px;
  max-width: 500px;
}
.edit-cuisine h2 {
  font-size: 2em;
  margin: 20px auto;
}

.edit-cuisine .field {
  margin: 20px auto;
  position: relative;
}

.edit-cuisine .delete {
  position: absolute;
  right: 0;
  bottom: 16px;
  color: #aaa;
  font-size: 1.4em;
  cursor: pointer;
}
</style>
