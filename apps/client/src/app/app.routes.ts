import { Route } from '@angular/router';
import DefaultLayoutComponent from './layouts/default-layout/default-layout.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home',
      },
      {
        path: 'home',
        loadComponent: () => import('./pages/home/home.component'),
      },
      {
        path: 'second',
        loadComponent: () => import('./pages/second/second.component'),
      },
    ],
  },
];
