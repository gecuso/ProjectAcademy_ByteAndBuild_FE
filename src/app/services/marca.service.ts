import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface Marca {
  id: number;
  descrizione: string;
  categoria: { id: number; descrizione: string }[]; // array delle categorie collegate
}

@Injectable({
  providedIn: 'root',
})
export class MarcaService {
  private apiUrl = 'http://localhost:9090/rest/marca/byCategoria'; // endpoint che filtra per categoria

  constructor(private http: HttpClient) {}

  // Recupera le marche per una categoria specifica
  getMarcheByCategoria(idCategoria: number): Observable<Marca[]> {
    return this.http
      .get<{ dati: Marca[] }>(`${this.apiUrl}?idCategoria=${idCategoria}`)
      .pipe(map(response => response.dati || [])); // usa solo "dati"
  }
}
