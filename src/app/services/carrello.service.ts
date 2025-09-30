import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { OggettoNelCarrelloReq } from '../requests/general-req/general-req.component';

@Injectable({
  providedIn: 'root'
})
export class CarrelloService {

  //uso questo link perche di perse i metodi essenziali sono li dentro
  //solo svuota carrello viene usato in questa pagina (fra tutti i metodi di carrelloImpl)
  private url = "localhost:9090/rest/onc/"

  constructor(private http:HttpClient) {}


  //in general-req.component ho creato OggettoNelCarrelloReq per poi usarlo in altri componenti

  //FATTO
  //metodo per recuperare gli onc
  listByIdCarrello (id : number) : Observable<OggettoNelCarrelloReq[]> {
    return this.http.get<{ oggettiNelCarrello : OggettoNelCarrelloReq[] }>(this.url + 'getByIdCarrello?id=' + id).pipe(
      map(response => response.oggettiNelCarrello || [])
    );
  }

  //meotodo per recuperare il singolo ONC
  getByIdONC (id : number) : Observable<OggettoNelCarrelloReq> {
    return this.http.get<{ oggettoNelCarrello : OggettoNelCarrelloReq }>(this.url + 'getById?id=' + id).pipe(
      map(response => response.oggettoNelCarrello)
    );

  }

  //metodo per rimuovere un onc
  deleteByIdONC (id : number) : void {
    //recupero l'oggettoNelCarrelloReq con getByIdONC 
    //per usarlo poi nell'eliminazione nella chiamata remove

    this.getByIdONC(id).subscribe({
      next: (oggettoDaEliminare) => {
        this.http.delete(this.url + 'delete', {body : oggettoDaEliminare}).subscribe(); //chiamo delete
      } //devo sottolineare che il delete ricieve un body, perche nel back-end voglio il req completo per aggiornare poi i dati di carrello
    });
  }

  //metodo per modificare la quantità
  modifyQuantitaONC (id : number, quant : number) {
    //recupero l'oggettoNelCarrelloReq con getByIdONC 
    //per usarlo poi nel cambiamento della quantità usando update

    this.getByIdONC(id).subscribe({

      next: (oggettoDaEliminare) => {
        oggettoDaEliminare.quantita = quant; //cambio la quantità

        this.http.put(this.url + 'update', oggettoDaEliminare).subscribe({ //chiamo update
          error : (err) => {
            console.error('Errore durante l\'aggiornamento della quantità:', err);
          }, //nel caso non vado l'update per ogni motivo ho messo un console.log()

          complete : () => {
            console.log('Quantità aggiornata.');
          }
        });
      }
    });
  }

  //svuota carrello
  svuotaCarrello (id : number) {
    this.listByIdCarrello(id).subscribe({ //recupero la lista di onc del carrello usando il suo id
      next : (listaONCdelCarrello) => {
        listaONCdelCarrello.forEach((onc) => { //li ciclo
          this.http.delete(this.url + 'delete' + onc.id).subscribe(); //faccio le chiamate per eliminarli
        });
      },

      complete : () => {
        //dopo che non ci sono più gli onc, posso svuotare il carrello (resettare i suoi campi)
        this.http.delete("localhost:9090/rest/carrello/" + 'delete' + id).subscribe();
      }
    });
  }







}
