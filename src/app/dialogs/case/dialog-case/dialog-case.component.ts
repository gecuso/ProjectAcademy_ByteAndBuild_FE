import { Component, Inject } from '@angular/core';
import { Form, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from "@angular/material/select";
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { CaseReq, ProdottoReq } from '../../../requests/general-req/general-req.component';
import { MarcaService } from '../../../services/marca.service';
import { Categoria } from '../../../services/categoria.service';
import { FormatoService } from '../../../services/formato.service';
import { CaseService } from '../../../services/case.service';

@Component({
  selector: 'app-dialog-case',
  templateUrl: './dialog-case.component.html',
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
export class DialogCaseComponent {
  form: FormGroup;
  cat=2;
  formati: any[] = [];
  marche: any[] = [];
  caseReq: CaseReq = {
    descrizione: '',
    dimensioni: '',
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
    private marcaService : MarcaService,
    private formatoService : FormatoService,
    private caseService : CaseService,
    public dialogRef: MatDialogRef<DialogCaseComponent>,
    @Inject(MAT_DIALOG_DATA) private dataCase: CaseReq,
    @Inject(MAT_DIALOG_DATA) private dataProd: ProdottoReq,
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
      dimensioni: [dataCase?.dimensioni || '', Validators.required],
      idFormato: [dataCase?.idFormato || null, Validators.required],
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
        
      }

  onSubmit(): void {
    this.caseReq.descrizione = this.form.value.descrizione;
    this.caseReq.dimensioni = this.form.value.dimensioni;
    this.caseReq.idFormato = this.form.value.idFormato;
    this.caseReq.idProdotto = this.form.value.id;
    
    this.prodottoReq.descrizione = this.form.value.descrizione;
    this.prodottoReq.costo = this.form.value.costo;
    this.prodottoReq.prezzo = this.form.value.prezzo;
    this.prodottoReq.quantita = this.form.value.quantita;
    this.prodottoReq.img = this.form.value.img;
    this.prodottoReq.idCategoria = this.cat;
    this.prodottoReq.idMarca = this.form.value.idMarca;

    console.log(this.form.value);
    this.caseService.createCaseProd(this.caseReq, this.prodottoReq).subscribe(data =>{console.log(data)});
    this.dialogRef.close({ case: this.caseReq, prod: this.form.value });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
