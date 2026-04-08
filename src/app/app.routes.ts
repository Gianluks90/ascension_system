import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/landing-page/landing-page').then(m => m.LandingPage)
    },
    {
        path: 'home',
        canActivate: [authGuard],
        loadComponent: () => import('./pages/home-page/home-page').then(m => m.HomePage)
    },
    {
        path: '**',
        redirectTo: ''
    }
];
