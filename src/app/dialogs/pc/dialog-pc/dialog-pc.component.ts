import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MarcaService } from '../../../services/marca.service';
import { AlimentazioneService } from '../../../services/alimentazione.service';
import { AlimentazioneReq, Categoria, PcReq, ProdottoReq, RichiestaDTO } from '../../../requests/general-req/general-req.component';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { CaseService } from '../../../services/case.service';
import { CpuService } from '../../../services/cpu.service';
import { MemoriaService } from '../../../services/memoria.service';
import { RamService } from '../../../services/ram.service';
import { SchedaGraficaService } from '../../../services/scheda-grafica.service';
import { SchedaMadreService } from '../../../services/scheda-madre.service';
import { SistemaRaffreddamentoService } from '../../../services/sistema-raffreddamento.service';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { PcService } from '../../../services/pc.service';

@Component({
  selector: 'app-dialog-pc',
  templateUrl: './dialog-pc.component.html',
  styleUrl: './dialog-pc.component.css',
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
export class DialogPcComponent {
form: FormGroup;
cat=13;
marche: any[] = [];
alimentatori: any[] = [];
cases: any[] = [];
cpus: any[] = [];
memorie: any[] = [];
rams: any[] = [];
schedegrafiche: any[] = [];
schedemadri: any[] = [];
sistemiraf:any[] = [];

id:any;
pcReq: PcReq = {
  id: 0,
  descrizione: '',
  idProdotto: 0,
  idSchedaMadre: 0,
  idSchedaGrafica: 0,
  idCpu: 0,
  idRam: 0,
  idMemoria: 0,
  idCase: 0,
  idSistemaRaffreddamento: 0,
  idAlimentazione: 0
};
prodottoReq: ProdottoReq = {
  id: 0,
  descrizione: '',
  costo: 0,
  prezzo: 0,
  quantita: 0,
  img: '',
  idCategoria: this.cat,
  idMarca: 0
};
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DialogPcComponent>,
    private marcaService : MarcaService,
    private alimservice : AlimentazioneService,
    private caseservice : CaseService,
    private cpuService : CpuService,
    private memoriaService : MemoriaService,
    private ramService : RamService,
    private schedagraficaService : SchedaGraficaService,
    private schedamadreService : SchedaMadreService,
    private sistemirafService : SistemaRaffreddamentoService,
    private pcService : PcService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) private dataPc:PcReq,
    @Inject(MAT_DIALOG_DATA) private dataProd: ProdottoReq,
    @Inject(MAT_DIALOG_DATA) private dataElem: any
  ) {
    this.form = this.fb.group({
      idProd: [dataProd?.id],
      descrizione: [dataProd?.descrizione || '', Validators.required],
      costo: [dataProd?.costo || 0, Validators.required],
      prezzo: [dataProd?.prezzo || 0, Validators.required],
      quantita: [dataProd?.quantita || 0, Validators.required],
      img: [dataProd?.img || ''],
      idCategoria: this.cat,
      idMarca: [dataProd?.idMarca || null, Validators.required],
      idElem:[dataPc?.id],
      idAlimentazione:[dataPc?.idAlimentazione, Validators.required],
      idSchedaMadre: [dataPc?.idSchedaMadre, Validators.required],
      idSchedaGrafica: [dataPc?.idSchedaGrafica, Validators.required],
      idCpu: [dataPc?.idCpu, Validators.required],
      idRam: [dataPc?.idRam, Validators.required],
      idMemoria: [dataPc?.idMemoria, Validators.required],
      idCase: [dataPc?.idCase, Validators.required],
      idSistemaRaffreddamento: [dataPc?.idSistemaRaffreddamento, Validators.required],
    });
  }

  ngOnInit() {
    console.log(this.cat);
    // Se è stata selezionata una categoria, carico le marche corrispondenti
    this.marcaService.getMarcheByCategoria(this.cat).subscribe({
      next: brands => {
        // Filtra le marche che contengono la categoria selezionata
        this.marche = brands.filter(marca => 
          marca.categoria.some((cat: Categoria) => cat.id === this.cat)
        );
        // Resetta il campo marca, l’utente dovrà selezionarla di nuovo
        if (!this.form.get('idMarca')?.value) {
          this.form.patchValue({ idMarca: null });
        }
      },
      error: err => console.error('Errore marche:', err) // Stampa eventuali errori
    });

    this.alimservice.listAll().subscribe({
      next: brands => {
        // Filtra le marche che contengono la categoria selezionata
        this.alimentatori = brands.filter(req => 
          req.prodotto.quantita > 0
        );
      },
      error: err => console.error('Errore alimentazioneDTO:', err) // Stampa eventuali errori
    });
    this.caseservice.listAll().subscribe({
      next: brands => {
        // Filtra le marche che contengono la categoria selezionata
        this.cases = brands.filter(req => 
          req.prodotto.quantita > 0
        );
      },
      error: err => console.error('Errore alimentazioneDTO:', err) // Stampa eventuali errori
    });
    this.cpuService.listAll().subscribe({
      next: brands => {
        // Filtra le marche che contengono la categoria selezionata
        this.cpus = brands.filter(req => 
          req.prodotto.quantita > 0
        );
      },
      error: err => console.error('Errore alimentazioneDTO:', err) // Stampa eventuali errori
    });
    this.memoriaService.listAll().subscribe({
      next: brands => {
        // Filtra le marche che contengono la categoria selezionata
        this.memorie = brands.filter(req => 
          req.prodotto.quantita > 0
        );
      },
      error: err => console.error('Errore alimentazioneDTO:', err) // Stampa eventuali errori
    });
    this.ramService.listAll().subscribe({
      next: brands => {
        // Filtra le marche che contengono la categoria selezionata
        this.rams = brands.filter(req => 
          req.prodotto.quantita > 0
        );
      },
      error: err => console.error('Errore alimentazioneDTO:', err) // Stampa eventuali errori
    });
    this.schedagraficaService.listAll().subscribe({
      next: brands => {
        // Filtra le marche che contengono la categoria selezionata
        this.schedegrafiche = brands.filter(req => 
          req.prodotto.quantita > 0
        );
      },
      error: err => console.error('Errore alimentazioneDTO:', err) // Stampa eventuali errori
    });
    this.schedamadreService.listAll().subscribe({
      next: brands => {
        // Filtra le marche che contengono la categoria selezionata
        this.schedemadri = brands.filter(req => 
          req.prodotto.quantita > 0
        );
      },
      error: err => console.error('Errore alimentazioneDTO:', err) // Stampa eventuali errori
    });
    this.sistemirafService.listAll().subscribe({
      next: brands => {
        // Filtra le marche che contengono la categoria selezionata
        this.sistemiraf = brands.filter(req => 
          req.prodotto.quantita > 0
        );
      },
      error: err => console.error('Errore alimentazioneDTO:', err) // Stampa eventuali errori
    });

    if (this.dataElem?.data) {
      this.id=this.dataElem.data?.id
      console.log(this.dataElem.data.prodotto?.id)
      this.form.patchValue({
        idElem: this.dataElem.data?.id,
        idProd: this.dataElem.data.prodotto?.id,
        descrizione: this.dataElem.data.descrizione,
        costo: this.dataElem.data.prodotto?.costo,
        prezzo: this.dataElem.data.prodotto?.prezzo,
        quantita: this.dataElem.data.prodotto?.quantita,
        img: this.dataElem.data.prodotto?.img,
        idCategoria: this.dataElem.data.prodotto?.categoria?.id,
        idMarca: this.dataElem.data.prodotto?.marca?.id,
        idAlimentazione: this.dataElem.data.alimentazione?.id,
        idSchedaMadre: this.dataElem.data.schedaMadre?.id,
        idSchedaGrafica: this.dataElem.data.schedaGrafica?.id,
        idCpu: this.dataElem.data.cpu?.id,
        idRam: this.dataElem.data.ram?.id,
        idMemoria: this.dataElem.data.memoria?.id,
        idCase: this.dataElem.data.casee?.id,
        idSistemaRaffreddamento: this.dataElem.data.sistemaRaffreddamento?.id,
      });
      console.log(this.form.value)
    }
  }
 /*
  onDelete(): void {
    if(this.dataElem.data.prodotto?.id){
      this.pcReq.id = this.dataElem.data?.id;
      this.prodottoReq.id = this.dataElem.data.prodotto?.id; 
      this.alimservice.deleteAlimProd(this.pcReq, this.prodottoReq).subscribe(data =>{ console.log(data)})
      this.dialogRef.close(this.form.value);
      this.router.navigate(['/listaProdotti',this.cat]);
    } 
  }*/

  onSave(): void {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

  onSubmit(): void {
    if(this.dataElem?.data?.id){
      this.pcReq.id = this.dataElem.data?.id;
      this.prodottoReq.id = this.dataElem.data.prodotto?.id; 
    }
    this.pcReq.descrizione = this.form.value.descrizione;
    this.pcReq.idAlimentazione = this.form.value.idAlimentazione;
    this.pcReq.idCase = this.form.value.idCase;
    this.pcReq.idCpu = this.form.value.idCpu;
    this.pcReq.idRam = this.form.value.idRam;
    this.pcReq.idMemoria = this.form.value.idMemoria;
    this.pcReq.idSchedaGrafica = this.form.value.idSchedaGrafica;
    this.pcReq.idSchedaMadre = this.form.value.idSchedaMadre;
    this.pcReq.idSistemaRaffreddamento = this.form.value.idSistemaRaffreddamento;

    this.prodottoReq.descrizione = this.form.value.descrizione;
    this.prodottoReq.costo = this.form.value.costo;
    this.prodottoReq.prezzo = this.form.value.prezzo;
    this.prodottoReq.quantita = this.form.value.quantita;
    this.prodottoReq.img = this.form.value.img;
    this.prodottoReq.idCategoria = this.cat;
    this.prodottoReq.idMarca = this.form.value.idMarca;

    console.log(this.form.value);
    if (this.dataElem?.data?.id){
      this.pcService.updatePcProd(this.pcReq, this.prodottoReq).subscribe(data =>{ console.log(data)})
    }else{
      this.pcService.createPcProd(this.pcReq, this.prodottoReq).subscribe(data =>{ console.log(data)})
    }
    this.dialogRef.close(this.form.value);
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onDelete(): void {
    if(this.dataElem.data.prodotto?.id){
      this.prodottoReq.id = this.dataElem.data.prodotto?.id;
      this.pcReq.id = this.dataElem.data?.id;
      this.pcReq.idAlimentazione = this.form.value.idAlimentazione;
      this.pcReq.idCase = this.form.value.idCase;
      this.pcReq.idCpu = this.form.value.idCpu;
      this.pcReq.idRam = this.form.value.idRam;
      this.pcReq.idMemoria = this.form.value.idMemoria;
      this.pcReq.idSchedaGrafica = this.form.value.idSchedaGrafica;
      this.pcReq.idSchedaMadre = this.form.value.idSchedaMadre;
      this.pcReq.idSistemaRaffreddamento = this.form.value.idSistemaRaffreddamento;
      console.log(this.pcReq)
      this.pcService.deletePcProd(this.pcReq, this.prodottoReq).subscribe(data =>{ console.log(data)})
      this.dialogRef.close(this.form.value);
      this.router.navigate(['/listaProdotti',this.cat]);
    } 
  }

}

