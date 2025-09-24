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


export interface ProdottoReq {
  id?: number;
  descrizione: string;
  costo: number;
  prezzo: number;
  quantita: number;
  img: string;
  idCategoria: number;
  idMarca: number;
}

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
      id: [data?.id],
      descrizione: [data?.descrizione || '', Validators.required],
      costo: [data?.costo || 0, Validators.required],
      prezzo: [data?.prezzo || 0, Validators.required],
      quantita: [data?.quantita || 0, Validators.required],
      img: [data?.img || ''],
      idCategoria: [data?.idCategoria || null, Validators.required],
      idMarca: [data?.idMarca || null, Validators.required],
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
        // Se è stata selezionata una categoria, carico le marche corrispondenti
        this.marcaService.getMarcheByCategoria(idCat).subscribe({
          next: brands => {
            // Filtra le marche che contengono la categoria selezionata
            this.marche = brands.filter(marca => 
              marca.categoria.some((cat: Categoria) => cat.id === idCat)
            );
            // Resetta il campo marca, l’utente dovrà selezionarla di nuovo
            this.form.patchValue({ idMarca: null });
          },
          error: err => console.error('Errore marche:', err) // Stampa eventuali errori
        });
      } else {
        // Se nessuna categoria è selezionata, svuoto le marche e resetto il campo marca
        this.marche = [];
        this.form.patchValue({ idMarca: null });
      }
    });
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
      case 1: const dialogRef = this.dialog.open(DialogAlimComponent, {
        width: '500px',
        data: {} as ProdottoReq
        });
        break;
       
      //case 2: return 'case';
      //case 3: return 'cpu';
      //case 4: return 'laptop';
      //case 5: return 'memoria';
      //case 6: return 'monitor';
      //case 7: return 'mouse';
      //case 8: return 'ram';
      //case 9: return 'schedaGrafica';
      //case 10: return 'schedaMadre';
      //case 11: return 'sistemaRaffreddamento';
      //case 12: return 'tastiera';
      //case 13: return 'pc';
      
      default: alert("Seleziona una categoria valida");
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

}
