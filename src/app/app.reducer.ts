import { ActionReducerMap } from '@ngrx/store';

import * as UI from './shared/ui.reducer';
import * as AUTH from './modules/auth/auth.reducer';
import * as STORE from './modules/products/store.reducer';
export interface AppGloblalState {
  ui: UI.State;
  auth: AUTH.State;
  store: STORE.State;
}

export const initialState: ActionReducerMap<AppGloblalState> = {
  ui: UI.reducer,
  auth: AUTH.reducer,
  store: STORE.reducer,
};
