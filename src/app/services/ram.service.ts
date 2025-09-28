import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProdottoReq, RamReq, RichiestaDTO } from '../requests/general-req/general-req.component';
import { map, Observable } from 'rxjs';

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
    return this.http.put(this.url + 'updateRamProd', body);
  }

  deleteRamProd(ramReq: RamReq, prodReq:ProdottoReq) {
    const body = { ramReq, prodReq };
    console.log(body);
    return this.http.post(this.url + 'deleteRamProd', body);
  }
  listAll(): Observable<RichiestaDTO[]> {
        return this.http
          .get<{ dati: RichiestaDTO[] }>(`${this.url}listAllRam`)
          .pipe(map(response => response.dati || [])); // usa solo "dati"
      }
}
