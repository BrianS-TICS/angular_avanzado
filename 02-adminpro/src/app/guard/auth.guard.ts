import { CanActivateFn, Router } from '@angular/router';
import { UsersService } from '../services/users.service';
import { inject } from '@angular/core';
import { tap } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {

  const userService = inject(UsersService);
  const router = inject(Router)

  return userService.validateUserToken()
    .pipe(
      tap((isAuthenticated: boolean) => {
        if (!isAuthenticated) {
          router.navigateByUrl('login');
        }
      })
    );
    
}