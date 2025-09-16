import { Component, OnInit } from '@angular/core';
import { ListaProdottiService } from '../../services/lista-prodotti.service';

@Component({
  selector: 'app-lista-prodotti',
  standalone: false,
  templateUrl: './lista-prodotti.component.html',
  styleUrl: './lista-prodotti.component.css'
})
export class ListaProdottiComponent implements OnInit {

  constructor(private prodotti:ListaProdottiService){

  }

  ngOnInit(): void {
    this.prodotti.getAllByIdCategoria(13).subscribe((resp: any) => {
      console.log(resp);
    });
  }
  
}
