import { Component, OnDestroy, OnInit } from '@angular/core';
import { ListaProdottiService } from '../../services/lista-prodotti.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ricerca',
  standalone: false,
  templateUrl: './ricerca.component.html',
  styleUrl: './ricerca.component.css'
})
export class RicercaComponent implements OnInit, OnDestroy{
  // proprietà legate al template
  marcaSelezionata: string = 'Tutte';
  marche: string[] = [];
  mostraTutteLeMarche = false;
  idParam: string | null = null; // per passare id
  prodotti: any[] = [];
  elementoCercato = "";

  categoriaSelezionata: string = 'Tutte';
  categorie: string[] = [];
  mostraTutteLeCategorie = false;

  // Subscription aggregator (per fare unsubscribe in ngOnDestroy)
  private subs = new Subscription();

  constructor(private listaProdottiService: ListaProdottiService, private route:ActivatedRoute) {}

  ngOnInit(): void {

  this.subs.add(
    this.route.queryParamMap.subscribe(params => {
      const descr = params.get('descrizione') || '';
      // evita chiamata inutile se è uguale a prima
      if (descr === this.elementoCercato) return;

      this.elementoCercato = descr;

      // chiamata al servizio per ricaricare i prodotti
      const s = this.listaProdottiService.listByFilter(this.elementoCercato)
        .subscribe((resp: any) => {
          this.prodotti = resp?.dati;
          this.setupMarche();
          this.setupCategorie();
        });
      this.subs.add(s);
    })
  );

  }

  setupMarche(): void {
    const marcheSet = new Set(
      this.prodotti.map((p) => p.marca?.descrizione).filter((m) => !!m)
    );
    this.marche = ['Tutte', ...Array.from(marcheSet)];
  }

  setupCategorie(): void {
    const categorieSet = new Set(
      this.prodotti.map((p) => p.categoria?.descrizione).filter((c) => !!c)
    );
    this.categorie = ['Tutte', ...Array.from(categorieSet)];
  }

  get prodottiFiltrati() {
    // filtra ulteriormente i prodotti se necessario
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
    if (!text) return '';
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  ngOnDestroy(): void {
    // cancella tutte le subscription accumulate
    this.subs.unsubscribe();
  }
}