const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-sequence')(mongoose);

const nutritionSchema = new Schema({
  nutritionId: { type: Number, unique: true },
  title: { type: String, required: true },
  description: { type: String },
  calories: { type: Number },
  protein: { type: Number },
  carbs: { type: Number },
  fat: { type: Number },
  img: { type: String }
});

nutritionSchema.plugin(autoIncrement, { inc_field: 'nutritionId' });

const Nutrition = mongoose.model('Nutrition', nutritionSchema);

module.exports = Nutrition;
