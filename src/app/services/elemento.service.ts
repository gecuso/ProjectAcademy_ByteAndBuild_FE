import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ElementoService {


  url:string = "http://localhost:9090/rest/"

  constructor(private http:HttpClient) { }

  findByIdProd(idProd: number, categoria: number) {
    switch (categoria) {
  case 1:
    this.url += 'alimentazione/';
    break;
  case 2:
    this.url += 'case/';
    break;
  case 3:
    this.url += 'cpu/';
    break;
  case 4:
    this.url += 'laptop/';
    break;
  case 5:
    this.url += 'memoria/';
    break;
  case 6:
    this.url += 'monitor/';
    break;
  case 7:
    this.url += 'mouse/';
    break;
  case 8:
    this.url += 'ram/';
    break;
  case 9:
    this.url += 'schedaGrafica/';
    break;
  case 10:
    this.url += 'schedaMadre/';
    break;
  case 11:
    this.url += 'sistemaRaffreddamento/';
    break;
  case 12:
    this.url += 'tastiera/';
    break;
  default:
    alert('Categoria non trovata');
    break;
}
    return this.http.get(this.url + 'findByIdProd?idProd=' + idProd);
  }

}
