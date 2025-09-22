import { Component, OnInit } from '@angular/core';
import { ListaProdottiService } from '../../services/lista-prodotti.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lista-prodotti',
  standalone: false,
  templateUrl: './lista-prodotti.component.html',
  styleUrl: './lista-prodotti.component.css'
})
export class ListaProdottiComponent implements OnInit {

  marcaSelezionata: string = 'Tutte';
  marche: string[] = [];
  prodotti: any[] = [];

  constructor(
    private route:ActivatedRoute,
    private listaProdottiService:ListaProdottiService
  ){  }

  ngOnInit(): void {
    // recupero il parametro "id" dall'URL
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));   // prendo l'id come numero
      if (id) {
        this.listaProdottiService.getAllByIdCategoria(id).subscribe((resp: any) => {
          console.log("Prodotti categoria:", id, resp);
          this.prodotti = resp.dati;
          const marcheSet = new Set(
            this.prodotti
            .map(p => p.marca?.descrizione)  // estraggo le marche
            .filter(m => !!m)               // filtro eventuali undefined
          );
          this.marche=['Tutte', ...Array.from(marcheSet)]; // converto in array e aggiungo 'Tutte' all'inizio

        });
      }
    });
  }

  get prodottiFiltrati() {
    if (this.marcaSelezionata === 'Tutte') {
      return this.prodotti;
    }
    return this.prodotti.filter(p => p.marca?.descrizione === this.marcaSelezionata);
  }

  capitalize(text: string): string {  //funzione per mettere la prima lettera MAIUSCOLA
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1);
}
}


