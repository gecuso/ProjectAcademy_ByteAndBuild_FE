import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ListaProdottiService {

  url:string = "http://localhost:9090/rest/prodotto/"

  constructor(private http:HttpClient) { }

  getAllByIdCategoria(id:number) {
    return this.http.get(this.url + 'listAllByIdCategoria?id=' + id);
  }

  listByFilter(descrizione:String){
    return this.http.get(this.url + 'listByFilter?descrizione=' + descrizione)
  }
  
  getById(id:number){
     return this.http.get(this.url + 'getProdotto?id=' + id);
  }
  
  getAll(){
    return this.http.get(this.url + 'listAllProdotto');
  }
}
