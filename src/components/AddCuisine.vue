<template>
  <div class="add-cuisine container">
    <h2 class="center-align pink-text">Add New Cuisine Recipe</h2>
    <form action @submit.prevent="addCuisine">
      <div class="field title">
        <label for="title">Smoothie title:</label>
        <input type="text" name="title" id v-model="title" />
      </div>
      <div v-for="(ing, index) in ingredients" :key="index" class="field">
        <label for="ingredient">Ingredient:</label>
        <input type="text" name="ingredient" v-model="ingredients[index]" />
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
        <button class="btn indigo">ADD CUISINE</button>
      </div>
    </form>
  </div>
</template>

<script>
import db from "@/firebase/init";
import slugify from "slugify";
export default {
  name: "AddCuisine",
  data() {
    return {
      title: "",
      another: "",
      ingredients: [],
      feedback: "",
      slug: null
    };
  },
  methods: {
    addCuisine() {
      if (this.title) {
        this.feedback = "";
        this.slug = slugify(this.title, {
          replacement: "-",
          remove: /[$*+~.()'"!\-:@]/g,
          lower: true
        });
        db.collection("cuisines")
          .add({
            title: this.title,
            ingredients: this.ingredients,
            slug: this.slug
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
        this.ingredients.push(this.another);
        this.another = "";
      } else {
        this.feedback = "The ingredient field empty";
      }
    },
    deleteIng(ing) {
      this.ingredients = this.ingredients.filter(ingredient => {
        return ingredient != ing;
      });
    }
  }
};
</script>

<style>
.add-cuisine {
  margin-top: 60px;
  padding: 20px;
  max-width: 500px;
}
.add-cuisine h2 {
  font-size: 2em;
  margin: 20px auto;
}

.add-cuisine .field {
  margin: 20px auto;
  position: relative;
}

.add-cuisine .delete {
  position: absolute;
  right: 0;
  bottom: 16px;
  color: #aaa;
  font-size: 1.4em;
  cursor: pointer;
}
</style>
