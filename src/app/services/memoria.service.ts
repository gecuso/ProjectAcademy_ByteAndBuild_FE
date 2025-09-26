import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MemoriaReq, ProdottoReq } from '../requests/general-req/general-req.component';

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
}
