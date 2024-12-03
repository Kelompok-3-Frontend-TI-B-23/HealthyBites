const Recipe = require("../models/recipeModel");
const mongoose = require('mongoose');
exports.uploadRecipe = async (req, res) => {
  try {
    // Parse resep dari form yang dikirimkan
    const recipe = JSON.parse(req.body.recipe);

    // Periksa jika ada file gambar yang di-upload
    if (req.file) {
      // Menyimpan path gambar relatif untuk disimpan di database
      recipe.img = `/uploads/${req.file.filename}`;
    }

    // Simpan data resep ke MongoDB
    const newRecipe = new Recipe(recipe);
    await newRecipe.save(); // Simpan ke MongoDB

    // Kirimkan response berhasil
    res.status(201).json({
      message: "Recipe uploaded successfully!",
      recipe: newRecipe, // Kirimkan data resep yang sudah disimpan
    });
  } catch (error) {
    console.error("Error uploading recipe:", error);
    res.status(500).json({ message: "Error uploading recipe", error });
  }
};



// Controller untuk mendapatkan resep berdasarkan judul
exports.getRecipeByTitle = async (req, res) => {
  try {
      const recipe = await Recipe.findOne({ title: req.params.title }); 
      if (!recipe) {
          return res.status(404).json({ msg: 'Recipe not found' });
      }
      res.json(recipe); 
  } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
  }
};


// Fungsi untuk mengambil semua resep
exports.getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes); 
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};



exports.getRecipeById = async (req, res) => {
  
  try {
    const recipeId = req.params.recipeId;
    console.log("Received recipeId:", recipeId); // Debugging
    

    // Cek apakah recipeId adalah ObjectId yang valid
    if (!mongoose.Types.ObjectId.isValid(recipeId)) {
      return res.status(400).json({ message: 'Invalid recipeId format' });
    }

    // Cari berdasarkan ObjectId
    const recipe = await Recipe.findById(recipeId); 

    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    res.json(recipe);  // Mengirimkan resep yang ditemukan
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};






