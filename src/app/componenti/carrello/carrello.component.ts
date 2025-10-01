import { Component, OnInit, OnDestroy } from '@angular/core';
import { CarrelloService } from '../../services/carrello.service';
import { Subscription } from 'rxjs';
import { CarrelloDTO, OggettoNelCarrelloDTO, OggettoNelCarrelloReq } from '../../requests/general-req/general-req.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carrello',
  standalone: false,
  templateUrl: './carrello.component.html',
  styleUrls: ['./carrello.component.css'],
})
export class CarrelloComponent {

  //serve per connettersi al service
  private subscription: Subscription = new Subscription();
  ONCReq: OggettoNelCarrelloReq={id : 0, quantita : 0, idProdotto: 0, idCarrello:0};
  oggettoNelCarrello: OggettoNelCarrelloDTO[] = [];
  carrello: CarrelloDTO= {id:0,numeroProdotti:0,prezzoTotale:0, utente:{id:0,userName:'',pwd:'',currentpwd:'',email:'',indirizzo:'',telefono:'',role:''}};

  //costruttore per usare il service
  constructor (
    private carrelloService: CarrelloService,
    private router: Router,
  ) {}
  
  ngOnInit(): void {
    const userId = localStorage.getItem('userId');
    console.log(userId);
    this.carrelloService.getByIdUtente(Number(userId)).subscribe({
      next: carrello => {
        this.carrello = carrello.dati;
        console.log("ciao "+this.carrello.id);
        this.carrelloService.listByIdCarrello(this.carrello.id).subscribe((data: any) => {
        this.oggettoNelCarrello = data.dati;
        console.log("ciao2 "+this.oggettoNelCarrello[0].prodotto);
    });
      },
      error: err => console.error('Errore nel recupero del carrello', err)
    });
  }
  // metodi_______________________________________________________________________

  rimuoviDalCarrello(id: number): void {
    this.carrelloService.getByIdONC(id).subscribe({
      next: (oggettoDaEliminare) => {
        this.ONCReq.id = oggettoDaEliminare.dati.id;
        this.ONCReq.quantita = oggettoDaEliminare.dati.quantita;
        this.ONCReq.idProdotto = oggettoDaEliminare.dati.prodotto.id;
        this.ONCReq.idCarrello = oggettoDaEliminare.dati.carrello.id;
        console.log("da rimuovi carrello :"+this.ONCReq);
        this.carrelloService.deleteByIdONC(this.ONCReq); //chiamo delete
        location.reload();
        //this.router.navigate(['/carrello']);
      }
      });
    }

  svuotaCarrello(){
    console.log("svuota carrello: ",this.carrello.id)
    this.carrelloService.svuotaCarrello(Number(this.carrello.id));
    location.reload;
  }

  acquista(){

  }

}
