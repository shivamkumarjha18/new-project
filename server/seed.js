require('dotenv').config();
const mongoose = require('mongoose');
const Category = require('./models/Category');
const Subcategory = require('./models/Subcategory');
const Product = require('./models/Product');

const seed = async () => {
  await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  await Category.deleteMany();
  await Subcategory.deleteMany();
  await Product.deleteMany();

  const categories = [
    { name: 'Sneakers' },
    { name: 'Sandals' },
    { name: 'Formal Shoes' }
  ];
  const createdCategories = await Category.insertMany(categories);

  const subcategories = [
    { name: 'Running', category: createdCategories[0]._id },
    { name: 'Casual', category: createdCategories[0]._id },
    { name: 'Beach', category: createdCategories[1]._id },
    { name: 'Office', category: createdCategories[2]._id }
  ];
  const createdSubcategories = await Subcategory.insertMany(subcategories);

  const products = [
    { name: 'Nike Air Max', price: 120, image: '', subcategory: createdSubcategories[0]._id },
    { name: 'Adidas Ultraboost', price: 140, image: '', subcategory: createdSubcategories[0]._id },
    { name: 'Puma Casual', price: 90, image: '', subcategory: createdSubcategories[1]._id },
    { name: 'Reef Beach Sandal', price: 40, image: '', subcategory: createdSubcategories[2]._id },
    { name: 'Clarks Office Shoe', price: 110, image: '', subcategory: createdSubcategories[3]._id }
  ];
  await Product.insertMany(products);

  console.log('Database seeded!');
  mongoose.disconnect();
};

seed();
