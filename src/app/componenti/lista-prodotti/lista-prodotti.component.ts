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
    this.prodotti.map(p => p.categoria?.descrizione).filter(c => !!c)
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

    return filtri;
  }

  capitalize(text: string): string {
    //funzione per mettere la prima lettera MAIUSCOLA
    if (!text) return '';
    return text.charAt(0).toUpperCase() + text.slice(1);
  }
}
