import { Component } from '@angular/core';

export interface RichiestaDTO {
  id: number;
  descrizione: string;
  prodotto: {id:number, descrizione:string, costo:number, prezzo:number, quantita:number, img:string, categoria:{id:number, descrizione:string}, marca:{id:number, descrizione:string}};
}
export interface AlimentazioneReq {
  id?: number;
  descrizione: string;
  potenza: number;
  idProdotto: number;
}
export interface ProdottoReq {
  id?: number;
  descrizione: string;
  costo: number;
  prezzo: number;
  quantita: number;
  img: string;
  idCategoria: number;
  idMarca: number;
}

export interface PcReq {
  id?: number ;
  descrizione: string;
  idProdotto: number ;

  idAlimentazione: number ;
  idCase: number ;
  idCpu: number ;
  idRam: number ;
  idMemoria: number ;
  idSchedaGrafica: number;
  idSchedaMadre: number ;
  idSistemaRaffreddamento: number;
}

export interface CaseReq {
  id?: number ;
  descrizione: string;
  dimensioni: string;
  idFormato: number;
  idProdotto: number;
}

export interface CpuReq {
  id?: number ;
  descrizione: string;
  compatibilita: string;
  consumo: number ;
  idProdotto: number ;
}
export interface LaptopReq {
  id?: number;
  descrizione: string;
  caratteristiche: string;
  consumo: number | null;
  idProdotto: number | null;
}

export interface MemoriaReq {
  id?: number;
  descrizione: string;
  spazio: number | null;
  idProdotto: number | null;
}
export interface MonitorReq {
  id?: number;
  descrizione: string;
  risoluzione: string;
  latenza: string;
  frequenza: string;
  idProdotto: number | null;
}

export interface MouseReq {
  id?: number;
  descrizione: string;
  collegamento: string;
  idProdotto: number | null;
}

export interface RamReq {
  id?: number;
  descrizione: string;
  consumo: number | null;
  idProdotto: number | null;
}

export interface SchedaGraficaReq {
  id?: number;
  descrizione: string;
  consumo: number | null;
  idProdotto: number | null;
}

export interface SchedaMadreReq {
  id?: number;
  descrizione: string;
  compatibilita: string;
  consumo: number | null;
  idProdotto: number | null;
  idFormato: number | null;
}

export interface SistemaRaffreddamentoReq {
  id?: number;
  descrizione: string;
  consumo: number | null;
  idProdotto: number | null;
}

export interface TastieraReq {
  id?: number;
  descrizione: string;
  tipologia: string;
  collegamento: string;
  idProdotto: number | null;
}

export interface OggettoNelCarrelloReq {
  id : number | null;
  quantita : number;
  idProdotto: number | null;
  idCarrello: number | null; 
}

export interface Categoria {
  id: number | null;
  descrizione: string;
}

export interface Formato {
  id: number;
  descrizione: string;
}

export interface Caratteristiche {
  id: number;
  descrizione: string;
  tipologia: string;
  collegamento: string;
  idProdotto: number | null;
  consumo: number | null;
  compatibilita: string;
  idFormato: number | null;
  risoluzione: string;
  latenza: string;
  frequenza: string;
  spazio: number | null;
  potenza: number;  
  idMarca: number;
  costo: number;
  prezzo: number;
  quantita: number;
  img: string;
}

@Component({
  selector: 'app-general-req',
  standalone: false,
  template: "",
})
export class GeneralReqComponent {

  


}
