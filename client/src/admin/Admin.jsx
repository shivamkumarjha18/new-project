import { useState, useEffect } from "react";
import "../admin/Admin.css";

function Admin() {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);

  const [newCategory, setNewCategory] = useState("");
  const [newSubcategory, setNewSubcategory] = useState("");
  const [newProduct, setNewProduct] = useState({ name: "", price: "", image: "" });

  const [editMode, setEditMode] = useState({ type: null, id: null }); // {type: "category/subcategory/product", id: "123"}

  // Fetch Categories
  useEffect(() => {
    fetch("http://localhost:8000/api/categories")
      .then(res => res.json())
      .then(setCategories);
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      fetch(`http://localhost:8000/api/subcategories/${selectedCategory}`)
        .then(res => res.json())
        .then(setSubcategories);
    }
  }, [selectedCategory]);

  useEffect(() => {
    if (selectedSubcategory) {
      fetch(`http://localhost:8000/api/products/${selectedSubcategory}`)
        .then(res => res.json())
        .then(setProducts);
    }
  }, [selectedSubcategory]);

  // ------------------ CATEGORY ------------------
  const addOrUpdateCategory = e => {
    e.preventDefault();

    if (editMode.type === "category") {
      // UPDATE
      fetch(`http://localhost:8000/api/categories/${editMode.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newCategory })
      })
        .then(res => res.json())
        .then(updated => {
          setCategories(categories.map(c => (c._id === updated._id ? updated : c)));
          setNewCategory("");
          setEditMode({ type: null, id: null });
        });
    } else {
      // ADD
      fetch("http://localhost:8000/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newCategory })
      })
        .then(res => res.json())
        .then(cat => {
          setCategories([...categories, cat]);
          setNewCategory("");
        });
    }
  };

  const deleteCategory = id => {
    fetch(`http://localhost:8000/api/categories/${id}`, { method: "DELETE" }).then(() => {
      setCategories(categories.filter(c => c._id !== id));
      if (selectedCategory === id) {
        setSelectedCategory(null);
        setSubcategories([]);
        setProducts([]);
      }
    });
  };

  // ------------------ SUBCATEGORY ------------------
  const addOrUpdateSubcategory = e => {
    e.preventDefault();

    if (editMode.type === "subcategory") {
      fetch(`http://localhost:8000/api/subcategories/${editMode.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newSubcategory, category: selectedCategory })
      })
        .then(res => res.json())
        .then(updated => {
          setSubcategories(subcategories.map(s => (s._id === updated._id ? updated : s)));
          setNewSubcategory("");
          setEditMode({ type: null, id: null });
        });
    } else {
      fetch("http://localhost:8000/api/subcategories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newSubcategory, category: selectedCategory })
      })
        .then(res => res.json())
        .then(sub => {
          setSubcategories([...subcategories, sub]);
          setNewSubcategory("");
        });
    }
  };

  const deleteSubcategory = id => {
    fetch(`http://localhost:8000/api/subcategories/${id}`, { method: "DELETE" }).then(() => {
      setSubcategories(subcategories.filter(s => s._id !== id));
      if (selectedSubcategory === id) {
        setSelectedSubcategory(null);
        setProducts([]);
      }
    });
  };

  // ------------------ PRODUCT ------------------
  const addOrUpdateProduct = e => {
    e.preventDefault();

    if (editMode.type === "product") {
      fetch(`http://localhost:8000/api/products/${editMode.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...newProduct, subcategory: selectedSubcategory })
      })
        .then(res => res.json())
        .then(updated => {
          setProducts(products.map(p => (p._id === updated._id ? updated : p)));
          setNewProduct({ name: "", price: "", image: "" });
          setEditMode({ type: null, id: null });
        });
    } else {
      fetch("http://localhost:8000/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...newProduct, subcategory: selectedSubcategory })
      })
        .then(res => res.json())
        .then(prod => {
          setProducts([...products, prod]);
          setNewProduct({ name: "", price: "", image: "" });
        });
    }
  };

  const deleteProduct = id => {
    fetch(`http://localhost:8000/api/products/${id}`, { method: "DELETE" }).then(() => {
      setProducts(products.filter(p => p._id !== id));
    });
  };

  return (
    <div className="admin-container">
      <h1>Admin Dashboard</h1>

      {/* Category Section */}
      <div className="section">
        <h2>Categories</h2>
        <form onSubmit={addOrUpdateCategory}>
          <input
            type="text"
            value={newCategory}
            onChange={e => setNewCategory(e.target.value)}
            placeholder="Add category"
            required
          />
          <button type="submit">{editMode.type === "category" ? "Update" : "Add"}</button>
        </form>
        <ul>
          {categories.map(cat => (
            <li key={cat._id}>
              <button onClick={() => setSelectedCategory(cat._id)}>{cat.name}</button>
              <button onClick={() => { setEditMode({ type: "category", id: cat._id }); setNewCategory(cat.name); }}>✏️</button>
              <button onClick={() => deleteCategory(cat._id)}>🗑️</button>
            </li>
          ))}
        </ul>
      </div>

      {/* Subcategory Section */}
      {selectedCategory && (
        <div className="section">
          <h2>Subcategories</h2>
          <form onSubmit={addOrUpdateSubcategory}>
            <input
              type="text"
              value={newSubcategory}
              onChange={e => setNewSubcategory(e.target.value)}
              placeholder="Add subcategory"
              required
            />
            <button type="submit">{editMode.type === "subcategory" ? "Update" : "Add"}</button>
          </form>
          <ul>
            {subcategories.map(sub => (
              <li key={sub._id}>
                <button onClick={() => setSelectedSubcategory(sub._id)}>{sub.name}</button>
                <button onClick={() => { setEditMode({ type: "subcategory", id: sub._id }); setNewSubcategory(sub.name); }}>✏️</button>
                <button onClick={() => deleteSubcategory(sub._id)}>🗑️</button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Products Section */}
      {selectedSubcategory && (
        <div className="section">
          <h2>Products</h2>
          <form onSubmit={addOrUpdateProduct}>
            <input
              type="text"
              value={newProduct.name}
              onChange={e => setNewProduct({ ...newProduct, name: e.target.value })}
              placeholder="Product name"
              required
            />
            <input
              type="number"
              value={newProduct.price}
              onChange={e => setNewProduct({ ...newProduct, price: e.target.value })}
              placeholder="Price"
              required
            />
            <input
              type="text"
              value={newProduct.image}
              onChange={e => setNewProduct({ ...newProduct, image: e.target.value })}
              placeholder="Image URL"
            />
            <button type="submit">{editMode.type === "product" ? "Update" : "Add"}</button>
          </form>
          <div className="product-list">
            {products.map(prod => (
              <div key={prod._id} className="product-card">
                {prod.image ? <img src={prod.image} alt={prod.name} /> : <div className="placeholder">No Image</div>}
                <p>{prod.name}</p>
                <p>${prod.price}</p>
                <button onClick={() => { setEditMode({ type: "product", id: prod._id }); setNewProduct({ name: prod.name, price: prod.price, image: prod.image }); }}>✏️</button>
                <button onClick={() => deleteProduct(prod._id)}>🗑️</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Admin;
