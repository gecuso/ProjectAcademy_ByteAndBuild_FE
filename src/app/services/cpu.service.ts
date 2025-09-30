import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CpuReq, ProdottoReq, RichiestaDTO } from '../requests/general-req/general-req.component';
import { map, Observable } from 'rxjs';

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
    return this.http.put(this.url + 'updateCpuProd', body);
  }

  deleteCpuProd(cpuReq: CpuReq, prodReq:ProdottoReq) {
    const body = { cpuReq, prodReq };
    console.log(body);
    return this.http.post(this.url + 'deleteCpuProd', body);
  }
  listAll(): Observable<RichiestaDTO[]> {
        return this.http
          .get<{ dati: RichiestaDTO[] }>(`${this.url}listAllCpu`)
          .pipe(map(response => response.dati || [])); // usa solo "dati"
      }
}
