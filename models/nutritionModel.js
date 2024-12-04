const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const nutritionSchema = new Schema({
  title: { type: String, required: true },
  img: { type: String }, // URL for the image
  calories: { type: Number, required: true },
  fat: { type: Number, required: true },
  saturatedFat: { type: Number, required: true },
  protein: { type: Number, required: true },
  cholesterol: { type: Number, required: true },
  sodium: { type: Number, required: true },
  funFacts: [String] // List of fun facts
});

const Nutrition = mongoose.model('Nutrition', nutritionSchema);
module.exports = Nutrition;