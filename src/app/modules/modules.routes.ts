import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./layout/layout.component').then((c) => c.LayoutComponent),
    children: [
      {
        path: 'store',
        loadComponent: () =>
          import('./products/pages/store/store.component').then(
            (c) => c.StoreComponent
          ),
      },
      {
        path: 'deliverys',
        loadComponent: () =>
          import(
            './deliverys/pages/deliverys-home/deliverys-home.component'
          ).then((c) => c.DeliverysHomeComponent),
      },
    ],
  },
];
