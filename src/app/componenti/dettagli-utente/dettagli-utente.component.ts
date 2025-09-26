import { Component, OnInit } from '@angular/core';
import { UtenteService } from '../../services/utente.service';
import { AuthService } from '../../auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dettagli-utente',
  standalone: false,
  templateUrl: './dettagli-utente.component.html',
  styleUrls: ['./dettagli-utente.component.css'],
})
export class DettagliUtenteComponent implements OnInit {
  isAdmin: boolean = false;
  utente: any = null; // <-- dati dell’utente

  constructor(
    private authService: AuthService,
    private utenteService: UtenteService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  updateUserForm!: FormGroup;

  ngOnInit() {
    this.authService.isAdmin$.subscribe((isAdmin) => {
      this.isAdmin = isAdmin;
    });
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.utenteService.getById(+userId).subscribe({
        next: (resp: any) => {
          console.log('Risposta backend:', resp);
          if (resp.rc) {
            this.utente = resp.dati;
            console.log(this.utente);
            this.updateUserForm = this.fb.group({
              userName: [this.utente.userName, Validators.required],
              indirizzo: [this.utente.indirizzo],
              telefono: [this.utente.telefono] ,
              email: [this.utente.email],
              pwd: [''], // nuova password (opzionale)
              confirmPwd: [''], // conferma (opzionale)
              currentpwd: ['', Validators.required],
            });
          } else {
            console.error('Errore API:', resp.msg);
          }
        },
        error: (err: HttpErrorResponse) => {
          console.error('Errore HTTP:', err.message);
        },
      });
    } else {
      console.warn('Nessun ID utente trovato nel localStorage');
    }
  }

  deleteUser() {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.utenteService.deleteUser(+userId).subscribe({
        next: (resp: any) => {
          if (resp.rc) {
            alert('Utente eliminato con successo.');
            localStorage.removeItem('userId');
            this.closeModalDeleteUtente();
            this.authService.resetAll();
            this.router.navigate(['/home']);
          } else {
            console.error("Errore durante l'eliminazione:", resp.msg);
            alert('Errore: ' + resp.msg);
          }
        },
        error: (err: HttpErrorResponse) => {
          console.error('Errore HTTP:', err.message);
          alert('Errore durante la chiamata: ' + err.message);
        },
      });
    } else {
      alert('ID utente non trovato.');
    }
  }
  saveUserChanges() {
    const values = this.updateUserForm.value;

    // Se è stato inserito uno dei due campi password
    if (values.pwd || values.confirmPwd) {
      if (!values.pwd || !values.confirmPwd) {
        alert('Inserisci la nuova password e confermala.');
        return;
      }

      if (values.pwd !== values.confirmPwd) {
        alert('Le password non corrispondono.');
        return;
      }
    }

    const updatedUser = {
      id: +(localStorage.getItem('userId') ?? 0),
      userName: values.userName,
      indirizzo: values.indirizzo,
      telefono: values.telefono,
      email: values.email,
      pwd: values.pwd || null, // oppure lascia vuoto se non è cambiata
      role: this.utente.role,
      currentpwd: values.currentpwd,
    };
    this.utenteService.updateUser(updatedUser).subscribe({
      next: (resp: any) => {
        if (resp.rc) {
          alert('Profilo aggiornato con successo!');
          this.utente = { ...this.utente, ...updatedUser };
          this.closeModalUpdateUtente();
        } else {
          alert('Errore: ' + resp.msg);
        }
      },
      error: (err: HttpErrorResponse) => {
        alert('Errore nella modifica');
      },
    });
  }

  /* UTENTE */
  showModalUpdateUtente = false;
  showModalDeleteUtente = false;
  /* PC */
  showModalPC = false;
  /* PRODOTTI */
  showModalAddProdotto = false;
  showModalUpdateProdotto = false;
  showModalDeleteProdotto = false;
  opzioneSelezionata: string = '';

  /* UTENTE */
  openModalUpdateUtente() {
    this.showModalUpdateUtente = true;
    this.updateUserForm.patchValue({
      userName: this.utente.userName,
      indirizzo: this.utente.indirizzo,
      telefono: this.utente.telefono,
      email: this.utente.email,
      pwd: '',
      confirmPwd: '',
      currentpwd: '',
    });
  }

  closeModalUpdateUtente() {
    this.showModalUpdateUtente = false;
  }

  openModalDeleteUtente() {
    this.showModalDeleteUtente = true;
  }

  closeModalDeleteUtente() {
    this.showModalDeleteUtente = false;
  }

  /* PC */
  openModalPC() {
    this.showModalPC = true;
  }

  closeModalPC() {
    this.showModalPC = false;
  }

  /* PRODOTTI */
  openModalAddProdotto() {
    this.showModalAddProdotto = true;
  }

  closeModalAddProdotto() {
    this.showModalAddProdotto = false;
  }

  openModalUpdateProdotto() {
    this.showModalUpdateProdotto = true;
  }

  closeModalUpdateProdotto() {
    this.showModalUpdateProdotto = false;
  }

  openModalDeleteProdotto() {
    this.showModalDeleteProdotto = true;
  }

  closeModalDeleteProdotto() {
    this.showModalDeleteProdotto = false;
  }
}
