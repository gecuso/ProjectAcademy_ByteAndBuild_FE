import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProdottoReq, TastieraReq } from '../requests/general-req/general-req.component';

@Injectable({
  providedIn: 'root'
})
export class TastieraService {

  url:string = "http://localhost:9090/rest/tastiera/"

  constructor(private http:HttpClient) { }

  create(tastiera:any) {
    return this.http.post(this.url + 'create', tastiera);
  }

  createTastReqProd(tastReq: TastieraReq, prodReq:ProdottoReq) {
    const body = { tastReq, prodReq };
    console.log(body);
    return this.http.post(this.url + 'createTastReqProd', body);
  }
}
