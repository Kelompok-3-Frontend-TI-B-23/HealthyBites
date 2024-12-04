const Recipe = require("../models/recipeModel");
const mongoose = require('mongoose');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop());
  }
});

const upload = multer({ 
  storage: storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(file.mimetype)) {
      const error = new Error('Only images are allowed');
      error.code = 'LIMIT_FILE_TYPES';
      return cb(error, false);
    }
    cb(null, true);
  }
});


exports.uploadRecipe = [
  upload.single('image'), // Untuk menangani file gambar
  async (req, res) => {
    try {
      // Ambil data form dari req.body
      const recipe = {
        title: req.body.title,
        duration: req.body.duration,
        difficulty: req.body.difficulty,
        description: req.body.description,
        calories: req.body.calories,
        serving: req.body.serving,
        ingredients: req.body.ingredients.split('.'), 
        steps: req.body.steps.split('.'), 
        nutrition: {
          calories: req.body.nutritionCalories,
          carbs: req.body.nutritionCarbs,
          protein: req.body.nutritionProtein,
          fat: req.body.nutritionFat,
        },
      };

      // Periksa jika ada file gambar
      if (req.file) {
        recipe.img = `/uploads/${req.file.filename}`; 
      }

      // Simpan data ke MongoDB
      const newRecipe = new Recipe(recipe);
      await newRecipe.save();

      res.status(201).json({
        message: 'Recipe uploaded successfully!',
        recipe: newRecipe,
      });
    } catch (error) {
      console.error('Error uploading recipe:', error);
      res.status(500).json({ message: 'Error uploading recipe', error });
    }
  },
];

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

// Controller untuk memperbarui resep
exports.updateRecipe = async (req, res) => {
  try {
    const recipeId = req.params.recipeId;
    if (!mongoose.Types.ObjectId.isValid(recipeId)) {
      return res.status(400).json({ message: 'Invalid recipeId format' });
    }

    const updatedRecipe = await Recipe.findByIdAndUpdate(recipeId, req.body, { new: true });

    if (!updatedRecipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    res.json(updatedRecipe);
  } catch (error) {
    console.error('Error updating recipe:', error);
    res.status(500).json({ message: 'Error updating recipe', error });
  }
};

// Controller untuk menghapus resep
exports.deleteRecipe = async (req, res) => {
  try {
    const recipeId = req.params.recipeId;
    if (!mongoose.Types.ObjectId.isValid(recipeId)) {
      return res.status(400).json({ message: 'Invalid recipeId format' });
    }

    const deletedRecipe = await Recipe.findByIdAndDelete(recipeId);

    if (!deletedRecipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    res.json({ message: 'Recipe deleted successfully' });
  } catch (error) {
    console.error('Error deleting recipe:', error);
    res.status(500).json({ message: 'Error deleting recipe', error });
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






