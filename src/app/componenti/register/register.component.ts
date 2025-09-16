import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UtenteService } from '../../services/utente.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  rc = false;
  msg = '';

  constructor(private utente:UtenteService,
    private route:Router
  ){}

  onSubmit(signUp: NgForm) {
    console.log('Invio dati registrazione ' + signUp);

  }

  createUser(signUp:NgForm){
    this.utente.create({
      userName: signUp.form.value.username,
      pwd: signUp.form.value.password,
      email: signUp.form.value.email,
      role: 'USER'
    }).subscribe((resp:any)=>{
      this.rc = resp
    })
  }
}
