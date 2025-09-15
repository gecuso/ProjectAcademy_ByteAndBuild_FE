import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  rc = false;
  msg = '';

  onSubmit(param: NgForm) {
    console.log('Invio dati registrazione ' + param);
  }
}
