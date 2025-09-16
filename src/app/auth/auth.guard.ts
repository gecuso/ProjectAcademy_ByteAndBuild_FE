import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService)
  const router = inject(Router)
  console.log("authGuard: " + authService.isAuthentificated())
  if(!authService.isAuthentificated()){
    console.log("no logged")
    router.navigate(['/login'])
  }
  return authService.isAuthentificated();
};
