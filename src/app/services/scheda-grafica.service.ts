import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProdottoReq, RichiestaDTO, SchedaGraficaReq } from '../requests/general-req/general-req.component';
import { map, Observable } from 'rxjs';

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

  updateSchGrfProd(schGrfReq: SchedaGraficaReq, prodReq:ProdottoReq) {
    const body = { schGrfReq, prodReq };
    console.log(body);
    return this.http.put(this.url + 'updateSchGrfProd', body);
  }

  deleteSchGrfProd(schGrfReq: SchedaGraficaReq, prodReq:ProdottoReq) {
    const body = { schGrfReq, prodReq };
    console.log(body);
    return this.http.post(this.url + 'deleteSchGrfProd', body);
  }
  listAll(): Observable<RichiestaDTO[]> {
        return this.http
          .get<{ dati: RichiestaDTO[] }>(`${this.url}listAllSchedaGrafica`)
          .pipe(map(response => response.dati || [])); // usa solo "dati"
      }
}
