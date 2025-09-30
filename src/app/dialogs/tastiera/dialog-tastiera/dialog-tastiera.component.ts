import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Categoria, ProdottoReq, TastieraReq } from '../../../requests/general-req/general-req.component';
import { MarcaService } from '../../../services/marca.service';
import { TastieraService } from '../../../services/tastiera.service';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog-tastiera',
  templateUrl: './dialog-tastiera.component.html',
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
export class DialogTastieraComponent {
  form: FormGroup;
  cat=12;
  marche: any[] = [];
  id:any;
  tastReq: TastieraReq = {
    id: 0,
    id: 0,
    descrizione: '',
    tipologia: '',
    collegamento: '',
    idProdotto: 0
  };
  prodottoReq: ProdottoReq = {
    id: 0,
    id: 0,
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
    public dialogRef: MatDialogRef<DialogTastieraComponent>,
    private marcaService : MarcaService,
    private tastieraservice : TastieraService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public dataTast: TastieraReq,
    @Inject(MAT_DIALOG_DATA) private dataProd: ProdottoReq,
    @Inject(MAT_DIALOG_DATA) private dataElem: any
    @Inject(MAT_DIALOG_DATA) private dataProd: ProdottoReq,
    @Inject(MAT_DIALOG_DATA) private dataElem: any
  ) {
    this.form = this.fb.group({
      idProd: [dataProd?.id],
      idProd: [dataProd?.id],
      descrizione: [dataProd?.descrizione || '', Validators.required],
      costo: [dataProd?.costo || 0, Validators.required],
      prezzo: [dataProd?.prezzo || 0, Validators.required],
      quantita: [dataProd?.quantita || 0, Validators.required],
      img: [dataProd?.img || ''],
      idCategoria: this.cat,
      idMarca: [dataProd?.idMarca || null, Validators.required],
      tipologia: [dataTast?.tipologia || '', Validators.required],
      collegamento: [dataTast?.collegamento || '', Validators.required],
      idElem:[dataTast?.id],
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
        if (!this.form.get('idMarca')?.value) {
          this.form.patchValue({ idMarca: null });
        }
      },
      error: err => console.error('Errore marche:', err) // Stampa eventuali errori
    });

    if (this.dataElem?.data) {
      this.id=this.dataElem.data?.id
      console.log(this.dataElem)
      this.form.patchValue({
        idElem: this.dataElem.data?.id,
        idProd: this.dataElem.data.prodotto?.id,
        descrizione: this.dataElem.data.descrizione,
        collegamento: this.dataElem.data.collegamento,
        tipologia: this.dataElem.data.tipologia,
        costo: this.dataElem.data.prodotto?.costo,
        prezzo: this.dataElem.data.prodotto?.prezzo,
        quantita: this.dataElem.data.prodotto?.quantita,
        img: this.dataElem.data.prodotto?.img,
        idCategoria: this.dataElem.data.prodotto?.categoria?.id,
        idMarca: this.dataElem.data.prodotto?.marca?.id,
      });
      console.log(this.form.value)
    }
  }

  onSave(): void {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

    onSubmit(): void {
      if(this.dataElem?.data?.id){
        this.tastReq.id = this.dataElem.data?.id;
        this.prodottoReq.id = this.dataElem.data.prodotto?.id; 
      }
      this.tastReq.descrizione = this.form.value.descrizione;
      this.tastReq.tipologia = this.form.value.tipologia;
      this.tastReq.collegamento = this.form.value.collegamento;

      this.prodottoReq.descrizione = this.form.value.descrizione;
      this.prodottoReq.costo = this.form.value.costo;
      this.prodottoReq.prezzo = this.form.value.prezzo;
      this.prodottoReq.quantita = this.form.value.quantita;
      this.prodottoReq.img = this.form.value.img;
      this.prodottoReq.idCategoria = this.cat;
      this.prodottoReq.idMarca = this.form.value.idMarca;

      console.log(this.form.value);
    if (this.dataElem?.data?.id){
      this.tastieraservice.updateTastProd(this.tastReq, this.prodottoReq).subscribe(data =>{ console.log(data)})
    }else{
      this.tastieraservice.createTastProd(this.tastReq, this.prodottoReq).subscribe(data =>{ console.log(data)})
    }
    this.dialogRef.close(this.form.value);
  }

  onDelete(): void {
    if(this.dataElem.data.prodotto?.id){
      this.tastReq.id = this.dataElem.data?.id;
      this.prodottoReq.id = this.dataElem.data.prodotto?.id; 
      this.tastieraservice.deleteTastProd(this.tastReq, this.prodottoReq).subscribe(data =>{ console.log(data)})
      this.dialogRef.close(this.form.value);
      this.router.navigate(['/listaProdotti',this.cat]);
    } 
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
