import React from 'react';
import { Product } from '../../types/product';
import { useNavigate } from 'react-router-dom';
import { useProductContext } from '../../context/ProductContext';
import { ActionType } from '../../context/ProductActions'; 

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();
  const { dispatch } = useProductContext();

  const handleDelete = () => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa sản phẩm: ${product.ten}?`)) {
      dispatch({ 
        type: ActionType.DELETE_PRODUCT, 
        payload: { id: product.id } 
      });
    }
  };
  

  const formatPrice = (price: number) => {
    return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
  };

  return (
    <div style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', minWidth: '300px' }}>

      <h4 
        onClick={() => navigate(`/products/${product.id}`)} 
        style={{ cursor: 'pointer', color: '#007bff', textDecoration: 'none', marginBottom: '10px' }}
      >
        {product.ten}
      </h4>
      
      <p style={{ margin: '5px 0' }}><strong>Danh mục:</strong> {product.danhMuc}</p>
      <p style={{ margin: '5px 0' }}><strong>Giá:</strong> {formatPrice(product.gia)}</p>
      <p style={{ margin: '5px 0' }}><strong>Số lượng:</strong> {product.soLuong}</p>

      <div style={{ marginTop: '15px' }}>
        <button 
          onClick={() => navigate(`/products/${product.id}`)} 
          style={{ padding: '8px 12px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', marginRight: '10px', cursor: 'pointer' }}
        >
          Xem
        </button>

        <button 
          onClick={() => navigate(`/edit/${product.id}`)} 
          style={{ padding: '8px 12px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', marginRight: '10px', cursor: 'pointer' }}
        >
          Sửa
        </button>

        <button 
          onClick={handleDelete} 
          style={{ padding: '8px 12px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Xóa
        </button>
      </div>
    </div>
  );
};

export default ProductCard;