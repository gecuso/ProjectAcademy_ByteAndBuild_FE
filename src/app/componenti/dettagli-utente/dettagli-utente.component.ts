import { Component, OnInit } from '@angular/core';
import { UtenteService } from '../../services/utente.service';
import { AuthService } from '../../auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriaService } from '../../services/categoria.service';
import { Marca, MarcaService } from '../../services/marca.service';
import { ProdottoService } from '../../services/prodotto.service';
import { MatDialog } from '@angular/material/dialog';
import { ProdottoDialogComponent } from '../../dialogs/prodotto/dialog-prod/dialog-prod.component';
import { Categoria, ProdottoReq } from '../../requests/general-req/general-req.component';
import { DialogPcComponent } from '../../dialogs/pc/dialog-pc/dialog-pc.component';


@Component({
  selector: 'app-dettagli-utente',
  standalone: false,
  templateUrl: './dettagli-utente.component.html',
  styleUrls: ['./dettagli-utente.component.css'],
})
export class DettagliUtenteComponent implements OnInit {
onSubmit() {
throw new Error('Method not implemented.');
}
  isAdmin: boolean = false;
  utente: any = null; // <-- dati dell’utente
  prodottoForm!: FormGroup;
  categorie: Categoria[] = []; // array per le categorie
  marche: Marca[] = [];     // array per le marche
  

  constructor(
    private authService: AuthService,
    private utenteService: UtenteService,
    private router: Router,
    private fb: FormBuilder,
    private categoriaService: CategoriaService,
    private marcaService: MarcaService,
    private prodottoService: ProdottoService,
    private dialog: MatDialog
  ) {}

  updateUserForm!: FormGroup;

  ngOnInit() {
    this.authService.isAdmin$.subscribe((isAdmin) => {
      this.isAdmin = isAdmin;
    });
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.utenteService.getById(+userId).subscribe({
        next: (resp: any) => {
          console.log('Risposta backend:', resp);
          if (resp.rc) {
            this.utente = resp.dati;
            console.log(this.utente);
            this.updateUserForm = this.fb.group({
              userName: [this.utente.userName, Validators.required],
              indirizzo: [this.utente.indirizzo],
              telefono: [this.utente.telefono] ,
              email: [this.utente.email],
              pwd: [''], // nuova password (opzionale)
              confirmPwd: [''], // conferma (opzionale)
              currentpwd: ['', Validators.required],
            });
          } else {
            console.error('Errore API:', resp.msg);
            
          }
        },
        error: (err: HttpErrorResponse) => {
          console.error('Errore HTTP:', err.message);
        },
      });
    } else {
      console.warn('Nessun ID utente trovato nel localStorage');
    }

    // Carico le categorie dal backend
    this.categoriaService.getCategorie().subscribe({
      next: cats => this.categorie = cats,                    // Quando arrivano i dati, li salvo in this.categorie
      error: err => console.error('Errore categorie:', err)   // Se c’è un errore, lo stampo in console
    });

    // Osservo il cambio di categoria selezionata
    this.prodottoForm.get('idCategoria')?.valueChanges.subscribe(idCat => {
      if (idCat) {
        // Se è stata selezionata una categoria, carico le marche corrispondenti
        this.marcaService.getMarcheByCategoria(idCat).subscribe({
          next: brands => {
            // Filtra le marche che contengono la categoria selezionata
            this.marche = brands.filter(marca => 
              marca.categoria.some((cat: Categoria) => cat.id === idCat)
            );
            // Resetta il campo marca, l’utente dovrà selezionarla di nuovo
            this.prodottoForm.patchValue({ idMarca: null });
          },
          error: err => console.error('Errore marche:', err) // Stampa eventuali errori
        });
      } else {
        // Se nessuna categoria è selezionata, svuoto le marche e resetto il campo marca
        this.marche = [];
        this.prodottoForm.patchValue({ idMarca: null });
      }
    });

  }

  deleteUser() {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.utenteService.deleteUser(+userId).subscribe({
        next: (resp: any) => {
          if (resp.rc) {
            alert('Utente eliminato con successo.');
            localStorage.removeItem('userId');
            this.closeModalDeleteUtente();
            this.authService.resetAll();
            this.router.navigate(['/home']);
          } else {
            console.error("Errore durante l'eliminazione:", resp.msg);
            alert('Errore: ' + resp.msg);
          }
        },
        error: (err: HttpErrorResponse) => {
          console.error('Errore HTTP:', err.message);
          alert('Errore durante la chiamata: ' + err.message);
        },
      });
    } else {
      alert('ID utente non trovato.');
    }
  }
  saveUserChanges() {
    const values = this.updateUserForm.value;

    // Se è stato inserito uno dei due campi password
    if (values.pwd || values.confirmPwd) {
      if (!values.pwd || !values.confirmPwd) {
        alert('Inserisci la nuova password e confermala.');
        return;
      }

      if (values.pwd !== values.confirmPwd) {
        alert('Le password non corrispondono.');
        return;
      }
    }

    const updatedUser = {
      id: +(localStorage.getItem('userId') ?? 0),
      userName: values.userName,
      indirizzo: values.indirizzo,
      telefono: values.telefono,
      email: values.email,
      pwd: values.pwd || null, // oppure lascia vuoto se non è cambiata
      role: this.utente.role,
      currentpwd: values.currentpwd,
    };
    this.utenteService.updateUser(updatedUser).subscribe({
      next: (resp: any) => {
        if (resp.rc) {
          alert('Profilo aggiornato con successo!');
          this.utente = { ...this.utente, ...updatedUser };
          this.closeModalUpdateUtente();
        } else {
          alert('Errore: ' + resp.msg);
        }
      },
      error: (err: HttpErrorResponse) => {
        alert('Errore nella modifica');
      },
    });
  }

  addProdotto() {
  // Controlla che il form sia valido
  if (this.prodottoForm.invalid) {
    this.prodottoForm.markAllAsTouched(); // Mostra tutti gli errori
    return;
  }

  // Prende i valori dal form
  const nuovoProdotto = this.prodottoForm.value;
  console.log('Nuovo prodotto da salvare:', nuovoProdotto);

  // Chiamata al servizio per creare il prodotto
  this.prodottoService.create(nuovoProdotto).subscribe({
    next: (resp: any) => {
      if (resp.rc) {
        // Successo
        alert('Prodotto aggiunto con successo!');
        // Reset del form
        this.prodottoForm.reset({
          descrizione: '',
          costo: 0,
          prezzo: 0,
          quantita: 0,
          img: '',
          idCategoria: null,
          idMarca: null
        });
      } else {
        // Errore gestito dal backend
        alert('Errore: ' + resp.msg);
      }
    },
    error: (err) => {
      // Errore lato client/server
      console.error('Errore nel salvataggio del prodotto:', err);
      alert('Si è verificato un errore durante il salvataggio.');
    }
  });
}

openDialog() {
  const dialogRef = this.dialog.open(ProdottoDialogComponent, {
    width: '500px',
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      console.log('Prodotto salvato:', result);
    }
  });}


openDialogPc() {
  const dialogRef = this.dialog.open(DialogPcComponent, {
    width: '500px',
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      console.log('Prodotto salvato:', result);
    }
  });}

  /* UTENTE */
  showModalUpdateUtente = false;
  showModalDeleteUtente = false;


  /* UTENTE */
  openModalUpdateUtente() {
    this.showModalUpdateUtente = true;
    this.updateUserForm.patchValue({
      userName: this.utente.userName,
      indirizzo: this.utente.indirizzo,
      telefono: this.utente.telefono,
      email: this.utente.email,
      pwd: '',
      confirmPwd: '',
      currentpwd: '',
    });
  }

  closeModalUpdateUtente() {
    this.showModalUpdateUtente = false;
  }

  openModalDeleteUtente() {
    this.showModalDeleteUtente = true;
  }

  closeModalDeleteUtente() {
    this.showModalDeleteUtente = false;
  }


}
