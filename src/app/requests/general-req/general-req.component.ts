import { Component } from '@angular/core';

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

export interface Categoria {
  id: number;
  descrizione: string;
}

export interface Formato {
  id: number;
  descrizione: string;
}

@Component({
  selector: 'app-general-req',
  standalone: false,
  template: "",
})
export class GeneralReqComponent {

  


}
