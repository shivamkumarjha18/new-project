import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);

  // Form states
  const [newCategory, setNewCategory] = useState('');
  const [editCategoryId, setEditCategoryId] = useState(null);
  const [editCategoryName, setEditCategoryName] = useState('');

  const [newSubcategory, setNewSubcategory] = useState('');
  const [editSubcategoryId, setEditSubcategoryId] = useState(null);
  const [editSubcategoryName, setEditSubcategoryName] = useState('');

  const [newProduct, setNewProduct] = useState({ name: '', price: '', image: '' });
  const [editProductId, setEditProductId] = useState(null);
  const [editProduct, setEditProduct] = useState({ name: '', price: '', image: '' });

  // Fetch categories
  useEffect(() => {
    fetch('http://localhost:8000/api/categories')
      .then(res => res.json())
      .then(setCategories);
  }, []);

  // Fetch subcategories
  useEffect(() => {
    if (selectedCategory) {
      fetch(`http://localhost:8000/api/subcategories/${selectedCategory}`)
        .then(res => res.json())
        .then(setSubcategories);
      setProducts([]);
      setSelectedSubcategory(null);
    }
  }, [selectedCategory]);

  // Fetch products
  useEffect(() => {
    if (selectedSubcategory) {
      fetch(`http://localhost:8000/api/products/${selectedSubcategory}`)
        .then(res => res.json())
        .then(setProducts);
    }
  }, [selectedSubcategory]);

  // Category CRUD
  const handleAddCategory = e => {
    e.preventDefault();
    fetch('http://localhost:8000/api/categories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newCategory })
    })
      .then(res => res.json())
      .then(cat => {
        setCategories([...categories, cat]);
        setNewCategory('');
      });
  };

  const handleEditCategory = cat => {
    setEditCategoryId(cat._id);
    setEditCategoryName(cat.name);
  };

  const handleUpdateCategory = e => {
    e.preventDefault();
    fetch(`http://localhost:8000/api/categories/${editCategoryId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: editCategoryName })
    })
      .then(res => res.json())
      .then(updated => {
        setCategories(categories.map(cat => cat._id === updated._id ? updated : cat));
        setEditCategoryId(null);
        setEditCategoryName('');
      });
  };

  const handleDeleteCategory = id => {
    fetch(`http://localhost:8000/api/categories/${id}`, { method: 'DELETE' })
      .then(() => setCategories(categories.filter(cat => cat._id !== id)));
  };

  // Subcategory CRUD
  const handleAddSubcategory = e => {
    e.preventDefault();
    fetch('http://localhost:8000/api/subcategories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newSubcategory, category: selectedCategory })
    })
      .then(res => res.json())
      .then(sub => {
        setSubcategories([...subcategories, sub]);
        setNewSubcategory('');
      });
  };

  const handleEditSubcategory = sub => {
    setEditSubcategoryId(sub._id);
    setEditSubcategoryName(sub.name);
  };

  const handleUpdateSubcategory = e => {
    e.preventDefault();
    fetch(`http://localhost:8000/api/subcategories/${editSubcategoryId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: editSubcategoryName })
    })
      .then(res => res.json())
      .then(updated => {
        setSubcategories(subcategories.map(sub => sub._id === updated._id ? updated : sub));
        setEditSubcategoryId(null);
        setEditSubcategoryName('');
      });
  };

  const handleDeleteSubcategory = id => {
    fetch(`http://localhost:8000/api/subcategories/${id}`, { method: 'DELETE' })
      .then(() => setSubcategories(subcategories.filter(sub => sub._id !== id)));
  };

  // Product CRUD
  const handleAddProduct = e => {
    e.preventDefault();
    fetch('http://localhost:8000/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...newProduct, subcategory: selectedSubcategory })
    })
      .then(res => res.json())
      .then(prod => {
        setProducts([...products, prod]);
        setNewProduct({ name: '', price: '', image: '' });
      });
  };

  const handleEditProduct = prod => {
    setEditProductId(prod._id);
    setEditProduct({ name: prod.name, price: prod.price, image: prod.image });
  };

  const handleUpdateProduct = e => {
    e.preventDefault();
    fetch(`http://localhost:8000/api/products/${editProductId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editProduct)
    })
      .then(res => res.json())
      .then(updated => {
        setProducts(products.map(prod => prod._id === updated._id ? updated : prod));
        setEditProductId(null);
        setEditProduct({ name: '', price: '', image: '' });
      });
  };

  const handleDeleteProduct = id => {
    fetch(`http://localhost:8000/api/products/${id}`, { method: 'DELETE' })
      .then(() => setProducts(products.filter(prod => prod._id !== id)));
  };

  return (
    <div className="container">
      <h1>Men Footwear</h1>
      <div className="flow">
        <div className="category">
          <h2>Category</h2>
          <form onSubmit={editCategoryId ? handleUpdateCategory : handleAddCategory} className="crud-form">
            <input
              type="text"
              value={editCategoryId ? editCategoryName : newCategory}
              onChange={e => editCategoryId ? setEditCategoryName(e.target.value) : setNewCategory(e.target.value)}
              placeholder="Add or edit category"
              required
            />
            <button type="submit">{editCategoryId ? 'Update' : 'Add'}</button>
            {editCategoryId && <button type="button" onClick={() => { setEditCategoryId(null); setEditCategoryName(''); }}>Cancel</button>}
          </form>
          <ul>
            {categories.map(cat => (
              <li key={cat._id}>
                <button onClick={() => setSelectedCategory(cat._id)} className={selectedCategory === cat._id ? 'active' : ''}>{cat.name}</button>
                <button onClick={() => handleEditCategory(cat)} className="edit-btn">Edit</button>
                <button onClick={() => handleDeleteCategory(cat._id)} className="delete-btn">Delete</button>
              </li>
            ))}
          </ul>
        </div>
        {selectedCategory && (
          <div className="subcategory">
            <h2>Subcategory</h2>
            <form onSubmit={editSubcategoryId ? handleUpdateSubcategory : handleAddSubcategory} className="crud-form">
              <input
                type="text"
                value={editSubcategoryId ? editSubcategoryName : newSubcategory}
                onChange={e => editSubcategoryId ? setEditSubcategoryName(e.target.value) : setNewSubcategory(e.target.value)}
                placeholder="Add or edit subcategory"
                required
              />
              <button type="submit">{editSubcategoryId ? 'Update' : 'Add'}</button>
              {editSubcategoryId && <button type="button" onClick={() => { setEditSubcategoryId(null); setEditSubcategoryName(''); }}>Cancel</button>}
            </form>
            <ul>
              {subcategories.map(sub => (
                <li key={sub._id}>
                  <button onClick={() => setSelectedSubcategory(sub._id)} className={selectedSubcategory === sub._id ? 'active' : ''}>{sub.name}</button>
                  <button onClick={() => handleEditSubcategory(sub)} className="edit-btn">Edit</button>
                  <button onClick={() => handleDeleteSubcategory(sub._id)} className="delete-btn">Delete</button>
                </li>
              ))}
            </ul>
          </div>
        )}
        {selectedSubcategory && (
          <div className="products">
            <h2>Products</h2>
            <form onSubmit={editProductId ? handleUpdateProduct : handleAddProduct} className="crud-form">
              <input
                type="text"
                value={editProductId ? editProduct.name : newProduct.name}
                onChange={e => editProductId ? setEditProduct({ ...editProduct, name: e.target.value }) : setNewProduct({ ...newProduct, name: e.target.value })}
                placeholder="Product name"
                required
              />
              <input
                type="number"
                value={editProductId ? editProduct.price : newProduct.price}
                onChange={e => editProductId ? setEditProduct({ ...editProduct, price: e.target.value }) : setNewProduct({ ...newProduct, price: e.target.value })}
                placeholder="Price"
                required
                min="0"
              />
              <input
                type="text"
                value={editProductId ? editProduct.image : newProduct.image}
                onChange={e => editProductId ? setEditProduct({ ...editProduct, image: e.target.value }) : setNewProduct({ ...newProduct, image: e.target.value })}
                placeholder="Image URL (optional)"
              />
              <button type="submit">{editProductId ? 'Update' : 'Add'}</button>
              {editProductId && <button type="button" onClick={() => { setEditProductId(null); setEditProduct({ name: '', price: '', image: '' }); }}>Cancel</button>}
            </form>
            <ul>
              {products.map(prod => (
                <li key={prod._id}>
                  <div className="product-card">
                    <div className="product-image">
                      {prod.image ? <img src={prod.image} alt={prod.name} /> : <div className="placeholder">No Image</div>}
                    </div>
                    <div className="product-info">
                      <span>{prod.name}</span>
                      <span>${prod.price}</span>
                    </div>
                    <button onClick={() => handleEditProduct(prod)} className="edit-btn">Edit</button>
                    <button onClick={() => handleDeleteProduct(prod._id)} className="delete-btn">Delete</button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
