import { createReducer, on } from '@ngrx/store';
import * as authActions from './auth.actions';

export interface State {
  authenticated: boolean;
}

const initialState: State = {
  authenticated: false,
};

export const reducer = createReducer(
  initialState,
  on(authActions.userAuthenticated, (state) => ({
    ...state,
    authenticated: true,
  })),
  on(authActions.logout, (state) => ({
    ...state,
    authenticated: false,
  }))
);
