import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Categoria, ProdottoReq, SchedaMadreReq } from '../../../requests/general-req/general-req.component';
import { MatSelectModule } from '@angular/material/select';
import { SchedaMadreService } from '../../../services/scheda-madre.service';
import { MarcaService } from '../../../services/marca.service';
import { FormatoService } from '../../../services/formato.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog-scheda-madre',
  templateUrl: './dialog-scheda-madre.component.html',
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
export class DialogSchedaMadreComponent {
  form: FormGroup;
  cat=10;
  formati: any[] = [];
  marche: any[] = [];
  schMdrReq: SchedaMadreReq = {
    id: 0,
    descrizione: '',
    compatibilita: '',
    consumo: 0,
    idProdotto: 0,
    idFormato: 0
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
    public dialogRef: MatDialogRef<DialogSchedaMadreComponent>,
    private marcaService : MarcaService,
    private scherdaMadreService : SchedaMadreService,
    private formatoService : FormatoService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public dataSchMdr: SchedaMadreReq,
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
      compatibilita: [dataSchMdr?.compatibilita || '', Validators.required],
      consumo: [dataSchMdr?.consumo || 0, [Validators.required, Validators.min(1)]],
      idFormato: [dataSchMdr?.idFormato || null, Validators.required],
      idElem:[dataSchMdr?.id],
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

    this.formatoService.getFormati().subscribe({
      next: formats => {
        this.formati = formats
        if (!this.form.get('idFormato')?.value) {
          this.form.patchValue({ idFormato: null });
        }
      },
      error: err => console.error('Errore formati:', err)   // Se c’è un errore, lo stampo in console
    });
    console.log(this.formati);

    if (this.dataElem?.data) {
      console.log(this.dataElem)
      this.form.patchValue({
        idElem: this.dataElem.data?.id,
        idProd: this.dataElem.data.prodotto?.id,
        descrizione: this.dataElem.data.descrizione,
        costo: this.dataElem.data.prodotto?.costo,
        prezzo: this.dataElem.data.prodotto?.prezzo,
        quantita: this.dataElem.data.prodotto?.quantita,
        img: this.dataElem.data.prodotto?.img,
        idCategoria: this.dataElem.data.prodotto.categoria?.id,
        idMarca: this.dataElem.data.prodotto.marca?.id,
        compatibilita: this.dataElem.data?.compatibilita,
        consumo: this.dataElem.data?.consumo,
        idFormato: this.dataElem.data?.formato.id,
      });
      console.log(this.form.value)
    }
  }

  onSave(): void {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

    onSubmit(): void {
      if(this.dataElem?.data?.id){
        this.schMdrReq.id = this.dataElem.data?.id;
        this.prodottoReq.id = this.dataElem.data.prodotto?.id; 
      }
    this.schMdrReq.descrizione = this.form.value.descrizione;
    this.schMdrReq.compatibilita = this.form.value.compatibilita;
    this.schMdrReq.consumo = this.form.value.consumo;
    this.schMdrReq.idFormato = this.form.value.idFormato;

    this.prodottoReq.descrizione = this.form.value.descrizione;
    this.prodottoReq.costo = this.form.value.costo;
    this.prodottoReq.prezzo = this.form.value.prezzo;
    this.prodottoReq.quantita = this.form.value.quantita;
    this.prodottoReq.img = this.form.value.img;
    this.prodottoReq.idCategoria = this.cat;
    this.prodottoReq.idMarca = this.form.value.idMarca;

    console.log(this.form.value);
    if (this.dataElem?.data?.id){
      this.scherdaMadreService.updateSchMdrProd(this.schMdrReq, this.prodottoReq).subscribe(data =>{ console.log(data)})
    }else{
      this.scherdaMadreService.createSchMdrProd(this.schMdrReq, this.prodottoReq).subscribe(data =>{ console.log(data)})
    }this.dialogRef.close(this.form.value);
  }


    onDelete(): void {
    if(this.dataElem.data.prodotto?.id){
      this.schMdrReq.id = this.dataElem.data?.id;
      this.prodottoReq.id = this.dataElem.data.prodotto?.id; 
      this.scherdaMadreService.deleteSchMdrProd(this.schMdrReq, this.prodottoReq).subscribe(data =>{ console.log(data)})
      this.dialogRef.close(this.form.value);
      this.router.navigate(['/listaProdotti',this.cat]);
    } 
  }
  onCancel(): void {
    this.dialogRef.close();
  }
}
