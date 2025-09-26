import { Component, OnInit } from '@angular/core';
import { ListaProdottiService } from '../../services/lista-prodotti.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  pcs: any[] = []; // Solo PC
  prodotti: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private listaProdottiService: ListaProdottiService
  ) {}

  ngOnInit(): void {
    //PC
    this.listaProdottiService.getAllByIdCategoria(13).subscribe((resp: any) => {
      this.pcs = resp.dati;
    });

    //prodotti
    this.listaProdottiService.getAll().subscribe((resp: any) => {
      this.prodotti = resp.dati.sort((a: any, b: any) => b.id - a.id);
      //ordino in base ad id, in ordine descrescente
    });
  }

  capitalize(text: string): string {
    //funzione per mettere la prima lettera MAIUSCOLA e dividere il testo se trova una Maiuscola
    if (!text) return '';
    const spaced = text.replace(/([A-Z])/g, ' $1'); // aggiunge uno spazio prima di ogni maiuscola
    const trimmed = spaced.trim(); // rimuove eventuali spazi iniziali
    return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
  }
}
