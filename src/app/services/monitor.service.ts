import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MonitorService {

  url:string = "http://localhost:9090/rest/monitor/"

  constructor(private http:HttpClient) { }

  create(monitor:any) {
    return this.http.post(this.url + 'create', monitor);
  }
}
