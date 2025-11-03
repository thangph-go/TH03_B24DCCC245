import { Product, ProductFormPayload } from '../types/product';

export enum ActionType {
  ADD_PRODUCT = 'ADD_PRODUCT',
  UPDATE_PRODUCT = 'UPDATE_PRODUCT',
  DELETE_PRODUCT = 'DELETE_PRODUCT',
}

export interface AddAction {
  type: ActionType.ADD_PRODUCT;
  payload: ProductFormPayload;
}

export interface UpdateAction {
  type: ActionType.UPDATE_PRODUCT;
  payload: Product;
}

export interface DeleteAction {
  type: ActionType.DELETE_PRODUCT;
  payload: { id: number };
}

export type ProductAction = AddAction | UpdateAction | DeleteAction;