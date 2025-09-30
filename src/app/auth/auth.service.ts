import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  private isLoggedSubject = new BehaviorSubject<boolean>(false);
  private isAdminSubject = new BehaviorSubject<boolean>(false);

  isLogged$ = this.isLoggedSubject.asObservable();
  isAdmin$ = this.isAdminSubject.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    console.log('AuthService constructor');

    if (isPlatformBrowser(this.platformId)) {
      const isLoggedValue = localStorage.getItem('isLogged');
      const isAdminValue = localStorage.getItem('isAdmin');

      const isLogged = isLoggedValue === '1';
      const isAdmin = isAdminValue === '1';

      this.isLoggedSubject.next(isLogged);
      this.isAdminSubject.next(isAdmin);

      if (isLogged || isAdmin) {
        console.log('Token found in localStorage');
      } else {
        localStorage.setItem('isLogged', '0');
        localStorage.setItem('isAdmin', '0');
      }

      console.log('isLogged:', isLogged);
      console.log('isAdmin:', isAdmin);
    }
  }

  isAuthentificated(): boolean {
    return this.isLoggedSubject.getValue();
  }

  isRoleAdmin(): boolean {
    return this.isAdminSubject.getValue();
  }

  setAuthentificated(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('isLogged', '1');
      localStorage.setItem('isAdmin', '0');
    }
    this.isLoggedSubject.next(true);
    this.isAdminSubject.next(false);
  }

  setAdmin(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('isAdmin', '1');
    }
    this.isAdminSubject.next(true);
  }

  resetAll(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('isLogged', '0');
      localStorage.setItem('isAdmin', '0');
    }
    this.isLoggedSubject.next(false);
    this.isAdminSubject.next(false);
  }
}
