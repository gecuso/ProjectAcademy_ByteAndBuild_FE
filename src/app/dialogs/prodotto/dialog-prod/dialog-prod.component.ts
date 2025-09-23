import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


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
  imports: [MatFormFieldModule,
    MatInputModule,
  ReactiveFormsModule],
})
export class ProdottoDialogComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ProdottoDialogComponent>,
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

  onSave(): void {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
