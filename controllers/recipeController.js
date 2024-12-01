const Recipe = require("../models/recipeModel");

// exports.uploadRecipe = async (req, res) => {
//   try {
//     // Parse resep dari form
//     const recipe = JSON.parse(req.body.recipe);

//     // Periksa jika ada file gambar yang diunggah
//     if (req.file) {
//       recipe.img = `/uploads/${req.file.filename}`; // Simpan path gambar
//     }

//     // Simpan data ke MongoDB
//     const newRecipe = new Recipe(recipe);
//     await newRecipe.save();

//     res.status(201).json({
//       message: "Recipe uploaded successfully!",
//       recipe: newRecipe,
//     });
//   } catch (error) {
//     console.error("Error uploading recipe:", error);
//     res.status(500).json({ message: "Error uploading recipe", error });
//   }
// };



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
      const recipe = await Recipe.findOne({ title: req.params.title }); // Pastikan title sesuai
      if (!recipe) {
          return res.status(404).json({ msg: 'Recipe not found' });
      }
      res.json(recipe); // Kembalikan data
  } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
  }
};


// Fungsi untuk mengambil semua resep
exports.getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find(); // Mengambil semua data resep
    res.json(recipes);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};





  // // Fungsi untuk mengambil resep berdasarkan ID
// exports.getRecipeById = async (req, res) => {
//   try {
//     const recipe = await Recipe.findById(req.params.id); // Mencari berdasarkan ID
//     if (!recipe) {
//       return res.status(404).json({ msg: 'Recipe not found' });
//     }
//     res.json(recipe);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Server error');
//   }
// };