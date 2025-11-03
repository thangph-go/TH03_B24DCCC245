
import { ProductState, Product } from '../types/product';
import { ProductAction, ActionType } from './ProductActions';

export const productReducer = (state: ProductState, action: ProductAction): ProductState => {
  switch (action.type) {
    case ActionType.ADD_PRODUCT: {
      const maxId = state.products.length > 0
          ? Math.max(...state.products.map(p => p.id))
          : 0;
      const newProduct: Product = { ...action.payload, id: maxId + 1 };

      return {
        ...state,
        products: [...state.products, newProduct],
      };
    }

    case ActionType.UPDATE_PRODUCT: {
      return {
        ...state,
        products: state.products.map(p =>
          p.id === action.payload.id ? action.payload : p
        ),
      };
    }

    case ActionType.DELETE_PRODUCT: {
      return {
        ...state,
        products: state.products.filter(p => p.id !== action.payload.id),
      };
    }

    default:
      return state;
  }
};