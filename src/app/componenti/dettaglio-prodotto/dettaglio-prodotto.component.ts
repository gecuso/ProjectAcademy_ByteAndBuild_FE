import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ListaProdottiService } from '../../services/lista-prodotti.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-dettaglio-prodotto',
  standalone: false,
  templateUrl: './dettaglio-prodotto.component.html',
  styleUrl: './dettaglio-prodotto.component.css',
})
export class DettaglioProdottoComponent implements OnInit {
  prodotto: any;
  quantita: number = 1;
  showModal = false;

  constructor(
    private route: ActivatedRoute,
    private prodottoService: ListaProdottiService,
    private router: Router,
    private indietro: Location
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.prodottoService.getById(id).subscribe({
        next: (resp: any) => {
          if (resp.dati) {
            this.prodotto = resp.dati;
          } else {
            console.error('Prodotto non trovato:', resp.msg);
          }
        },
        error: (err) => {
          console.error('Errore HTTP:', err.message);
        },
      });
    }
  }

  aggiungiAlCarrello() {
    this.showModal = true;
  }

  continuaAcquisti() {
    this.showModal = false;
  }

  vaiAlCarrello() {
    this.router.navigate(['/carrello']);
  }

  capitalize(text: string): string {
    //funzione per mettere la prima lettera MAIUSCOLA
    if (!text) return '';
    return text.charAt(0).toUpperCase() + text.slice(1);
  }
  
  tornaIndietro() {
  this.indietro.back();
}
}
