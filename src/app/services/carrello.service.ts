import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { CarrelloDTO, OggettoNelCarrelloDTO, OggettoNelCarrelloReq } from '../requests/general-req/general-req.component';

@Injectable({
  providedIn: 'root'
})
export class CarrelloService {

  //uso questo link perche di perse i metodi essenziali sono li dentro
  //solo svuota carrello viene usato in questa pagina (fra tutti i metodi di carrelloImpl)
  private url = "http://localhost:9090/rest/onc/"
  constructor(private http:HttpClient) {}


  //in general-req.component ho creato OggettoNelCarrelloReq per poi usarlo in altri componenti

  //FATTO
  //metodo per recuperare gli onc
  listByIdCarrello (id : number) : Observable<OggettoNelCarrelloReq[]> {
    return this.http.get<any>(this.url + 'getByIdCarrello?id=' + id);
  }

  //meotodo per recuperare il singolo ONC
  getByIdONC (id : number) {
    return this.http.get<any>(this.url + 'getById?id=' + id);
  }

  //metodo per rimuovere un onc
  deleteByIdONC (req : OggettoNelCarrelloReq) : void {
   
    this.http.delete(this.url + 'delete', {body : req}).subscribe(); //chiamo delete
 
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
      this.http.delete("http://localhost:9090/rest/carrello/svuotaCarrello?id=" + id).subscribe();
    }
    
  acquista (id : number) {
      this.http.get("http://localhost:9090/rest/carrello/acquista?id=" + id).subscribe();
    }

  
  
  
  getByIdUtente(idUtente: number) {
  return this.http.get<any>("http://localhost:9090/rest/carrello/getByIdUtente?id=" + idUtente);
}

  createONC (req : OggettoNelCarrelloReq) {
      console.log("dentro il createONC ",req);
      console.log(this.url+'create');
      return this.http.post(this.url + 'create', req).subscribe();
    }   
}
