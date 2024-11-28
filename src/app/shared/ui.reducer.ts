import { createReducer, on } from '@ngrx/store';
import * as uiActions from './ui.actions';
import { state } from '@angular/animations';

export interface State {
  loading: boolean;
}

const initialState: State = {
  loading: false,
};

export const reducer = createReducer(
  initialState,
  on(uiActions.loadActon, (state) => ({ ...state, loading: true })),
  on(uiActions.stopLoadActon, (state) => ({ ...state, loading: false }))
);
