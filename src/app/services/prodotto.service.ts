import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ProdottoService {
  
  private url = 'http://localhost:9090/rest/prodotto';

  constructor(private http: HttpClient) {}

  create(body:{}){
    return this.http.post(this.url + "/create", body)
  }
  delete(body: number){ 
    console.log(body);
    return this.http.get(this.url + "/delete?idProd="+ body) 
  }
}
