import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AddProductPage from './pages/AddProductPage';
import EditProductPage from './pages/EditProductPage';
import ProductDetailPage from './pages/ProductDetailPage';

const App = () => {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif' }}>
      <nav style={{ padding: '15px', backgroundColor: '#333', color: 'white' }}>
        <h1 style={{ marginRight: '30px' }}>Quản Lý Sản Phẩm</h1>
        <Link to="/" style={{ color: 'white', marginRight: '15px', textDecoration: 'none' }}>Trang chủ</Link>
        <Link to="/add" style={{ color: 'white', textDecoration: 'none' }}>Thêm mới</Link>
      </nav>

      <main style={{ padding: '20px' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/add" element={<AddProductPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="/edit/:id" element={<EditProductPage />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;