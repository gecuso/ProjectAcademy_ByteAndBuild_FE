import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Formato } from '../requests/general-req/general-req.component';



@Injectable({
  providedIn: 'root'
})
export class FormatoService {
 
  private url = 'http://localhost:9090/rest/formato/';

  constructor(private http: HttpClient) { }


  getFormati(): Observable<Formato[]> {
      return this.http.get<{ dati: Formato[] }>(this.url + 'listAllFormati').pipe(
        map(response => response.dati || []) // usa solo "dati"
      );
    }
}
