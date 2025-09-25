import { Component, OnDestroy, OnInit } from '@angular/core';
import { ListaProdottiService } from '../../services/lista-prodotti.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ricerca',
  standalone: false,
  templateUrl: './ricerca.component.html',
  styleUrl: './ricerca.component.css',
})
export class RicercaComponent implements OnInit, OnDestroy {
  // proprietà legate al template
  marcaSelezionata: string = 'Tutte';
  marche: string[] = [];
  mostraTutteLeMarche = false;
  idParam: string | null = null; // per passare id
  prodotti: any[] = [];
  elementoCercato = '';

  categoriaSelezionata: string = 'Tutte';
  categorie: string[] = [];
  mostraTutteLeCategorie = false;

  paginaCorrente: number = 1; //pagina per visualizzare prodotti
  prodottiPerPagina: number = 9; //numero di prodotti visualizzabili per pagina
  prezzoMin!: number;
  prezzoMax!: number;
  prezzoMinAssoluto: number = 0;
  prezzoMaxAssoluto: number = 0;
  caricamentoInCorso: boolean = true; //per non far visuallizare il messaggio nessun prodotto trovato 
  // prima che carichi i dati


  // Subscription aggregator (per fare unsubscribe in ngOnDestroy)
  private subs = new Subscription();

  constructor(
    private listaProdottiService: ListaProdottiService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.subs.add(
      this.route.queryParamMap.subscribe((params) => {
        const descr = params.get('descrizione') || '';
        // evita chiamata inutile se è uguale a prima
        if (descr === this.elementoCercato) return;

        this.elementoCercato = descr;

        // chiamata al servizio per ricaricare i prodotti
        const s = this.listaProdottiService
          .listByFilter(this.elementoCercato)
          .subscribe((resp: any) => {
            this.prodotti = resp?.dati;
            this.setupMarche();
            this.setupCategorie();
            this.calcolaPrezziAssoluti();
            this.caricamentoInCorso = false; // fine caricamento
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

    // Applica paginazione
    const start = (this.paginaCorrente - 1) * this.prodottiPerPagina;
    return filtri.slice(start, start + this.prodottiPerPagina);
  }

  calcolaPrezziAssoluti() {
    if (this.prodotti.length > 0) {
      this.prezzoMinAssoluto = Math.min(...this.prodotti.map((p) => p.prezzo));
      this.prezzoMaxAssoluto = Math.max(...this.prodotti.map((p) => p.prezzo));
      this.prezzoMin = this.prezzoMinAssoluto;
      this.prezzoMax = this.prezzoMaxAssoluto;
    }
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
    //funzione per mettere la prima lettera MAIUSCOLA e dividere il testo se trova una Maiuscola
    if (!text) return '';
    const spaced = text.replace(/([A-Z])/g, ' $1'); // aggiunge uno spazio prima di ogni maiuscola
    const trimmed = spaced.trim(); // rimuove eventuali spazi iniziali
    return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
  }

  ngOnDestroy(): void {
    // cancella tutte le subscription accumulate
    this.subs.unsubscribe();
  }
}
