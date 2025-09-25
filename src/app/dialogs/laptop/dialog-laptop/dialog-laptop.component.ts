import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Categoria, LaptopReq, ProdottoReq } from '../../../requests/general-req/general-req.component';
import { MarcaService } from '../../../services/marca.service';
import { LaptopService } from '../../../services/laptop.service';

@Component({
  selector: 'app-dialog-laptop',
  templateUrl: './dialog-laptop.component.html',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule
  ],
})
export class DialogLaptopComponent {
  form: FormGroup;
  cat=4;
  marche: any[] = [];
  laptopReq: LaptopReq = {
    descrizione: '',
    caratteristiche: '',
    consumo: 0,
    idProdotto: 0,
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
    public dialogRef: MatDialogRef<DialogLaptopComponent>,
    public marcaService : MarcaService,
    public laptopService : LaptopService,
    @Inject(MAT_DIALOG_DATA) public dataLt: LaptopReq,
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
      caratteristiche: [dataLt?.caratteristiche || '', Validators.required],
      consumo: [dataLt?.consumo || 0, [Validators.required, Validators.min(1)]],
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

  onSubmit(): void {
    this.laptopReq.descrizione = this.form.value.descrizione;
    this.laptopReq.caratteristiche = this.form.value.caratteristiche;
    this.laptopReq.consumo = this.form.value.consumo;

    this.prodottoReq.descrizione = this.form.value.descrizione;
    this.prodottoReq.costo = this.form.value.costo;
    this.prodottoReq.prezzo = this.form.value.prezzo;
    this.prodottoReq.quantita = this.form.value.quantita;
    this.prodottoReq.img = this.form.value.img;
    this.prodottoReq.idCategoria = this.cat;
    this.prodottoReq.idMarca = this.form.value.idMarca;

    console.log(this.form.value);
    this.laptopService.createLaptopProd(this.laptopReq, this.prodottoReq).subscribe(data =>{ console.log(data)})
    this.dialogRef.close(this.form.value);
  }
  onSave(): void {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
