const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const nutritionSchema = new Schema({
  nutritionId: { type: Number, unique: true },
  title: { type: String, required: true },
  img: { type: String },
  calories: { type: Number, required: true },
  fat: { type: Number, required: true },
  saturatedFat: { type: Number, required: true },
  protein: { type: Number, required: true },
  cholesterol: { type: Number, required: true },
  sodium: { type: Number, required: true },
  funFacts: [String],
});

const Nutrition = mongoose.model('Nutrition', nutritionSchema);
module.exports = Nutrition;