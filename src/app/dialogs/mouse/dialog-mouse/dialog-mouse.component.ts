import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

export interface MouseReq {
  id?: number;
  descrizione: string;
  collegamento: string;
  idProdotto?: number;
}

@Component({
  selector: 'app-dialog-mouse',
  templateUrl: './dialog-mouse.component.html',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
  ],
})
export class DialogMouseComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DialogMouseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MouseReq
  ) {
    this.form = this.fb.group({
      id: [data?.id],
      descrizione: [data?.descrizione || '', Validators.required],
      collegamento: [data?.collegamento || '', Validators.required],
      idProdotto: [data?.idProdotto || null, Validators.required],
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
