import { createReducer, on } from '@ngrx/store';
import * as productsActions from './store.actions';

export interface State {
  products: any[];
  cart: any[];
  deliverys: any[];
}

const initialState: State = {
  products: [],
  cart: [],
  deliverys: [],
};

export const reducer = createReducer(
  initialState,

  on(productsActions.setProducts, (state, { products }) => ({
    ...state,
    products,
  })),

  on(productsActions.addProductCart, (state, { product }) => ({
    ...state,
    cart: [...state.cart, product],
  })),

  on(productsActions.updateProductCart, (state, { product }) => ({
    ...state,
    cart: state.cart.map((p) => (p.id === product.id ? product : p)),
  })),

  on(productsActions.deleteProductCart, (state, { product }) => ({
    ...state,
    cart: state.cart.filter((p) => p !== product),
  })),

  on(productsActions.clearCart, (state) => ({
    ...state,
    cart: [],
  })),

  // delivery

  on(productsActions.addDelivery, (state, { deliverys }) => ({
    ...state,
    deliverys: [...state.deliverys, deliverys],
  }))
);