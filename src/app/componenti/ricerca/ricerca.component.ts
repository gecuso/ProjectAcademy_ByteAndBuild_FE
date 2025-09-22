import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ListaProdottiService } from '../../services/lista-prodotti.service';

@Component({
  selector: 'app-ricerca',
  standalone: false,
  templateUrl: './ricerca.component.html',
  styleUrl: './ricerca.component.css'
})
export class RicercaComponent implements OnInit{

  elementoCercato = "";
  prodotti: any[] = [];

constructor(private route: ActivatedRoute, private service:ListaProdottiService){}

  ngOnInit(): void {
    this.elementoCercato = this.route.snapshot.queryParamMap.get('descrizione') || '';
    console.log("Stampa quello che cerchi --> " + this.elementoCercato)
    if(this.elementoCercato){
      this.service.listByFilter(this.elementoCercato).subscribe((resp:any)=>{
        this.prodotti = resp.dati
        console.log(this.prodotti)
      })
    }
  }



}
