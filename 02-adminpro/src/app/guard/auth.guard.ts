import { CanActivateFn, Router } from '@angular/router';
import { UsersService } from '../services/users.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {

  const userService = inject(UsersService);

  return userService.validateUserToken()

};
