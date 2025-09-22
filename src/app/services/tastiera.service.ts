import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TastieraService {

  url:string = "http://localhost:9090/rest/tastiera/"

  constructor(private http:HttpClient) { }

  create(tastiera:any) {
    return this.http.post(this.url + 'create', tastiera);
  }
}
