import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-categoria-modal',
  templateUrl: './categoria-modal.component.html',
  styleUrls: ['./categoria-modal.component.css'],
  imports: [ReactiveFormsModule]
})
export class CategoriaModalComponent implements OnInit {
  @Input() categoria!: string;  // es. "alimentazione"
  @Output() submitCategoria = new EventEmitter<any>();
  @Output() chiuso = new EventEmitter<void>();

  categoriaForm!: FormGroup;

  // Qui la mappa che ho preparato
  categoryFields: any = {
    alimentazione: [
      { key: 'descrizione', type: 'text', label: 'Descrizione' },
      { key: 'potenza', type: 'number', label: 'Potenza' }
    ],
    case: [
      { key: 'descrizione', type: 'text', label: 'Descrizione' },
      { key: 'dimensioni', type: 'text', label: 'Dimensioni' },
      { key: 'idFormato', type: 'number', label: 'ID Formato' }
    ],
    cpu: [
      { key: 'descrizione', type: 'text', label: 'Descrizione' },
      { key: 'compatibilita', type: 'text', label: 'Compatibilità' },
      { key: 'consumo', type: 'number', label: 'Consumo' }
    ],
    laptop: [
      { key: 'descrizione', type: 'text', label: 'Descrizione' },
      { key: 'caratteristiche', type: 'text', label: 'Caratteristiche' },
      { key: 'consumo', type: 'number', label: 'Consumo' }
    ],
    memoria: [
      { key: 'descrizione', type: 'text', label: 'Descrizione' },
      { key: 'spazio', type: 'number', label: 'Spazio' }
    ],
    monitor: [
      { key: 'descrizione', type: 'text', label: 'Descrizione' },
      { key: 'risoluzione', type: 'text', label: 'Risoluzione' },
      { key: 'latenza', type: 'text', label: 'Latenza' },
      { key: 'frequenza', type: 'text', label: 'Frequenza' }
    ],
    mouse: [
      { key: 'descrizione', type: 'text', label: 'Descrizione' },
      { key: 'collegamento', type: 'text', label: 'Collegamento' }
    ],
    ram: [
      { key: 'descrizione', type: 'text', label: 'Descrizione' },
      { key: 'consumo', type: 'number', label: 'Consumo' }
    ],
    schedaGrafica: [
      { key: 'descrizione', type: 'text', label: 'Descrizione' },
      { key: 'consumo', type: 'number', label: 'Consumo' }
    ],
    schedaMadre: [
      { key: 'descrizione', type: 'text', label: 'Descrizione' },
      { key: 'compatibilita', type: 'text', label: 'Compatibilità' },
      { key: 'consumo', type: 'number', label: 'Consumo' },
      { key: 'idFormato', type: 'number', label: 'ID Formato' }
    ],
    sistemaRaffreddamento: [
      { key: 'descrizione', type: 'text', label: 'Descrizione' },
      { key: 'consumo', type: 'number', label: 'Consumo' }
    ],
    tastiera: [
      { key: 'descrizione', type: 'text', label: 'Descrizione' },
      { key: 'tipologia', type: 'text', label: 'Tipologia' },
      { key: 'collegamento', type: 'text', label: 'Collegamento' }
    ]
  };

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    const group: any = {};
    this.categoryFields[this.categoria].forEach((f: any) => {
      group[f.key] = ['', Validators.required];
    });
    this.categoriaForm = this.fb.group(group);
  }

  salva() {
    if (this.categoriaForm.invalid) return;
    this.submitCategoria.emit(this.categoriaForm.value);
  }

  chiudiModal() {
    this.chiuso.emit();
  }
}
