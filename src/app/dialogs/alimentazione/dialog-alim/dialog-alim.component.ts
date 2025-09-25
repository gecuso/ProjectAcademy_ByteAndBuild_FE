import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from "@angular/material/select";
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MarcaService } from '../../../services/marca.service';
import { AlimentazioneService } from '../../../services/alimentazione.service';
import { AlimentazioneReq, Categoria, ProdottoReq } from '../../../requests/general-req/general-req.component';


@Component({
  selector: 'app-dialog-alim',
  templateUrl: './dialog-alim.component.html',
  styleUrl: './dialog-alim.component.css',
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
export class DialogAlimComponent {
form: FormGroup;
cat=1;
marche: any[] = [];
alimReq: AlimentazioneReq = {
  descrizione: '',
  potenza: 0,
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
    public dialogRef: MatDialogRef<DialogAlimComponent>,
    private marcaService : MarcaService,
    private alimservice : AlimentazioneService,
    @Inject(MAT_DIALOG_DATA) private dataAlim: AlimentazioneReq,
    @Inject(MAT_DIALOG_DATA) private dataProd: ProdottoReq
  ) {
    this.form = this.fb.group({
      id: [dataProd?.id],
      descrizione: [dataProd?.descrizione || '', Validators.required],
      potenza: [dataAlim?.potenza || 0, [Validators.required, Validators.min(1)]],
      costo: [dataProd?.costo || 0, Validators.required],
      prezzo: [dataProd?.prezzo || 0, Validators.required],
      quantita: [dataProd?.quantita || 0, Validators.required],
      img: [dataProd?.img || ''],
      idCategoria: this.cat,
      idMarca: [dataProd?.idMarca || null, Validators.required],
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
    this.alimReq.descrizione = this.form.value.descrizione;
    this.alimReq.potenza = this.form.value.potenza;

    this.prodottoReq.descrizione = this.form.value.descrizione;
    this.prodottoReq.costo = this.form.value.costo;
    this.prodottoReq.prezzo = this.form.value.prezzo;
    this.prodottoReq.quantita = this.form.value.quantita;
    this.prodottoReq.img = this.form.value.img;
    this.prodottoReq.idCategoria = this.cat;
    this.prodottoReq.idMarca = this.form.value.idMarca;

    console.log(this.form.value);
    this.alimservice.createAlimProd(this.alimReq, this.prodottoReq).subscribe(data =>{ console.log(data)})
    this.dialogRef.close(this.form.value);
  }


  onCancel(): void {
    this.dialogRef.close();
  }

  
}
