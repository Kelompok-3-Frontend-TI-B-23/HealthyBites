const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-sequence')(mongoose); // Import plugin

// Definisikan schema dengan field `recipeId`
const recipeSchema = new Schema({
  recipeId: { type: Number, unique: true }, // ID custom, numerik
  title: { type: String, required: true },
  duration: { type: Number },
  difficulty: { type: String },
  description: { type: String },
  calories: { type: Number },
  serving: { type: Number },
  ingredients: [String],
  steps: [String],
  nutrition: {
    calories: Number,
    carbs: Number,
    protein: Number,
    fat: Number
  },
  img: { type: String } // Menambahkan field untuk gambar
});

// Gunakan plugin untuk auto increment
recipeSchema.plugin(autoIncrement, { inc_field: 'recipeId' }); // `recipeId` akan di-increment otomatis

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
