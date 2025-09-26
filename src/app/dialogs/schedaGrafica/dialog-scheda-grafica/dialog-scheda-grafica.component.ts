import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Categoria, ProdottoReq, SchedaGraficaReq } from '../../../requests/general-req/general-req.component';
import { MarcaService } from '../../../services/marca.service';
import { SchedaGraficaService } from '../../../services/scheda-grafica.service';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-dialog-scheda-grafica',
  templateUrl: './dialog-scheda-grafica.component.html',
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
export class DialogSchedaGraficaComponent {
  form: FormGroup;
  cat=9;
  marche: any[] = [];
  schGrfReq: SchedaGraficaReq = {
    descrizione: '',
    consumo: 0,
    idProdotto: 0
  };
  prodottoReq: ProdottoReq = {
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
    public dialogRef: MatDialogRef<DialogSchedaGraficaComponent>,
    private marcaService : MarcaService,
    private schGraficaService : SchedaGraficaService,
    @Inject(MAT_DIALOG_DATA) public dataschGrf: SchedaGraficaReq,
    @Inject(MAT_DIALOG_DATA) private dataProd: ProdottoReq
  ) {
    this.form = this.fb.group({
      id: [dataProd?.id],
      descrizione: [dataProd?.descrizione || '', Validators.required],
      costo: [dataProd?.costo || 0, Validators.required],
      prezzo: [dataProd?.prezzo || 0, Validators.required],
      quantita: [dataProd?.quantita || 0, Validators.required],
      img: [dataProd?.img || ''],
      idCategoria: this.cat,
      idMarca: [dataProd?.idMarca || null, Validators.required],
    consumo: [dataschGrf?.consumo || 0, [Validators.required, Validators.min(1)]],
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
            this.form.patchValue({ idMarca: null });
          },
          error: err => console.error('Errore marche:', err) // Stampa eventuali errori
        });
    }

  onSave(): void {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }


  onSubmit(): void {
    this.schGrfReq.consumo = this.form.value.consumo;

    this.prodottoReq.descrizione = this.form.value.descrizione;
    this.prodottoReq.costo = this.form.value.costo;
    this.prodottoReq.prezzo = this.form.value.prezzo;
    this.prodottoReq.quantita = this.form.value.quantita;
    this.prodottoReq.img = this.form.value.img;
    this.prodottoReq.idCategoria = this.cat;
    this.prodottoReq.idMarca = this.form.value.idMarca;

    console.log(this.form.value);
    this.schGraficaService.createSchGrfProd(this.schGrfReq, this.prodottoReq).subscribe(data =>{ console.log(data)})
    this.dialogRef.close(this.form.value);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
