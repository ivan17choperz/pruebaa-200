import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'products',
    loadComponent: () =>
      import('./products/pages/products-home/products-home.component').then(
        (c) => c.ProductsHomeComponent
      ),
  },
  {
    path: 'deliverys',
    loadComponent: () =>
      import('./deliverys/pages/deliverys-home/deliverys-home.component').then(
        (c) => c.DeliverysHomeComponent
      ),
  },
];
