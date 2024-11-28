import { createReducer, on } from '@ngrx/store';
import * as productsActions from './products.actions';

export interface State {
  products: any[];
}

const initialState: State = {
  products: [],
};

export const reducer = createReducer(
  initialState,
  on(productsActions.loadProducts, (state) => ({ ...state }))
);
