import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'auth/login',
    loadComponent: () =>
      import('./modules/auth/login/login.component').then(
        (c) => c.LoginComponent
      ),
  },
  {
    path: 'modules',
    loadChildren: () =>
      import('./modules/modules.routes').then((m) => m.routes),
    canActivate: [authGuard],
  },
  {
    path: '**',
    redirectTo: 'auth/login',
  },
];
