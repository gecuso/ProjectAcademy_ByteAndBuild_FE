import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProdottoReq, RichiestaDTO, SistemaRaffreddamentoReq } from '../requests/general-req/general-req.component';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SistemaRaffreddamentoService {

  url:string = "http://localhost:9090/rest/sistemaRaffreddamento/"

  constructor(private http:HttpClient) { }

  create(sistemaRaffreddamento:any) {
    return this.http.post(this.url + 'create', sistemaRaffreddamento);
  }
  
  createSisRafProd(sisRafReq: SistemaRaffreddamentoReq, prodReq:ProdottoReq) {
    const body = { sisRafReq, prodReq };
    console.log(body);
    return this.http.post(this.url + 'createSisRafProd', body);
  }

  updateSisRafProd(sisRafReq: SistemaRaffreddamentoReq, prodReq:ProdottoReq) {
    const body = { sisRafReq, prodReq };
    console.log(body);
    return this.http.put(this.url + 'updateSisRafProd', body);
  }

  deleteSisRafProd(sisRafReq: SistemaRaffreddamentoReq, prodReq:ProdottoReq) {
    const body = { sisRafReq, prodReq };
    console.log(body);
    return this.http.post(this.url + 'deleteSisRafProd', body);
  }
  listAll(): Observable<RichiestaDTO[]> {
        return this.http
          .get<{ dati: RichiestaDTO[] }>(`${this.url}listAllSistemaRaffreddamento`)
          .pipe(map(response => response.dati || [])); // usa solo "dati"
      }

  updateSisRafProd(sisRafReq: SistemaRaffreddamentoReq, prodReq:ProdottoReq) {
    const body = { sisRafReq, prodReq };
    console.log(body);
    return this.http.post(this.url + 'updateSisRafProd', body);
  }
}
