import { Component, OnInit } from '@angular/core';
import { ListaProdottiService } from '../../services/lista-prodotti.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lista-prodotti',
  standalone: false,
  templateUrl: './lista-prodotti.component.html',
  styleUrl: './lista-prodotti.component.css',
})
export class ListaProdottiComponent implements OnInit {
  marcaSelezionata: string = 'Tutte';
  marche: string[] = [];
  mostraTutteLeMarche = false;
  prodotti: any[] = [];
  idParam: string | null = null; // per passare id
  categoriaSelezionata: string = 'Tutte';
  categorie: string[] = []; // array con le categorie caricate
  mostraTutteLeCategorie = false;
  paginaCorrente: number = 1; //pagina per visualizzare prodotti
  prodottiPerPagina: number = 9; //numero di prodotti visualizzabili per pagina
  prezzoMin: number = 0
  prezzoMax: number = 5000;

  constructor(
    private route: ActivatedRoute,
    private listaProdottiService: ListaProdottiService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.idParam = params.get('id');
      const id = this.idParam ? Number(this.idParam) : null;

      if (id) {
        // Se id è presente e diverso da 0 carico i prodotti filtrati per categoria
        this.listaProdottiService
          .getAllByIdCategoria(id)
          .subscribe((resp: any) => {
            this.prodotti = resp.dati;
            this.setupMarche();
          });
      } else {
        // Altrimenti carico TUTTI i prodotti
        this.listaProdottiService.getAll().subscribe((resp: any) => {
          this.prodotti = resp.dati;
          this.setupMarche();
          this.setupCategorie();
        });
      }
    });
  }

  setupMarche() {
    const marcheSet = new Set(
      this.prodotti.map((p) => p.marca?.descrizione).filter((m) => !!m)
    );
    this.marche = ['Tutte', ...Array.from(marcheSet)];
  }

  setupCategorie() {
    const categorieSet = new Set(
      this.prodotti.map((p) => p.categoria?.descrizione).filter((c) => !!c)
    );
    this.categorie = ['Tutte', ...Array.from(categorieSet)];
  }

  get prodottiFiltrati() {
    let filtri = this.prodotti;

    if (this.marcaSelezionata !== 'Tutte') {
      filtri = filtri.filter(
        (p) => p.marca?.descrizione === this.marcaSelezionata
      );
    }

    if (this.categoriaSelezionata && this.categoriaSelezionata !== 'Tutte') {
      filtri = filtri.filter(
        (p) => p.categoria?.descrizione === this.categoriaSelezionata
      );
    }

    if (this.prezzoMin !== null) {
      filtri = filtri.filter((p) => p.prezzo >= this.prezzoMin!);
    }

    if (this.prezzoMax !== null) {
      filtri = filtri.filter((p) => p.prezzo <= this.prezzoMax!);
    }

    // Applica paginazione
    const start = (this.paginaCorrente - 1) * this.prodottiPerPagina;
    return filtri.slice(start, start + this.prodottiPerPagina);
  }

  get numeroPagine(): number {
    const total = this.prodotti.filter((p) => {
      let valido = true;

      if (this.marcaSelezionata !== 'Tutte') {
        valido = valido && p.marca?.descrizione === this.marcaSelezionata;
      }

      if (this.categoriaSelezionata && this.categoriaSelezionata !== 'Tutte') {
        valido =
          valido && p.categoria?.descrizione === this.categoriaSelezionata;
      }

      if (this.prezzoMin !== null) {
        valido = valido && p.prezzo >= this.prezzoMin;
      }

      if (this.prezzoMax !== null) {
        valido = valido && p.prezzo <= this.prezzoMax;
      }

      return valido;
    }).length;

    return Math.ceil(total / this.prodottiPerPagina);
  }

  cambiaPagina(nuovaPagina: number) {
    this.paginaCorrente = nuovaPagina;

    // Scrolla in cima alla lista prodotti
    window.scrollTo({
      top: 0,
      behavior: 'smooth', //  'auto' senza animazione
    });
  }

  capitalize(text: string): string {
    //funzione per mettere la prima lettera MAIUSCOLA
    if (!text) return '';
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  
}
