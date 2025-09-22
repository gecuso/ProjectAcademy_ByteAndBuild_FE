import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlimentazioneService {

  url:string = "http://localhost:9090/rest/alimentazione/"

  constructor(private http:HttpClient) { }

  create(alimentazione:any) {
    return this.http.post(this.url + 'create', alimentazione);
  }
}
