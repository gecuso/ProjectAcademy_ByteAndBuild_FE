import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SchedaGraficaService {

  url:string = "http://localhost:9090/rest/schedaGrafica/"

  constructor(private http:HttpClient) { }

  create(schedaGrafica:any) {
    return this.http.post(this.url + 'create', schedaGrafica);
  }
}
