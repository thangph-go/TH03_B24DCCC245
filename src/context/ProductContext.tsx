import React, { createContext, useReducer, useContext } from 'react';
import { initialProducts } from '../data/initialProducts';
import { productReducer } from './productReducer';
import { ProductState, ProductContextType } from '../types/product';

const initialState: ProductState = {
  products: initialProducts,
};

export const ProductContext = createContext<ProductContextType | null>(null);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(productReducer, initialState);

  const contextValue: ProductContextType = {
    state,
    dispatch,
  };

  return (
    <ProductContext.Provider value={contextValue}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProductContext must be used within a ProductProvider');
  }
  return context;
};