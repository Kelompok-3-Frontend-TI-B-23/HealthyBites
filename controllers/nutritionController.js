const Nutrition = require("../models/nutritionModel");
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

exports.uploadNutrition = [
  upload.single('image'), 
  async (req, res) => {
    try {
      const nutritionInfo = {
        title: req.body.title,
        description: req.body.description,
        calories: req.body.calories,
        protein: req.body.protein,
        carbs: req.body.carbs,
        fat: req.body.fat,
      };

      if (req.file) {
        nutritionInfo.img = `/uploads/${req.file.filename}`;
      }

      const newNutrition = new Nutrition(nutritionInfo);
      await newNutrition.save();

      res.status(201).json({
        message: 'Nutrition info uploaded successfully!',
        nutrition: newNutrition,
      });
    } catch (error) {
      console.error('Error uploading nutrition info:', error);
      res.status(500).json({ message: 'Error uploading nutrition info', error });
    }
  },
];

exports.getNutritionByTitle = async (req, res) => {
  try {
      const nutrition = await Nutrition.findOne({ title: req.params.title }); 
      if (!nutrition) {
          return res.status(404).json({ msg: 'Nutrition info not found' });
      }
      res.json(nutrition); 
  } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
  }
};

exports.getAllNutrition = async (req, res) => {
  try {
    const nutritionInfo = await Nutrition.find();
    res.json(nutritionInfo); 
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
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
