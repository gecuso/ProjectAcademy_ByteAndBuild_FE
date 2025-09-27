import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProdottoReq, SchedaMadreReq } from '../requests/general-req/general-req.component';

@Injectable({
  providedIn: 'root'
})
export class SchedaMadreService {

  url:string = "http://localhost:9090/rest/schedaMadre/"

  constructor(private http:HttpClient) { }

  create(schedaMadre:any) {
    return this.http.post(this.url + 'create', schedaMadre);
  }

  createSchMdrProd(schMdrReq: SchedaMadreReq, prodReq:ProdottoReq) {
    const body = { schMdrReq, prodReq };
    console.log(body);
    return this.http.post(this.url + 'createSchMdrProd', body);
  }

  updateSchMdrProd(schMdrReq: SchedaMadreReq, prodReq:ProdottoReq) {
    const body = { schMdrReq, prodReq };
    console.log(body);
    return this.http.put(this.url + 'updateSchMdrProd', body);
  }

  deleteSchMdrProd(schMdrReq: SchedaMadreReq, prodReq:ProdottoReq) {
    const body = { schMdrReq, prodReq };
    console.log(body);
    return this.http.post(this.url + 'deleteSchMdrProd', body);
  }
}
