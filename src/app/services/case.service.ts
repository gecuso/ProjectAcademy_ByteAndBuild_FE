import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CaseReq, ProdottoReq } from '../requests/general-req/general-req.component';

@Injectable({
  providedIn: 'root'
})
export class CaseService {

  url:string = "http://localhost:9090/rest/case/"

  constructor(private http:HttpClient) { }

  create(casee:any) {
    return this.http.post(this.url + 'create', casee);
  }

  createCaseProd(caseReq: CaseReq, prodReq:ProdottoReq) {
      const body = { caseReq, prodReq };
      console.log(body);
      return this.http.post(this.url + 'createCaseProd', body);
    }
}
