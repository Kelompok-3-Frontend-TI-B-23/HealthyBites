const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^\d{10,13}$/.test(v); // 10-13 digit angka
      },
      message: (angka) => `${angka.value} is not a valid phone number!`,
    },
  },
});


module.exports = mongoose.model('User', userSchema, 'users');
