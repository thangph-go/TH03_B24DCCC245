import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Product, ProductFormPayload, FormErrors, CATEGORIES } from '../../types/product';
import { validateProductForm } from '../../utils/validation';
import { useProductContext } from '../../context/ProductContext';
import { ActionType } from '../../context/ProductActions';

interface ProductFormProps {
  initialProduct?: Product;
}

const ProductForm: React.FC<ProductFormProps> = ({ initialProduct }) => {
  const navigate = useNavigate();
  const { dispatch } = useProductContext();

  const [formData, setFormData] = useState<ProductFormPayload>({
    ten: initialProduct?.ten || '',
    danhMuc: initialProduct?.danhMuc || CATEGORIES[0],
    gia: initialProduct?.gia || 0,
    soLuong: initialProduct?.soLuong || 0,
    moTa: initialProduct?.moTa || '',
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    const updatedValue = (name === 'gia' || name === 'soLuong') 
        ? (value === '' ? 0 : Number(value)) 
        : value;
    
    setFormData({
      ...formData,
      [name]: updatedValue,
    });
    
    if (errors[name as keyof ProductFormPayload]) {
      setErrors({ ...errors, [name]: undefined });
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const validationErrors = validateProductForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      console.log('Validation Failed', validationErrors);
      return;
    }

    if (initialProduct) {
      const updatedProduct: Product = { ...initialProduct, ...formData };
      dispatch({ 
        type: ActionType.UPDATE_PRODUCT,
        payload: updatedProduct 
      });
      console.log('Product Updated:', updatedProduct);
    } else {
      dispatch({ 
        type: ActionType.ADD_PRODUCT,
        payload: formData 
      });
      console.log('Product Added:', formData);
    }

    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '600px', margin: '20px auto', padding: '25px', border: '1px solid #ccc', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
      <h3>{initialProduct ? 'Chỉnh Sửa Sản Phẩm' : 'Thêm Sản Phẩm Mới'}</h3>
      
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Tên Sản Phẩm:</label>
        <input
          type="text"
          name="ten"
          value={formData.ten}
          onChange={handleChange}
          style={{ width: '100%', padding: '10px', border: errors.ten ? '1px solid red' : '1px solid #ccc', borderRadius: '4px' }}
        />
        {errors.ten && <p style={{ color: 'red', fontSize: '0.8em', marginTop: '5px' }}>{errors.ten}</p>}
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Danh Mục:</label>
        <select
          name="danhMuc"
          value={formData.danhMuc}
          onChange={handleChange}
          style={{ width: '100%', padding: '10px', border: errors.danhMuc ? '1px solid red' : '1px solid #ccc', borderRadius: '4px' }}
        >
          {CATEGORIES.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        {errors.danhMuc && <p style={{ color: 'red', fontSize: '0.8em', marginTop: '5px' }}>{errors.danhMuc}</p>}
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Giá (VNĐ):</label>
        <input
          type="number"
          name="gia"
          value={formData.gia || ''}
          onChange={handleChange}
          style={{ width: '100%', padding: '10px', border: errors.gia ? '1px solid red' : '1px solid #ccc', borderRadius: '4px' }}
          min="0"
        />
        {errors.gia && <p style={{ color: 'red', fontSize: '0.8em', marginTop: '5px' }}>{errors.gia}</p>}
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Số Lượng:</label>
        <input
          type="number"
          name="soLuong"
          value={formData.soLuong || ''}
          onChange={handleChange}
          style={{ width: '100%', padding: '10px', border: errors.soLuong ? '1px solid red' : '1px solid #ccc', borderRadius: '4px' }}
          min="0"
          step="1"
        />
        {errors.soLuong && <p style={{ color: 'red', fontSize: '0.8em', marginTop: '5px' }}>{errors.soLuong}</p>}
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Mô Tả:</label>
        <textarea
          name="moTa"
          value={formData.moTa}
          onChange={handleChange}
          style={{ width: '100%', padding: '10px', border: errors.moTa ? '1px solid red' : '1px solid #ccc', borderRadius: '4px' }}
          rows={4}
        />
      </div>

      <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#333', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '1em' }}>
        {initialProduct ? 'Cập Nhật Sản Phẩm' : 'Thêm Sản Phẩm'}
      </button>
    </form>
  );
};

export default ProductForm;