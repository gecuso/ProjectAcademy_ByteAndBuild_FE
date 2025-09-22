import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MemoriaService {

  url:string = "http://localhost:9090/rest/memoria/"

  constructor(private http:HttpClient) { }

  create(memoroia:any) {
    return this.http.post(this.url + 'create', memoroia);
  }
}
