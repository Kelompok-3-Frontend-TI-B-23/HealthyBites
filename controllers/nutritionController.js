const Nutrition = require("../models/nutritionModel");
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
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

exports.uploadNutrition = [
  upload.single('image'),
  async (req, res) => {
    try {
      const nutrition = {
        title: req.body.title,
        calories: req.body.calories,
        fat: req.body.fat,
        saturatedFat: req.body.saturatedFat,
        protein: req.body.protein,
        cholesterol: req.body.cholesterol,
        sodium: req.body.sodium,
        funFacts: req.body.funFacts.split(','),
      };

      if (req.file) {
        nutrition.image = `/uploads/${req.file.filename}`;
      }

      const newNutrition = new Nutrition(nutrition);
      await newNutrition.save();

      res.status(201).json({ message: 'Nutrition info uploaded successfully!', nutrition: newNutrition });
    } catch (error) {
      console.error('Error uploading nutrition:', error);
      res.status(500).json({ message: 'Error uploading nutrition', error });
    }
  }
];

exports.getAllNutrition = async (req, res) => {
  try {
    const nutritionData = await Nutrition.find();
    res.json(nutritionData);
  } catch (error) {
    console.error('Error fetching nutrition data:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.updateNutrition = async (req, res) => {
  try {
    const nutritionId = req.params.nutritionId;
    if (!mongoose.Types.ObjectId.isValid(nutritionId)) {
      return res.status(400).json({ message: 'Invalid nutritionId format' });
    }

    const updatedNutrition = await Nutrition.findByIdAndUpdate(nutritionId, req.body, { new: true });

    if (!updatedNutrition) {
      return res.status(404).json({ message: 'Nutrition info not found' });
    }

    res.json(updatedNutrition);
  } catch (error) {
    console.error('Error updating nutrition info:', error);
    res.status(500).json({ message: 'Error updating nutrition info', error });
  }
};

exports.deleteNutrition = async (req, res) => {
  try {
    const nutritionId = req.params.nutritionId;
    if (!mongoose.Types.ObjectId.isValid(nutritionId)) {
      return res.status(400).json({ message: 'Invalid nutritionId format' });
    }

    const deletedNutrition = await Nutrition.findByIdAndDelete(nutritionId);

    if (!deletedNutrition) {
      return res.status(404).json({ message: 'Nutrition info not found' });
    }

    res.json({ message: 'Nutrition info deleted successfully' });
  } catch (error) {
    console.error('Error deleting nutrition info:', error);
    res.status(500).json({ message: 'Error deleting nutrition info', error });
  }
};

exports.getNutritionById = async (req, res) => {
  try {
    const nutritionId = req.params.nutritionId;
    if (!mongoose.Types.ObjectId.isValid(nutritionId)) {
      return res.status(400).json({ message: 'Invalid nutritionId format' });
    }

    const nutrition = await Nutrition.findById(nutritionId); 

    if (!nutrition) {
      return res.status(404).json({ message: 'Nutrition info not found' });
    }

    res.json(nutrition);  
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};
