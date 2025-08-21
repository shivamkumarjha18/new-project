import { useState, useEffect } from "react";
import "../user/User.css";

function User() {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);

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
      setProducts([]);
    }
  }, [selectedCategory]);

  useEffect(() => {
    if (selectedSubcategory) {
      fetch(`http://localhost:8000/api/products/${selectedSubcategory}`)
        .then(res => res.json())
        .then(setProducts);
    }
  }, [selectedSubcategory]);

  return (
    <div className="user-container">
      <header className="navbar">
        <h1>MyShop</h1>
        <input type="text" placeholder="Search products..." className="search-bar" />
      </header>

      <div className="content">
        {/* Sidebar Categories */}
        <aside className="sidebar">
          <h3>Categories</h3>
          <ul>
            {categories.map(cat => (
              <li key={cat._id}>
                <button onClick={() => setSelectedCategory(cat._id)}>
                  {cat.name}
                </button>
              </li>
            ))}
          </ul>
          {selectedCategory && (
            <>
              <h3>Subcategories</h3>
              <ul>
                {subcategories.map(sub => (
                  <li key={sub._id}>
                    <button onClick={() => setSelectedSubcategory(sub._id)}>
                      {sub.name}
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}
        </aside>

        {/* Products */}
        <main className="products-grid">
          {products.map(prod => (
            <div key={prod._id} className="product-card">
              <div className="product-img">
                {prod.image ? (
                  <img src={prod.image} alt={prod.name} />
                ) : (
                  <div className="placeholder">No Image</div>
                )}
              </div>
              <div className="product-info">
                <h4>{prod.name}</h4>
                <p>${prod.price}</p>
                <button className="buy-btn">Add to Cart</button>
              </div>
            </div>
          ))}
        </main>
      </div>
    </div>
  );
}

export default User;
