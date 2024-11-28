import { createAction } from '@ngrx/store';

export const login = createAction('[AUTH MODULE] login');

export const logout = createAction('[AUTH MODULE] logout');

export const userAuthenticated = createAction(
  '[AUTH MODULE] User Authenticated'
);
