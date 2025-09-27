import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LaptopReq, ProdottoReq } from '../requests/general-req/general-req.component';

@Injectable({
  providedIn: 'root'
})
export class LaptopService {

  url:string = "http://localhost:9090/rest/laptop/"

  constructor(private http:HttpClient) { }

  create(laptop:any) {
    return this.http.post(this.url + 'create', laptop);
  }

  createLaptopProd(laptopReq: LaptopReq, prodReq:ProdottoReq) {
    const body = { laptopReq, prodReq };
    console.log(body);
    return this.http.post(this.url + 'createLaptopProd', body);
  }

  updateLaptopProd(laptopReq: LaptopReq, prodReq:ProdottoReq) {
    const body = { laptopReq, prodReq };
    console.log(body);
    return this.http.post(this.url + 'updateLaptopProd', body);
  }
}
