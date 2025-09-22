import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SchedaMadreService {

  url:string = "http://localhost:9090/rest/schedaMadre/"

  constructor(private http:HttpClient) { }

  create(schedaMadre:any) {
    return this.http.post(this.url + 'create', schedaMadre);
  }
}
