import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { PcReq, ProdottoReq } from "../requests/general-req/general-req.component";

@Injectable({
  providedIn: 'root'
})
export class PcService {

  url:string = "http://localhost:9090/rest/pc/"

  constructor(private http:HttpClient) { }

  createPcProd(pcReq: PcReq, prodReq:ProdottoReq) {
    const body = { pcReq, prodReq };
    console.log(body);
    return this.http.post(this.url + 'createPcProd', body);
  }

  updatePcProd(pcReq: PcReq, prodReq:ProdottoReq) {
    const body = { pcReq, prodReq };
    console.log(body);
    return this.http.put(this.url + 'updatePcProd', body);
  }

  deletePcProd(pcReq: PcReq, prodReq:ProdottoReq){ 
    const body = { pcReq, prodReq };
    console.log(body);
    return this.http.post(this.url + 'deletePcProd', body);
  }
  
}
