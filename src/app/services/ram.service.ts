import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RamService {

  url:string = "http://localhost:9090/rest/ram/"

  constructor(private http:HttpClient) { }

  create(ram:any) {
    return this.http.post(this.url + 'create', ram);
  }
}
