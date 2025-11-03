import { ProductFormPayload, FormErrors } from '../types/product';

export const validateProductForm = (product: ProductFormPayload): FormErrors => {
  const errors: FormErrors = {};

  if (!product.ten || product.ten.trim().length === 0) {
    errors.ten = 'Tên sản phẩm không được để trống.';
  } else if (product.ten.trim().length < 3) {
    errors.ten = 'Tên sản phẩm phải có ít nhất 3 ký tự.';
  }

  if (!product.danhMuc) {
    errors.danhMuc = 'Danh mục là bắt buộc.';
  }

  if (product.gia === undefined || product.gia === null) {
    errors.gia = 'Giá sản phẩm không được để trống.';
  } else if (isNaN(product.gia) || product.gia <= 0) {
    errors.gia = 'Giá phải là số dương.';
  }

  if (product.soLuong === undefined || product.soLuong === null) {
    errors.soLuong = 'Số lượng không được để trống.';
  } else if (isNaN(product.soLuong) || product.soLuong <= 0 || !Number.isInteger(product.soLuong)) {
    errors.soLuong = 'Số lượng phải là số nguyên dương.';
  }

  return errors;
};