import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLogged = false;
  isAdmin = false;

  constructor() { }

  isAuthentificated(){
    return this.isLogged
  }

  isRoleAdmin(){
    return this.isAdmin
  }

  setAuthentificated(){
    this.isLogged = true
    this.isAdmin = false
  }

  setAdmin() {
    this.isAdmin = true
  }

  resetAll(){
    this.isLogged = false
    this.isAdmin = false
  }

}
