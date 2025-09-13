import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-prodotti-component',
  standalone: false,
  templateUrl: './prodotti-component.component.html',
  styleUrl: './prodotti-component.component.css'
})
export class ProdottiComponentComponent implements OnInit{
   categoria: string = '';
  prodotti: any[] = []; // Questa è la tua lista completa di prodotti
  prodottiFiltrati: any[] = [];

  // Esempio: carica prodotti da un service o una lista statica
  tuttiIProdotti = [
    {
      id: 1,
      titolo: 'Laptop HP',
      categoria: 'laptop',
      prezzo: 899,
      disponibilita: 3,
      descrizione: 'Potente laptop HP',
      immagine: 'path_to_img'
    },
    {
      id: 2,
      titolo: 'iPhone 15',
      categoria: 'smartphone',
      prezzo: 1199,
      disponibilita: 5,
      descrizione: 'Ultimo iPhone',
      immagine: 'path_to_img'
    },
    // ... altri prodotti
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.categoria = params.get('categoria')?.toLowerCase() || '';
      this.filtraProdottiPerCategoria();
    });
  }

  filtraProdottiPerCategoria() {
    this.prodottiFiltrati = this.tuttiIProdotti.filter(
      p => p.categoria.toLowerCase() === this.categoria
    );
  }
}
