import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  msg= "";

  onSubmit(param: NgForm) {
    console.log('Invio dati registrazione ' + param);
  }

}
