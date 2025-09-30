import { Component, OnInit, OnDestroy } from '@angular/core';
import { CarrelloService } from '../../services/carrello.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-carrello',
  standalone: false,
  templateUrl: './carrello.component.html',
  styleUrls: ['./carrello.component.css'],
})
export class CarrelloComponent {

  //serve per connettersi al service
  private subscription: Subscription = new Subscription();

  //costruttore per usare il service
  constructor (
    private CarrelloService: CarrelloService
  ) {}

  oggettoNelCarrello = [
    { id: 1, nome: 'Intel i9', quantita: 2, immagine: 'aaa' },
    { id: 2, nome: 'Intel i7', quantita: 1, immagine: 'aaa' },
    { id: 3, nome: 'Intel i5', quantita: 3, immagine: 'aaa' }
  ];

  prodotti = [
    { nome: 'Intel i9', prezzo: 4.5 },
    { nome: 'Intel i7', prezzo: 3.9 },
    { nome: 'Intel i5', prezzo: 4.0 }
  ];

  






  // metodi_______________________________________________________________________

  rimuoviDalCarrello(id: number): void {
    this.oggettoNelCarrello = this.oggettoNelCarrello.filter(item => item.id !== id);
  }

  getTotalePrezzo(): number {
    return this.oggettoNelCarrello.reduce((tot, item) => {
      const prodotto = this.prodotti.find(p => p.nome === item.nome);
      return tot + (prodotto ? prodotto.prezzo * item.quantita : 0);
    }, 0);
  }

  getQuantitaProdotto(nomeProdotto: string): number {
    const item = this.oggettoNelCarrello.find(p => p.nome === nomeProdotto);
    return item ? item.quantita : 1;  // se non trovato, ritorna 1 per mostrare solo il prezzo senza quantità
  }

  // metodi_______________________________________________________________________

  ngOnInit(): void {
    const idCarrello = 1; // al momento fisso

    this.subscription = this.CarrelloService.listByIdCarrello(idCarrello).subscribe((data: any) => {
      this.oggettoNelCarrello = data;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
