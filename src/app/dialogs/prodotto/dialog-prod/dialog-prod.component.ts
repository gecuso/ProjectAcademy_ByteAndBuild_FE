import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Categoria, CategoriaService } from '../../../services/categoria.service';
import { Marca, MarcaService } from '../../../services/marca.service';
import { MatSelectModule } from "@angular/material/select";
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { DialogAlimComponent } from '../../alimentazione/dialog-alim/dialog-alim.component';
import { DialogCaseComponent } from '../../case/dialog-case/dialog-case.component';
import { DialogCpuComponent } from '../../cpu/dialog-cpu/dialog-cpu.component';
import { DialogLaptopComponent, LaptopReq } from '../../laptop/dialog-laptop/dialog-laptop.component';
import { DialogMemoriaComponent, MemoriaReq } from '../../memoria/dialog-memoria/dialog-memoria.component';
import { DialogMonitorComponent, MonitorReq } from '../../monitor/dialog-monitor/dialog-monitor.component';
import { DialogMouseComponent, MouseReq } from '../../mouse/dialog-mouse/dialog-mouse.component';
import { DialogRamComponent, RamReq } from '../../ram/dialog-ram/dialog-ram.component';
import { DialogSchedaGraficaComponent, SchedaGraficaReq } from '../../schedaGrafica/dialog-scheda-grafica/dialog-scheda-grafica.component';
import { DialogSchedaMadreComponent, SchedaMadreReq } from '../../schedaMadre/dialog-scheda-madre/dialog-scheda-madre.component';
import { DialogSistemaRaffComponent, SistemaRaffreddamentoReq } from '../../sistemaRaffreddamento/dialog-sistema-raff/dialog-sistema-raff.component';
import { DialogTastieraComponent, TastieraReq } from '../../tastiera/dialog-tastiera/dialog-tastiera.component';
import { AlimentazioneReq, CaseReq, CpuReq, ProdottoReq } from '../../../requests/general-req/general-req.component';

@Component({
  selector: 'app-prodotto-dialog',
  templateUrl: './dialog-prod.component.html',
   imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
  ],
})
export class ProdottoDialogComponent {
  form: FormGroup;
  categorie: Categoria[] = [];
  marche: Marca[] = [];
  cat: number=0;
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ProdottoDialogComponent>,
    private categoriaService: CategoriaService,
    private marcaService: MarcaService,
    private dialog: MatDialog,
    
    @Inject(MAT_DIALOG_DATA) public data: ProdottoReq
  ) {
    this.form = this.fb.group({
      idCategoria: [data?.idCategoria || null, Validators.required],
    });
    
  }
  ngOnInit() {
  // Carico le categorie dal backend
    this.categoriaService.getCategorie().subscribe({
      next: cats => this.categorie = cats,                    // Quando arrivano i dati, li salvo in this.categorie
      error: err => console.error('Errore categorie:', err)   // Se c’è un errore, lo stampo in console
    });

    this.form.get('idCategoria')?.valueChanges.subscribe(idCat => {
      if (idCat) {
        this.cat=idCat;
              console.log(this.cat);
      }});
  }

  onSave(): void {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  openDialog() {
    switch (this.cat) {
      case 1:  
        this.openDialogAlim();
        this.dialogRef.close();
        break;
      case 2:  
        this.openDialogCase();
        this.dialogRef.close();
        break;
      case 3:  
        this.openDialogCpu();
        this.dialogRef.close();
        break;
      case 4:  
        this.openDialogLaptop();
        this.dialogRef.close();
        break;
      case 5:  
        this.openDialogMemoria();
        this.dialogRef.close();
        break;
      case 6:  
        this.openDialogMonitor();
        this.dialogRef.close();
        break;
      case 7:  
        this.openDialogMouse();
        this.dialogRef.close();
        break;
      case 8:  
        this.openDialogRam();
        this.dialogRef.close();
        break;
      case 9:  
        this.openDialogSchedaGrafica();
        this.dialogRef.close();
        break;
      case 10:  
        this.openDialogSchedaMadre();
        this.dialogRef.close();
        break;
      case 11:  
        this.openDialogSistemaRaff();
        this.dialogRef.close();
        break;
      case 12:  
        this.openDialogTastiera();
        this.dialogRef.close();
        break;
      default:
        alert('Categoria non selezionata');
        break;
}
    

     //const dialogRef = this.dialog.open(DialogAlimComponent, {
      //width: '500px',
    //  data: {} as ProdottoReq
    //});
  
    this.dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Prodotto salvato:', result);
      }
    });}


    openDialogAlim(): void{
    const dialogRef = this.dialog.open(DialogAlimComponent, {
            width: '500px',
            data: {} as AlimentazioneReq
              });
    }
      

  openDialogCase(): void {
    const dialogRef =this.dialog.open(DialogCaseComponent, {
      width: '500px',
      data: {} as CaseReq
    });
  }

  openDialogCpu(): void {
    const dialogRef = this.dialog.open(DialogCpuComponent, {
      width: '500px',
      data: {} as CpuReq
    });
  }

  openDialogLaptop(): void {
    const dialogRef =this.dialog.open(DialogLaptopComponent, {
      width: '500px',
      data: {} as LaptopReq
    });
  }

  openDialogMemoria(): void {
    const dialogRef =this.dialog.open(DialogMemoriaComponent, {
      width: '500px',
      data: {} as MemoriaReq
    });
  }

  openDialogMonitor(): void {
    const dialogRef = this.dialog.open(DialogMonitorComponent, {
      width: '500px',
      data: {} as MonitorReq
    });
  }

  openDialogMouse(): void {
    const dialogRef = this.dialog.open(DialogMouseComponent, {
      width: '500px',
      data: {} as MouseReq
    });
  }

  openDialogRam(): void {
    const dialogRef = this.dialog.open(DialogRamComponent, {
      width: '500px',
      data: {} as RamReq
    });
  }

  openDialogSchedaGrafica(): void {
    const dialogRef =this.dialog.open(DialogSchedaGraficaComponent, {
      width: '500px',
      data: {} as SchedaGraficaReq
    });
  }

  openDialogSchedaMadre(): void {
    const dialogRef =this.dialog.open(DialogSchedaMadreComponent, {
      width: '500px',
      data: {} as SchedaMadreReq
    });
  }

  openDialogSistemaRaff(): void {
    const dialogRef =this.dialog.open(DialogSistemaRaffComponent, {
      width: '500px',
      data: {} as SistemaRaffreddamentoReq
    });
  }

  openDialogTastiera(): void {
    const dialogRef =this.dialog.open(DialogTastieraComponent, {
      width: '500px',
      data: {} as TastieraReq
    });
  }
}


