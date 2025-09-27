import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CpuReq, ProdottoReq } from '../requests/general-req/general-req.component';

@Injectable({
  providedIn: 'root'
})
export class CpuService {

  url:string = "http://localhost:9090/rest/cpu/"


  constructor(private http:HttpClient) { }

  create(cpu:any) {
    return this.http.post(this.url + 'create', cpu);
  }

  createCpuProd(cpuReq: CpuReq, prodReq:ProdottoReq) {
    const body = { cpuReq, prodReq };
    console.log(body);
    return this.http.post(this.url + 'createCpuProd', body);
  }
  
  updateCpuProd(cpuReq: CpuReq, prodReq:ProdottoReq) {
    const body = { cpuReq, prodReq };
    console.log(body);
    return this.http.post(this.url + 'updateCpuProd', body);
  }
}
