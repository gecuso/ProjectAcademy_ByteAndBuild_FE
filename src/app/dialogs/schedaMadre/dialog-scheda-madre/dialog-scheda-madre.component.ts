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
    descrizione: '',
    compatibilita: '',
    consumo: 0,
    idProdotto: 0,
    idFormato: 0
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
    public dialogRef: MatDialogRef<DialogSchedaMadreComponent>,
    private marcaService : MarcaService,
    private scherdaMadreService : SchedaMadreService,
    private formatoService : FormatoService,
    @Inject(MAT_DIALOG_DATA) public dataSchMdr: SchedaMadreReq,
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
      compatibilita: [dataSchMdr?.compatibilita || '', Validators.required],
      consumo: [dataSchMdr?.consumo || 0, [Validators.required, Validators.min(1)]],
      idFormato: [dataSchMdr?.idFormato || null, Validators.required],
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

      this.formatoService.getFormati().subscribe({
            next: formats => this.formati = formats,                    // Quando arrivano i dati, li salvo in this.formats
            error: err => console.error('Errore formati:', err)   // Se c’è un errore, lo stampo in console
          });
                  console.log(this.formati);
    }

  onSave(): void {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

    onSubmit(): void {
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
    this.scherdaMadreService.createSchMdrProd(this.schMdrReq, this.prodottoReq).subscribe(data =>{ console.log(data)})
    this.dialogRef.close(this.form.value);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
