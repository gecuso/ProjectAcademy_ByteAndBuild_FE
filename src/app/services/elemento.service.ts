import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ElementoService {

  
  url:string = "http://localhost:9090/rest/"
  urltemp: string=""
  constructor(private http:HttpClient) {}

  findByIdProd(idProd: number, categoria: number) {
    switch (categoria) {
      case 1:
        this.urltemp=this.url + 'alimentazione/';
        break;
      case 2:
        this.urltemp=this.url + 'case/';
        break;
      case 3:
        this.urltemp=this.url + 'cpu/';
        break;
      case 4:
        this.urltemp=this.url + 'laptop/';
        break;
      case 5:
        this.urltemp=this.url + 'memoria/';
        break;
      case 6:
        this.urltemp=this.url + 'monitor/';
        break;
      case 7:
        this.urltemp=this.url + 'mouse/';
        break;
      case 8:
        this.urltemp=this.url + 'ram/';
        break;
      case 9:
        this.urltemp=this.url + 'schedaGrafica/';
        break;
      case 10:
        this.urltemp=this.url + 'schedaMadre/';
        break;
      case 11:
        this.urltemp=this.url + 'sistemaRaffreddamento/';
        break;
      case 12:
        this.urltemp=this.url + 'tastiera/';
        break;
      default:
        alert('Categoria non trovata');
        break;
    }
    return this.http.get(this.urltemp + 'findByIdProd?idProd=' + idProd);
  }

}
