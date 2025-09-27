import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MonitorReq, ProdottoReq } from '../requests/general-req/general-req.component';

@Injectable({
  providedIn: 'root'
})
export class MonitorService {

  url:string = "http://localhost:9090/rest/monitor/"

  constructor(private http:HttpClient) { }

  create(monitor:any) {
    return this.http.post(this.url + 'create', monitor);
  }

  createMonitorProd(monitorReq: MonitorReq, prodReq:ProdottoReq) {
    const body = { monitorReq, prodReq };
    console.log(body);
    return this.http.post(this.url + 'createMonitorProd', body);
  }

  upadateMonitorProd(monitorReq: MonitorReq, prodReq:ProdottoReq) {
    const body = { monitorReq, prodReq };
    console.log(body);
    return this.http.post(this.url + 'upadateMonitorProd', body);
  }
}
