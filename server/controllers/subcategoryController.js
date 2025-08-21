const Subcategory = require('../models/Subcategory');


exports.getSubcategories = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const subcategories = await Subcategory.find({ category: categoryId });
    res.json(subcategories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createSubcategory = async (req, res) => {
  try {
    const subcategory = new Subcategory(req.body);
    await subcategory.save();
    res.status(201).json(subcategory);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateSubcategory = async (req, res) => {
  try {
    const subcategory = await Subcategory.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(subcategory);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteSubcategory = async (req, res) => {
  try {
    await Subcategory.findByIdAndDelete(req.params.id);
    res.json({ message: 'Subcategory deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
