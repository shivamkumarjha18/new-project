const express = require('express');
const router = express.Router();
const { getSubcategories, createSubcategory, updateSubcategory, deleteSubcategory } = require('../controllers/subcategoryController');


router.get('/:categoryId', getSubcategories);
router.post('/', createSubcategory);
router.put('/:id', updateSubcategory);
router.delete('/:id', deleteSubcategory);

module.exports = router;
