
import React from 'react';
import ProductForm from '../components/forms/ProductForm';

const AddProductPage: React.FC = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Thêm Sản Phẩm Mới</h2>
      <ProductForm />
    </div>
  );
};

export default AddProductPage;