import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LaptopService {

  url:string = "http://localhost:9090/rest/laptop/"

  constructor(private http:HttpClient) { }

  create(laptop:any) {
    return this.http.post(this.url + 'create', laptop);
  }
}
