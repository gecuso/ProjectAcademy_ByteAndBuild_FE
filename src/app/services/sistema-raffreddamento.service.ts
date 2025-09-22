import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SistemaRaffreddamentoService {

  url:string = "http://localhost:9090/rest/sistemaRaffreddamento/"

  constructor(private http:HttpClient) { }

  create(sistemaRaffreddamento:any) {
    return this.http.post(this.url + 'create', sistemaRaffreddamento);
  }
}
