import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProdottoReq, SchedaGraficaReq } from '../requests/general-req/general-req.component';

@Injectable({
  providedIn: 'root'
})
export class SchedaGraficaService {

  url:string = "http://localhost:9090/rest/schedaGrafica/"

  constructor(private http:HttpClient) { }

  create(schedaGrafica:any) {
    return this.http.post(this.url + 'create', schedaGrafica);
  }

    createSchGrfProd(schGrfReq: SchedaGraficaReq, prodReq:ProdottoReq) {
      const body = { schGrfReq, prodReq };
      console.log(body);
      return this.http.post(this.url + 'createSchGrfProd', body);
    }
}
