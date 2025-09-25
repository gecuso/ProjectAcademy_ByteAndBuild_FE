import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlimentazioneReq, ProdottoReq } from '../dialogs/alimentazione/dialog-alim/dialog-alim.component';

@Injectable({
  providedIn: 'root'
})
export class AlimentazioneService {

  url:string = "http://localhost:9090/rest/alimentazione/"

  constructor(private http:HttpClient) { }

  create(alimentazione:any) {
    return this.http.post(this.url + 'create', alimentazione);
  }

  createAlimProd(alimReq: AlimentazioneReq, prodReq:ProdottoReq) {
    const body = { alimReq, prodReq };
    console.log(body);
    return this.http.post(this.url + 'createAlimProd', body);
  }
}
