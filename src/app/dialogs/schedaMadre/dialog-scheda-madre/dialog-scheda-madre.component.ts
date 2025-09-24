import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

export interface SchedaMadreReq {
  id?: number;
  descrizione: string;
  compatibilita: string;
  consumo: number;
  idProdotto?: number;
  idFormato?: number;
}

@Component({
  selector: 'app-dialog-scheda-madre',
  templateUrl: './dialog-scheda-madre.component.html',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
  ],
})
export class DialogSchedaMadreComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DialogSchedaMadreComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SchedaMadreReq
  ) {
    this.form = this.fb.group({
      id: [data?.id],
      descrizione: [data?.descrizione || '', Validators.required],
      compatibilita: [data?.compatibilita || '', Validators.required],
      consumo: [data?.consumo || 0, [Validators.required, Validators.min(1)]],
      idProdotto: [data?.idProdotto || null, Validators.required],
      idFormato: [data?.idFormato || null, Validators.required],
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
