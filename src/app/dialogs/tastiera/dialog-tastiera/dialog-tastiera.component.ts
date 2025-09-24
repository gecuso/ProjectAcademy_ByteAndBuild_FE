import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

export interface TastieraReq {
  id?: number;
  descrizione: string;
  tipologia: string;
  collegamento: string;
  idProdotto?: number;
}

@Component({
  selector: 'app-dialog-tastiera',
  templateUrl: './dialog-tastiera.component.html',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
  ],
})
export class DialogTastieraComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DialogTastieraComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TastieraReq
  ) {
    this.form = this.fb.group({
      id: [data?.id],
      descrizione: [data?.descrizione || '', Validators.required],
      tipologia: [data?.tipologia || '', Validators.required],
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
