import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import ProductForm from '../components/forms/ProductForm';
import { useProductContext } from '../context/ProductContext';

const EditProductPage: React.FC = () => {

  const { id } = useParams<{ id: string }>();
  const productId = Number(id);
  const { state } = useProductContext();

  const productToEdit = state.products.find(p => p.id === productId);

  if (isNaN(productId) || !productToEdit) {
    return <Navigate to="/" replace />; 
  }

  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>Chỉnh Sửa: {productToEdit.ten}</h2>
      
      <ProductForm initialProduct={productToEdit} /> 
    </div>
  );
};

export default EditProductPage;