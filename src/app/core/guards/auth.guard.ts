import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { logout } from '../../modules/auth/auth.actions';

export const authGuard: CanActivateFn = (route, state) => {
  const store = inject(Store);
  const router = inject(Router);

  if (!localStorage.getItem('user')) {
    router.navigateByUrl('/auth/login');
    store.dispatch(logout());
    return false;
  }
  
  return true;
};
