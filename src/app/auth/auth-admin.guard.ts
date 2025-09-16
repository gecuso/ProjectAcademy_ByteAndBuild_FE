import { CanActivateFn } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export const authAdminGuard: CanActivateFn = (route, state) => {
  const authServ = inject(AuthService)
  console.log("authAdminGuard: " + authServ.isRoleAdmin())  
  return authServ.isRoleAdmin();
};
