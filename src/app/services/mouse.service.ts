import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MouseReq, ProdottoReq } from '../requests/general-req/general-req.component';

@Injectable({
  providedIn: 'root'
})
export class MouseService {

  url:string = "http://localhost:9090/rest/mouse/"

  constructor(private http:HttpClient) { }

  create(mouse:any) {
    return this.http.post(this.url + 'create', mouse);
  }

  createMouseProd(mouseReq: MouseReq, prodReq:ProdottoReq) {
    const body = { mouseReq, prodReq };
    console.log(body);
    return this.http.post(this.url + 'createMouseProd', body);
  }

  updateMouseProd(mouseReq: MouseReq, prodReq:ProdottoReq) {
    const body = { mouseReq, prodReq };
    console.log(body);
    return this.http.put(this.url + 'updateMouseProd', body);
  }

  deleteMouseProd(mouseReq: MouseReq, prodReq:ProdottoReq) {
    const body = { mouseReq, prodReq };
    console.log(body);
    return this.http.post(this.url + 'deleteMouseProd', body);
  }
}
