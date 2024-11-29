import { createAction, props } from '@ngrx/store';

export const setProducts = createAction(
  '[PRODUCTS] setProducts',
  props<{ products: any }>()
);

export const addProductCart = createAction(
  '[PRODUCTS] addProductCart',
  props<{ product: any }>()
);
export const updateProductCart = createAction(
  '[PRODUCTS] updateProductCart',
  props<{ product: any }>()
);
export const deleteProductCart = createAction(
  '[PRODUCTS] deleteProductCart',
  props<{ product: any }>()
);

export const clearCart = createAction('[PRODUCTS] clearCart');

// DELIVERY ACTIONS

export const addDelivery = createAction(
  '[DELIVERY] setDeliverys',
  props<{ deliverys: any }>()
);

export const deleteDelivery = createAction(
  '[DELIVERY] setDeliverys',
  props<{ deliveryId: any }>()
);
