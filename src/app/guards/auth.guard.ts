import {
    ActivatedRouteSnapshot,
    CanActivateFn,
    Router,
    RouterStateSnapshot,
} from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const isUserAuthenticated: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) => {
    const authService = inject(AuthService);
    const router = inject(Router);
    console.log(`User logged in: ${authService.isLoggedIn()}`);
    return authService.isLoggedIn() ? true : router.parseUrl('/login');
};
