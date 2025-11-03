import React from 'react';
import { ProductAction } from '../context/ProductActions';

export type ProductCategory = 'Điện tử' | 'Quần áo' | 'Đồ ăn' | 'Sách' | 'Khác';
export const CATEGORIES: ProductCategory[] = ['Điện tử', 'Quần áo', 'Đồ ăn', 'Sách', 'Khác'];

export interface Product {
  id: number;
  ten: string;
  danhMuc: ProductCategory;
  gia: number;
  soLuong: number;
  moTa: string;
}

export interface ProductState {
  products: Product[];
}

export interface ProductContextType {
  state: ProductState;
  dispatch: React.Dispatch<ProductAction>;
}

export type ProductFormPayload = Omit<Product, 'id'>;

export type FormErrors = {
  [key in keyof ProductFormPayload]?: string;
};