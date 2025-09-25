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
    if(signUp.form.value.password == signUp.form.value.confirm)
      this.createUser(signUp)
    else {
      this.rc = false
      this.msg = "le password non corrispondono"
    }
  }

  createUser(signUp:NgForm){
    this.utente.create({
      userName: signUp.form.value.username,
      pwd: signUp.form.value.password,
      email: signUp.form.value.email,
      indirizzo: signUp.form.value.indirizzo,
      telefono: signUp.form.value.telefono,
      role: 'USER'
    }).subscribe((resp:any)=>{
      this.rc = resp.rc
      if(resp.rc) {
        this.route.navigate(["/login"])
      } else
        this.msg= resp.msg
    })
  }

}
