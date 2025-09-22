import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MouseService {

  url:string = "http://localhost:9090/rest/mouse/"

  constructor(private http:HttpClient) { }

  create(mouse:any) {
    return this.http.post(this.url + 'create', mouse);
  }
}
