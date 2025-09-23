import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface Categoria {
  id: number | null;
  descrizione: string;
}

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  private apiUrl = 'http://localhost:9090/rest/categoria/listAllCategoria'; 

  constructor(private http: HttpClient) {}

   getCategorie(): Observable<Categoria[]> {
    return this.http.get<{ dati: Categoria[] }>(this.apiUrl).pipe(
      map(response => response.dati || []) // usa solo "dati"
    );
  }
}
