import { Component } from '@angular/core';

@Component({
  selector: 'app-dettagli-utente',
  standalone: false,
  templateUrl: './dettagli-utente.component.html',
  styleUrls: ['./dettagli-utente.component.css']  // attenzione: styleUrls (con la s)
})
export class DettagliUtenteComponent {
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
