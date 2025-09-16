import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UtenteService } from '../services/utente.service';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  msg = '';

  constructor(
    private utente: UtenteService,
    private auth: AuthService,
    private router: Router
  ) {}

  onSubmit(signin: NgForm) {
    console.log('Invio dati registrazione ' + signin);

    this.auth.resetAll(); // elimina l'ultimo accesso con il login

    this.utente
      .signin({
        user: signin.form.value.username,
        pwd: signin.form.value.password,
      })
      .subscribe((resp: any) => {
        console.log(resp);
        if (resp.logged) {
          console.log('Utente loggato come: ' + resp.role);
          this.auth.setAuthentificated();
          if (resp.role == 'ADMIN') {
            this.auth.setAdmin();
          }
          if (resp.utente) {
            localStorage.setItem('userId', resp.utente.id);//salvo id utente per passarlo a getById
            localStorage.setItem('userEmail', resp.utente.email);
            localStorage.setItem('userName', resp.utente.userName);
          }
          this.router.navigate(['home']);
        } else {
          this.msg = 'user o password invalidi';
        }
      });
  }
}
