import React from 'react';
import { createRoot } from 'react-dom/client';
import Admin from './admin/Admin.jsx';
import User from './user/User.jsx';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <nav style={{ padding: "10px", background: "#232f3e" }}>
        <Link to="/user" style={{ color: "white", marginRight: "15px" }}>User</Link>
        <Link to="/admin" style={{ color: "white" }}>Admin</Link>
        
      </nav>
      <Routes>
        <Route path="/admin" element={<Admin />} />
        <Route path="/user" element={<User />} />
        <Route path="/" element={<User />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
