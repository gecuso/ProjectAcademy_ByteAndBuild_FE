import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ListaProdottiService } from '../../services/lista-prodotti.service';
import { Location } from '@angular/common';
import { ElementoService } from '../../services/elemento.service';
import { firstValueFrom } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogAlimComponent } from '../../dialogs/alimentazione/dialog-alim/dialog-alim.component';
import { DialogCaseComponent } from '../../dialogs/case/dialog-case/dialog-case.component';
import { DialogCpuComponent } from '../../dialogs/cpu/dialog-cpu/dialog-cpu.component';
import { DialogLaptopComponent } from '../../dialogs/laptop/dialog-laptop/dialog-laptop.component';
import { DialogMemoriaComponent } from '../../dialogs/memoria/dialog-memoria/dialog-memoria.component';
import { DialogMonitorComponent } from '../../dialogs/monitor/dialog-monitor/dialog-monitor.component';
import { DialogMouseComponent } from '../../dialogs/mouse/dialog-mouse/dialog-mouse.component';
import { DialogRamComponent } from '../../dialogs/ram/dialog-ram/dialog-ram.component';
import { DialogSchedaGraficaComponent } from '../../dialogs/schedaGrafica/dialog-scheda-grafica/dialog-scheda-grafica.component';
import { DialogSchedaMadreComponent } from '../../dialogs/schedaMadre/dialog-scheda-madre/dialog-scheda-madre.component';
import { DialogSistemaRaffComponent } from '../../dialogs/sistemaRaffreddamento/dialog-sistema-raff/dialog-sistema-raff.component';
import { DialogTastieraComponent } from '../../dialogs/tastiera/dialog-tastiera/dialog-tastiera.component';
import { ProdottoDialogComponent } from '../../dialogs/prodotto/dialog-prod/dialog-prod.component';
import { DialogPcComponent } from '../../dialogs/pc/dialog-pc/dialog-pc.component';


@Component({
  selector: 'app-dettaglio-prodotto',
  standalone: false,
  templateUrl: './dettaglio-prodotto.component.html',
  styleUrl: './dettaglio-prodotto.component.css',
})
export class DettaglioProdottoComponent implements OnInit {

  isAdmin: boolean = false;
  prodotto: any;
  elemento:any;
  quantita: number = 1;
  showModal = false;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private prodottoService: ListaProdottiService,
    private elementoService: ElementoService,
    private router: Router,
    private indietro: Location,
    private dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.authService.isAdmin$.subscribe((isAdmin) => {
          this.isAdmin = isAdmin;
        });

    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.prodottoService.getById(id).subscribe({
        next: (resp: any) => {
          if (resp.dati) {
            this.prodotto = resp.dati;
            console.log(this.prodotto.categoria.id)
          } else {
            console.error('Prodotto non trovato:', resp.msg);
          }
          console.log(this.prodotto);
          this.elementoService.findByIdProd(id, this.prodotto.categoria.id).subscribe({
            
            next: (respE: any) => {
                if (respE.dati) {
                this.elemento = respE.dati;
                console.log(this.elemento)
              } else {
                console.error('Elemento non trovato:', respE.msg);
              }
            },
            error: (err) => {
              console.error('Errore HTTP:', err.message);
            },
          })
        },
        error: (err) => {
          console.error('Errore HTTP:', err.message);
        },
      });
    }
  }

  aggiungiAlCarrello() {
    this.showModal = true;
  }

  continuaAcquisti() {
    this.showModal = false;
  }

  vaiAlCarrello() {
    this.router.navigate(['/carrello']);
  }

  capitalize(text: string): string {
    //funzione per mettere la prima lettera MAIUSCOLA
    if (!text) return '';
    return text.charAt(0).toUpperCase() + text.slice(1);
  }
  
  tornaIndietro() {
    this.indietro.back();
  }

  openUpdateDialog(){
    switch (this.prodotto.categoria.id) {
      case 1:  
        this.openDialogAlim();
        break;
      case 2:  
        this.openDialogCase();
        break;
      case 3:  
        this.openDialogCpu();
        break;
      case 4:  
        this.openDialogLaptop();
        break;
      case 5:  
        this.openDialogMemoria();
        break;
      case 6:  
        this.openDialogMonitor();
        break;
      case 7:  
        this.openDialogMouse();
        break;
      case 8:  
        this.openDialogRam();
        break;
      case 9:  
        this.openDialogSchedaGrafica();
        break;
      case 10:  
        this.openDialogSchedaMadre();
        break;
      case 11:  
        this.openDialogSistemaRaff();
        break;
      case 12:  
        this.openDialogTastiera();
        break;
      case 13:  
        this.openDialogPc();
        break;
      default:
        alert('Categoria non selezionata');
        break;
    }
  }
  
  openDialogAlim(): void{
    const dialogRef = this.dialog.open(DialogAlimComponent, {
      width: '500px',
      data: {data : this.elemento} as any
    });
  }
      
  openDialogCase(): void {
    const dialogRef =this.dialog.open(DialogCaseComponent, {
      width: '500px',
      data: {data : this.elemento} as any
    });
  }

  openDialogCpu(): void {
    const dialogRef = this.dialog.open(DialogCpuComponent, {
      width: '500px',
      data: {data : this.elemento} as any
    });
  }

  openDialogLaptop(): void {
    const dialogRef =this.dialog.open(DialogLaptopComponent, {
      width: '500px',
      data: {data : this.elemento} as any
    });
  }

  openDialogMemoria(): void {
    const dialogRef =this.dialog.open(DialogMemoriaComponent, {
      width: '500px',
      data: {data : this.elemento} as any
    });
  }

  openDialogPc() {
    const dialogRef = this.dialog.open(DialogPcComponent, {
      width: '500px',
      data: {data : this.elemento} as any
    });
  }

  openDialogMonitor(): void {
    const dialogRef = this.dialog.open(DialogMonitorComponent, {
      width: '500px',
      data: {data : this.elemento} as any
    });
  }

  openDialogMouse(): void {
    const dialogRef = this.dialog.open(DialogMouseComponent, {
      width: '500px',
      data: {data : this.elemento} as any
    });
  }

  openDialogRam(): void {
    const dialogRef = this.dialog.open(DialogRamComponent, {
      width: '500px',
      data: {data : this.elemento} as any
    });
  }

  openDialogSchedaGrafica(): void {
    const dialogRef =this.dialog.open(DialogSchedaGraficaComponent, {
      width: '500px',
      data: {data : this.elemento} as any
    });
  }

  openDialogSchedaMadre(): void {
    const dialogRef =this.dialog.open(DialogSchedaMadreComponent, {
      width: '500px',
      data: {data : this.elemento} as any
    });
  }

  openDialogSistemaRaff(): void {
    const dialogRef =this.dialog.open(DialogSistemaRaffComponent, {
      width: '500px',
      data: {data : this.elemento} as any
    });
  }

  openDialogTastiera(): void {
    const dialogRef =this.dialog.open(DialogTastieraComponent, {
      width: '500px',
      data: {data : this.elemento} as any
    });
  }
  
}
