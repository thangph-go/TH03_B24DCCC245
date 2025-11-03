import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProductContext } from '../context/ProductContext';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { state } = useProductContext();

  const productId = Number(id);
  const product = state.products.find(p => p.id === productId);

  const formatPrice = (price: number) => {
    return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
  };

  if (isNaN(productId) || !product) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h2>Không tìm thấy sản phẩm</h2>
        <p>Sản phẩm có ID: {id} không tồn tại hoặc đã bị xóa.</p>
        <button onClick={() => navigate('/')} style={{ padding: '10px 20px', backgroundColor: '#333', color: 'white', border: 'none', cursor: 'pointer', marginTop: '15px' }}>
          Quay lại Trang chủ
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2 style={{ borderBottom: '2px solid #007bff', paddingBottom: '10px' }}>Chi Tiết Sản Phẩm: {product.ten}</h2>
      
      <div style={{ marginBottom: '15px' }}>
        <p><strong>ID:</strong> {product.id}</p>
        <p><strong>Danh Mục:</strong> {product.danhMuc}</p>
        <p><strong>Giá:</strong> {formatPrice(product.gia)}</p>
        <p><strong>Số Lượng Trong Kho:</strong> {product.soLuong}</p>
        <p><strong>Mô Tả Chi Tiết:</strong> {product.moTa || "Không có mô tả."}</p>
      </div>
      
      <button 
        onClick={() => navigate(`/edit/${product.id}`)} 
        style={{ padding: '10px 15px', backgroundColor: '#28a745', color: 'white', border: 'none', cursor: 'pointer', marginRight: '10px' }}
      >
        Chỉnh Sửa Sản Phẩm
      </button>
      
      <button 
        onClick={() => navigate('/')} 
        style={{ padding: '10px 15px', backgroundColor: '#6c757d', color: 'white', border: 'none', cursor: 'pointer' }}
      >
        Quay lại Danh sách
      </button>
    </div>
  );
};

export default ProductDetailPage;