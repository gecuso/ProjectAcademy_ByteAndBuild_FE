import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dettaglio-prodotto',
  standalone: false,
  templateUrl: './dettaglio-prodotto.component.html',
  styleUrl: './dettaglio-prodotto.component.css',
})
export class DettaglioProdottoComponent {
  prodotto: any;
  quantita: number = 1;
  showModal = false;

  constructor(private router: Router) {}

  ngOnInit() {
    this.prodotto = {
      titolo: 'HP Pavilion 13"',
      descrizione: 'Intel i3, 8GB RAM, 128GB SSD',
      marca: 'HP',
      prezzo: 1000,
      disponibilita: 0,
      immagine:
        'https://i5.walmartimages.com/seo/HP-Pavilion-13-3-FHD-Intel-Core-i3-8GB-RAM-128GB-SSD-Silver_906cf222-d138-430a-8146-d129b0cca3a2_2.f838f300a6e31f50074faf4091a1da7b.jpeg',
    };
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
}
