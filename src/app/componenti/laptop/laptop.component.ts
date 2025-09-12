import { Component } from '@angular/core';


@Component({
  selector: 'app-laptop',
  standalone: false,
  templateUrl: './laptop.component.html',
  styleUrl: './laptop.component.css'
})
export class LaptopComponent {
  
  marcaSelezionata: string = '';
  marche: string[] = ['Tutte', 'HP', 'Lenovo', 'Apple'];

  prodotti = [
    {
      id:0,
      titolo: 'HP Pavilion 13"',
      descrizione: 'Intel i3, 8GB RAM, 128GB SSD',
      marca: 'HP',
      prezzo: 1000,
      disponibilita: 3,
      immagine: 'https://i5.walmartimages.com/seo/HP-Pavilion-13-3-FHD-Intel-Core-i3-8GB-RAM-128GB-SSD-Silver_906cf222-d138-430a-8146-d129b0cca3a2_2.f838f300a6e31f50074faf4091a1da7b.jpeg'
    },
    {
      id:1,
      titolo: 'Lenovo IdeaPad',
      descrizione: 'Ryzen 5, 16GB RAM, 512GB SSD',
      marca: 'Lenovo',
      prezzo: 1000,
      disponibilita: 3,
      immagine: 'https://i5.walmartimages.com/seo/HP-Pavilion-13-3-FHD-Intel-Core-i3-8GB-RAM-128GB-SSD-Silver_906cf222-d138-430a-8146-d129b0cca3a2_2.f838f300a6e31f50074faf4091a1da7b.jpeg'
    },
   
    {
      id:2,
      titolo: 'MacBook Air',
      descrizione: 'Apple M1, 8GB RAM, 256GB SSD',
      marca: 'Apple',
      prezzo: 1000,
      disponibilita: 3,
      immagine: 'https://i5.walmartimages.com/seo/HP-Pavilion-13-3-FHD-Intel-Core-i3-8GB-RAM-128GB-SSD-Silver_906cf222-d138-430a-8146-d129b0cca3a2_2.f838f300a6e31f50074faf4091a1da7b.jpeg'
    },
    {
      id:3,
      titolo: 'MacBook Air',
      descrizione: 'Apple M1, 8GB RAM, 256GB SSD',
      marca: 'Apple',
      prezzo: 1000,
      disponibilita: 3,
      immagine: 'https://i5.walmartimages.com/seo/HP-Pavilion-13-3-FHD-Intel-Core-i3-8GB-RAM-128GB-SSD-Silver_906cf222-d138-430a-8146-d129b0cca3a2_2.f838f300a6e31f50074faf4091a1da7b.jpeg'
    },
    {
      id:4,
      titolo: 'MacBook Air',
      descrizione: 'Apple M1, 8GB RAM, 256GB SSD',
      marca: 'Apple',
      prezzo: 1000,
      disponibilita: 3,
      immagine: 'https://i5.walmartimages.com/seo/HP-Pavilion-13-3-FHD-Intel-Core-i3-8GB-RAM-128GB-SSD-Silver_906cf222-d138-430a-8146-d129b0cca3a2_2.f838f300a6e31f50074faf4091a1da7b.jpeg'
    },
    {
      id:5,
      titolo: 'MacBook Air',
      descrizione: 'Apple M1, 8GB RAM, 256GB SSD',
      marca: 'Apple',
      prezzo: 1000,
      disponibilita: 0,
      immagine: 'https://i5.walmartimages.com/seo/HP-Pavilion-13-3-FHD-Intel-Core-i3-8GB-RAM-128GB-SSD-Silver_906cf222-d138-430a-8146-d129b0cca3a2_2.f838f300a6e31f50074faf4091a1da7b.jpeg'
    }
    // Aggiungi altri prodotti se vuoi
  ];

  // Funzione che filtra i prodotti in base alla marca selezionata
  prodottiFiltrati() {
    if (this.marcaSelezionata === '' || this.marcaSelezionata === 'Tutte') {
      return this.prodotti;
    } else {
      return this.prodotti.filter(p => p.marca === this.marcaSelezionata);
    }
  }

  disabled = false;
  max = 100;
  min = 0;
  showTicks = false;
  step = 1;
  thumbLabel = false;
  value = 0;
  
}
