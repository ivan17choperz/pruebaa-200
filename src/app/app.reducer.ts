import { ActionReducerMap } from '@ngrx/store';

import * as UI from './shared/ui.reducer';
import * as AUTH from './modules/auth/auth.reducer';
export interface AppGloblalState {
  ui: UI.State;
  auth: AUTH.State;
}

export const initialState: ActionReducerMap<AppGloblalState> = {
  ui: UI.reducer,
  auth: AUTH.reducer,
};
