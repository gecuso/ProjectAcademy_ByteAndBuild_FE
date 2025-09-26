import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProdottoReq, SistemaRaffreddamentoReq } from '../requests/general-req/general-req.component';

@Injectable({
  providedIn: 'root'
})
export class SistemaRaffreddamentoService {

  url:string = "http://localhost:9090/rest/sistemaRaffreddamento/"

  constructor(private http:HttpClient) { }

  create(sistemaRaffreddamento:any) {
    return this.http.post(this.url + 'create', sistemaRaffreddamento);
  }
  
  createSisRafrod(sisRafReq: SistemaRaffreddamentoReq, prodReq:ProdottoReq) {
    const body = { sisRafReq, prodReq };
    console.log(body);
    return this.http.post(this.url + 'createAlimProd', body);
  }
}
