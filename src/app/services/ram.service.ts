import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProdottoReq, RamReq } from '../requests/general-req/general-req.component';

@Injectable({
  providedIn: 'root'
})
export class RamService {

  url:string = "http://localhost:9090/rest/ram/"

  constructor(private http:HttpClient) { }

  createRamProd(ramReq: RamReq, prodReq:ProdottoReq) {
    const body = { ramReq, prodReq };
    console.log(body);
    return this.http.post(this.url + 'createRamProd', body);
  }

  updateRamProd(ramReq: RamReq, prodReq:ProdottoReq) {
    const body = { ramReq, prodReq };
    console.log(body);
    return this.http.post(this.url + 'updateRamProd', body);
  }
}
