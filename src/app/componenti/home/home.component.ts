import { Component } from '@angular/core';
import { ListaProdottiService } from '../../services/lista-prodotti.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  constructor(
    private route: ActivatedRoute,
    private listaProdottiService: ListaProdottiService
  ) {}
  prodotti: any[] = [];

  ngOnInit(): void {
    this.listaProdottiService.getAll().subscribe((resp: any) => {
      this.prodotti = resp.dati;
    });
  }

  capitalize(text: string): string {
    //funzione per mettere la prima lettera MAIUSCOLA
    if (!text) return '';
    return text.charAt(0).toUpperCase() + text.slice(1);
  }
}
