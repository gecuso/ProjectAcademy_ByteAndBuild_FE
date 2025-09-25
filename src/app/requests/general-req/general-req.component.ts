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
  id: number | null;
  descrizione: string;
  caratteristiche: string;
  consumo: number | null;
  idProdotto: number | null;
}

export interface MemoriaReq {
  id: number | null;
  descrizione: string;
  spazio: number | null;
  idProdotto: number | null;
}
export interface MonitorReq {
  id: number | null;
  descrizione: string;
  risoluzione: string;
  latenza: string;
  frequenza: string;
  idProdotto: number | null;
}

export interface MouseReq {
  id: number | null;
  descrizione: string;
  collegamento: string;
  idProdotto: number | null;
}

export interface RamReq {
  id: number | null;
  descrizione: string;
  consumo: number | null;
  idProdotto: number | null;
}

export interface SchedaGraficaReq {
  id: number | null;
  descrizione: string;
  consumo: number | null;
  idProdotto: number | null;
}

export interface SchedaMadreReq {
  id: number | null;
  descrizione: string;
  compatibilita: string;
  consumo: number | null;
  idProdotto: number | null;
  idFormato: number | null;
}

export interface SistemaRaffreddamentoReq {
  id: number | null;
  descrizione: string;
  consumo: number | null;
  idProdotto: number | null;
}

export interface TastieraReq {
  id: number | null;
  descrizione: string;
  tipologia: string;
  collegamento: string;
  idProdotto: number | null;
}

@Component({
  selector: 'app-general-req',
  standalone: false,
  template: "",
})
export class GeneralReqComponent {

  


}
