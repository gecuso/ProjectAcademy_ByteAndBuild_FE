import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CpuService {

  url:string = "http://localhost:9090/rest/cpu/"


  constructor(private http:HttpClient) { }

  create(cpu:any) {
    return this.http.post(this.url + 'create', cpu);
  }
}
