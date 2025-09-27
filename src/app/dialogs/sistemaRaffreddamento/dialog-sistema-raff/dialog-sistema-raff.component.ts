import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { Categoria, ProdottoReq, SistemaRaffreddamentoReq } from '../../../requests/general-req/general-req.component';
import { SistemaRaffreddamentoService } from '../../../services/sistema-raffreddamento.service';
import { MarcaService } from '../../../services/marca.service';


@Component({
  selector: 'app-dialog-sistema-raff',
  templateUrl: './dialog-sistema-raff.component.html',
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
export class DialogSistemaRaffComponent {
  form: FormGroup;
  cat=11;
  marche: any[] = [];
  sisRafReq: SistemaRaffreddamentoReq = {
    id: 0,
    descrizione: '',
    consumo: 0,
    idProdotto: 0
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
    public dialogRef: MatDialogRef<DialogSistemaRaffComponent>,
    private marcaService : MarcaService,
    private sisRafservice : SistemaRaffreddamentoService,
    @Inject(MAT_DIALOG_DATA) public dataSisRafReq: SistemaRaffreddamentoReq,
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
        consumo: [dataSisRafReq?.consumo || 0, [Validators.required, Validators.min(1)]],
        idElem:[dataSisRafReq?.id],
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
        idCategoria: this.dataElem.data.prodotto?.categoria?.id,
        idMarca: this.dataElem.data.prodotto?.marca?.id,
        consumo: this.dataElem.data.consumo,
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
        this.sisRafReq.id = this.dataElem.data?.id;
        this.prodottoReq.id = this.dataElem.data.prodotto?.id; 
      }
      this.sisRafReq.consumo = this.form.value.consumo;
      this.sisRafReq.descrizione = this.form.value.descrizione;

      this.prodottoReq.descrizione = this.form.value.descrizione;
      this.prodottoReq.costo = this.form.value.costo;
      this.prodottoReq.prezzo = this.form.value.prezzo;
      this.prodottoReq.quantita = this.form.value.quantita;
      this.prodottoReq.img = this.form.value.img;
      this.prodottoReq.idCategoria = this.cat;
      this.prodottoReq.idMarca = this.form.value.idMarca;

      console.log(this.form.value);
      if (this.dataElem?.data?.id){
        this.sisRafservice.updateSisRafProd(this.sisRafReq, this.prodottoReq).subscribe(data =>{ console.log(data)})
      }else{
        this.sisRafservice.createSisRafProd(this.sisRafReq, this.prodottoReq).subscribe(data =>{ console.log(data)})
      }
      this.dialogRef.close(this.form.value);
    }

  onCancel(): void {
    this.dialogRef.close();
  }
}
