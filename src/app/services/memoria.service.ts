import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MemoriaReq, ProdottoReq, RichiestaDTO } from '../requests/general-req/general-req.component';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MemoriaService {

  url:string = "http://localhost:9090/rest/memoria/"

  constructor(private http:HttpClient) { }

  create(memoroia:any) {
    return this.http.post(this.url + 'create', memoroia);
  }

  createMemProd(memReq: MemoriaReq, prodReq:ProdottoReq) {
    const body = { memReq, prodReq };
    console.log(body);
    return this.http.post(this.url + 'createMemProd', body);
  }

  updateMemProd(memReq: MemoriaReq, prodReq:ProdottoReq) {
    const body = { memReq, prodReq };
    console.log(body);
    return this.http.put(this.url + 'updateMemProd', body);
  }

  deleteMemProd(memReq: MemoriaReq, prodReq:ProdottoReq) {
    const body = { memReq, prodReq };
    console.log(body);
    return this.http.post(this.url + 'deleteMemProd', body);
  }
  listAll(): Observable<RichiestaDTO[]> {
        return this.http
          .get<{ dati: RichiestaDTO[] }>(`${this.url}findAll`)
          .pipe(map(response => response.dati || [])); // usa solo "dati"
      }
}
