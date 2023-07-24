import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  // return localStorage.getItem('token') !== null;
  let _router = inject(Router);
  const loginStat = localStorage.getItem('token') !== null;
  if (loginStat) {
    return true;
  } else {
    _router.navigate(['/']);
    localStorage.removeItem('token');
    return false;
  }
};
