import { Component, OnInit } from '@angular/core';
import { UtenteService } from '../../services/utente.service';
import { AuthService } from '../../auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-dettagli-utente',
  standalone: false,
  templateUrl: './dettagli-utente.component.html',
  styleUrls: ['./dettagli-utente.component.css']  // attenzione: styleUrls (con la s)
})
export class DettagliUtenteComponent implements OnInit{

  isAdmin: boolean = false;
  utente: any = null; // <-- dati dell’utente

  constructor(private authService: AuthService, private utenteService: UtenteService) {}

  ngOnInit() {
    this.authService.isAdmin$.subscribe(isAdmin => {
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
          } else {
            console.error('Errore API:', resp.msg);
          }
        },
        error: (err: HttpErrorResponse) => {
          console.error('Errore HTTP:', err.message);
        }
      });
    } else {
      console.warn('Nessun ID utente trovato nel localStorage');
    }
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
