import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Categoria, CategoriaService } from '../../../services/categoria.service';
import { Marca, MarcaService } from '../../../services/marca.service';
import { MatSelectModule } from "@angular/material/select";
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

export interface AlimentazioneReq {
  id?: number;
  descrizione: string;
  potenza: number;
  idProdotto: number;
}

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

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DialogAlimComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AlimentazioneReq
  ) {
    this.form = this.fb.group({
      id: [data?.id],
      descrizione: [data?.descrizione || '', Validators.required],
      potenza: [data?.potenza || 0, [Validators.required, Validators.min(1)]],
      idProdotto: [data?.idProdotto || null, Validators.required],
    });
  }
  ngOnInit() {
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
